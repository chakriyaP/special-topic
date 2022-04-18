const express = require("express");
const router = express.Router();
const { db } = require("../util/admin");

// @route   GET sensors/
// @desc    update relays from board
// @params  ?boardId=idBoard
// @respone 200 {
//                temperature: 0,
//                humidity: 0,
//                soilMoisture: 0,
//                windSpeed: 0,
//                }

router.get("/", (req, res) => {
  const { boardId } = req.query;
  if (!boardId)
    return res.status(404).json({ error: "Parameter -- boardId -- not found" });
  const sensorsRef = db.collection("sensors").doc(boardId);
  sensorsRef.get().then((doc) => {
    if (!doc.exists) {
      return res.status(404).json({ error: "Board sensors not found" });
    }
    return res.json(doc.data());
  });
});

// @route   PATCH sensors/
// @desc    update sensors from board
// @body    { boardId, sensors: { temperature: 20, humidity: 10, windSpeed: 40 } }
// @respone 200 { message: { updated sensors } }

router.patch("/", (req, res) => {
  const { boardId, sensors, time } = req.body;
  const sensorsRef = db.collection("sensors").doc(boardId);
  const updated = [];
  if (typeof sensors != "undefined") {
    if (typeof sensors == "object") {
      sensorsRef.update({ ...sensors });
      updated.push(Object.keys(sensors));
    } else return res.status(400).json({ error: "Sensors must be an object" });
  }
  return res.json({ message: { updated } });
});

exports.default = router;
