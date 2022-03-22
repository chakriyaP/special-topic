const express = require("express");
const router = express.Router();
const { db } = require("../util/admin");

// @route   GET relays/
// @desc    get all relays from board
// @params   ?boardId=idBoard
// @respone 200 [{
//                status: "manual",
//                relays: {
//                  relay1: "off",
//                  relay2: "off",
//                  relay3: "off",
//                  relay4: "off",
//                },
//              }]

router.get("/", (req, res) => {
  const { boardId } = req.query;
  if (!boardId)
    return res.status(404).json({ error: "Parameter -- boardId -- not found" });
  const relayRef = db.collection("relays").doc(boardId);
  relayRef.get().then((doc) => {
    if (!doc.exists) {
      return res.status(404).json({ error: "Board relay not found" });
    }
    return res.json(doc.data());
  });
});

// @route   PATCH relays/
// @desc    update relays from board
// @body   { boardId: idBoard, relays: ["relay1", "relay2"], status: "manual"||"auto" }
// @respone 200 { message: { updated relays } }

router.patch("/", async (req, res) => {
  const { boardId, relays, status } = req.body;
  const relayRef = db.collection("relays").doc(boardId);
  const updated = [];
  if (typeof status != "undefined") {
    await relayRef.update({ status });
    updated.push("status");
  }
  if (typeof relays != "undefined") {
    await relayRef.get().then((doc) => {
      if (doc.exists) {
        let data = doc.data();
        const status = data.status;
        const oldRelays = data.relays;
        if (status != "manual") {
          return res.status(400).json({
            error: "Relay status can only be changed manually if it's manual",
          });
        } else {
          relayRef.update({ relays: {...oldRelays, ...relays} });
          updated.push("relays");
        }
      }
    });
  }

  return res.json({ message: { updated } });
});

exports.default = router;
