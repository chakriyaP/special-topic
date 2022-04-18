const functions = require("firebase-functions");
const cors = require("cors");
const express = require("express");
const app = express().use(cors());
const routes = require("./routes");
const { db } = require("./util/admin");
const { migrating, createBoardProproties } = require("./util/migrate");

migrating();

app.get("/", (_, res) => {
  return res.send("KKU FARM APIs");
});
app.use(routes.default);

exports.api = functions.region("asia-southeast1").https.onRequest(app);

exports.onNewBoard = functions
  .region("asia-southeast1")
  .firestore.document("boards/{id}")
  .onCreate(async (snapshot, content) => {
    createBoardProproties(snapshot.id);
  });

const executeChange = async (doc, now) => {
  const scheduleData = doc.data();
  const schedualRef = db.collection("schedules").doc(doc.id);

  const boardId = scheduleData.boardId;
  const relayRef = db.collection("relays").doc(boardId);
  const sensorsRef = db.collection("sensors").doc(boardId);

  const relaysDoc = (await relayRef.get()).data();
  const status = relaysDoc.status;
  const relays = relaysDoc.relays;
  const temperature = (await sensorsRef.get()).data().temperature;
  if (status === "auto") {
    if (scheduleData.type == "temperature") {
      if (temperature < scheduleData.temperature) {
        let selectedRelays = scheduleData.relays;
        selectedRelays.forEach((e) => {
          relays[e] = "off";
        });
        relayRef.update({ relays });
        schedualRef.update({ status: "pending" });
      } else {
        {
          let selectedRelays = scheduleData.relays;
          selectedRelays.forEach((e) => {
            relays[e] = "on";
          });
          relayRef.update({ relays });
          schedualRef.update({ status: "executed" });
        }
      }
    } else if (scheduleData.type == "time") {
      if (scheduleData.timeStart <= now <= scheduleData.timeEnd) {
        let selectedRelays = scheduleData.relays;
        selectedRelays.forEach((e) => {
          relays[e] = "on";
        });
        relayRef.update({ relays });
        schedualRef.update({
          status: "executed",
          remainingTime: scheduleData.execute_time,
        });
      } else {
        let selectedRelays = scheduleData.relays;
        selectedRelays.forEach((e) => {
          relays[e] = "off";
        });
        relayRef.update({ relays });
        schedualRef.update({ status: "pending" });
      }
    }
  }
};

exports.onTemperatureChange = functions
  .region("asia-southeast1")
  .firestore.document("sensors/{boardId}")
  .onUpdate(async (snapshot, content) => {
    const now = (await db.collection("time").doc("unix").get()).data().currTime;
    const schedualRef = db.collection("schedules");
    schedualRef.get().then(async (snapshot) => {
      for (const doc of snapshot.docs) {
        executeChange(doc, now);
      }
    });
    return Promise.resolve();
  });

exports.onTimeChange = functions
  .region("asia-southeast1")
  .firestore.document("time/unix")
  .onUpdate(async (timeDoc, content) => {
    const now = timeDoc.data().currTime;
    const schedualRef = db.collection("schedules");
    schedualRef.get().then(async (snapshot) => {
      for (const doc of snapshot.docs) {
        executeChange(doc, now);
      }
    });
    return Promise.resolve();
  });

exports.onDeleteBoard = functions
  .region("asia-southeast1")
  .firestore.document("boards/{id}")
  .onDelete(async (snapshot, content) => {
    const boardId = snapshot.id;
    db.collection("boards").doc(boardId).delete();
    db.collection("sensors").doc(boardId).delete();
    db.collection("relays").doc(boardId).delete();
    const schedualRef = db
      .collection("schedules")
      .where("boardId", "==", boardId);
    schedualRef.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
  });

exports.schedualExecute = functions
  .region("asia-southeast1")
  .pubsub.schedule("*/5 * * * *")
  .timeZone("Asia/Bangkok")
  .onRun(async (context) => {
    console.log(
      "schedualExecute",
      new Date().getHours(),
      new Date().getMinutes()
    );
  });

// exports.schedualExecute = functions
//   .region("asia-southeast1")
//   .pubsub.schedule("*/5 * * * *")
//   .timeZone("Asia/Bangkok")
//   .onRun(async (context) => {
//     console.log("schedualExecute");
//     console.log(new Date().getMinutes());
//     const schedualRef = db.collection("schedules");
//     schedualRef.get().then(async (snapshot) => {
//       for (const doc of snapshot.docs) {
//         const scheduleData = doc.data();
//         const schedualRef = db.collection("schedules").doc(doc.id);

//         const boardId = scheduleData.boardId;
//         const relayRef = db.collection("relays").doc(boardId);
//         const sensorsRef = db.collection("sensors").doc(boardId);

//         const relaysDoc = (await relayRef.get()).data();
//         const status = relaysDoc.status;
//         const relays = relaysDoc.relays;
//         const temperature = (await sensorsRef.get()).data().temperature;
//         if (status === "auto") {
//           if (scheduleData.type == "temperature") {
//             if (temperature < scheduleData.temperature) {
//               let selectedRelays = scheduleData.relays;
//               selectedRelays.forEach((e) => {
//                 relays[e] = "off";
//               });
//               relayRef.update({ relays });
//               schedualRef.update({ status: "pending" });
//             } else {
//               {
//                 let selectedRelays = scheduleData.relays;
//                 selectedRelays.forEach((e) => {
//                   relays[e] = "on";
//                 });
//                 relayRef.update({ relays });
//                 schedualRef.update({ status: "executed" });
//               }
//             }
//           } else if (scheduleData.type == "time") {
//             const date = new Date();
//             const now =
//               ("0" + date.getHours()).slice(-2) + ":" + date.getMinutes();
//             console.log(now);
//             if (now == scheduleData.time) {
//               let selectedRelays = scheduleData.relays;
//               selectedRelays.forEach((e) => {
//                 relays[e] = "on";
//               });
//               relayRef.update({ relays });
//               schedualRef.update({
//                 status: "executed",
//                 remainingTime: scheduleData.execute_time,
//               });
//             } else if (scheduleData.status == "executed") {
//               let selectedRelays = scheduleData.relays;
//               const remainingTime = scheduleData.remainingTime - 5;
//               if (remainingTime <= 0) {
//                 selectedRelays.forEach((e) => {
//                   relays[e] = "off";
//                 });
//                 relayRef.update({ relays });
//                 schedualRef.update({ status: "pending" });
//               } else schedualRef.update({ remainingTime });
//             }
//           }
//         }
//       }
//     });
//     return Promise.resolve();
//   });
