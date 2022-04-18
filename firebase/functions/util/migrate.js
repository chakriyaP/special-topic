const { db } = require("./admin");

exports.migrating = async () => {
  if (process.env.FIRESTORE_EMULATOR_HOST.includes("localhost")) {
    const existedCollection = (await db.listCollections()).length;
    if (existedCollection === 0) {
      console.log("No collections found in Firestore. Creating...");
      const now = new Date().getTime();
      await db.collection("time").doc("unix").set({ currTime: now });
      db.collection("boards").doc("1.1.1.1").set({
        name: "board1",
        plantType: "plant1",
        date: new Date().toISOString(),
      });
    }
  }
  if (process.env.FIRESTORE_EMULATOR_HOST.includes("0.0.0.0")) {
    const existedCollection = (await db.listCollections()).length;
    if (existedCollection === 0) {
      console.log("No collections found in Firestore. Creating...");
      const now = new Date().getTime();
      await db.collection("time").doc("unix").set({ currTime: now });
      db.collection("boards").doc("1.24.155.12").set({
        name: "board1",
        plantType: "plant1",
        date: new Date().toISOString(),
      });
    }
  }
};

exports.createBoardProproties = async (boardId) => {
  db.collection("relays")
    .doc(boardId)
    .set({
      status: "manual",
      relays: {
        relay1: "off",
        relay2: "off",
        relay3: "off",
        relay4: "off",
      },
    });
  db.collection("sensors").doc(boardId).set({
    temperature: 0,
    humidity: 0,
    soilMoisture: 0,
    windSpeed: 0,
  });
};
