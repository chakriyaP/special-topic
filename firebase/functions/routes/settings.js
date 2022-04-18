const express = require("express");
const router = express.Router();
const { db } = require("../util/admin");
const { validateInput } = require("../util/helper");

// @route   GET settings/
// @desc    get all settings from board
// @params   boardId, ?type: "temperature"||"time"
// @respone 200 [{boardId, temperature, executeTime, relays, type: "temperature"||"time" ,status: "pending"||"executed"}]

router.get("/", (req, res) => {
  const { boardId, type } = req.query;
  if (!boardId)
    return res.status(404).json({ error: "Parameter -- boardId -- not found" });
  let schedualRef = db.collection("schedules").where("boardId", "==", boardId);
  if (type) schedualRef = schedualRef.where("type", "==", type);

  const query = schedualRef.get();
  query.then((snapshot) => {
    const scheduals = [];
    snapshot.forEach((doc) => {
      scheduals.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return res.status(200).json(scheduals);
  });
});

// @route   DELETE settings/
// @desc    delete selected settings from board
// @params   ?schedualId=idSchedual
router.delete("/", (req, res) => {
  const { schedualId } = req.query;
  if (!schedualId)
    return res
      .status(404)
      .json({ error: "Parameter -- schedualId -- not found" });
  db.collection("schedules").doc(schedualId).delete();
  return res.status(200).json({ message: "Schedual deleted" });
});

// @route   POST settings/temperature
// @desc    create new schedual ("temperature"")
// @body    { boardId, temperature, executeTime, relays }
// @respone 200 { message: "Schedule created successfully" }

router.post("/temperature", (req, res) => {
  const { boardId, temperature, executeTime, relays } = req.body;
  const undefinedInput = validateInput({
    boardId,
    temperature,
    executeTime,
    relays,
  });
  if (undefinedInput.length != 0)
    return res
      .status(404)
      .json({ error: "Body -- " + undefinedInput + " -- not found" });
  const schedualRef = db.collection("schedules");
  schedualRef.add({
    boardId,
    temperature,
    executeTime,
    relays,
    type: "temperature",
    status: "pending",
  });
  return res.json({ message: "Schedule created successfully" });
});

// @route   POST settings/time
// @desc    create new schedual ("time"")
// @body    { boardId, date, time, executeTime, relays }
// @respone 200 { message: "Schedule created successfully" }

router.post("/time", (req, res) => {
  const { boardId, startTime, endTime, relays } = req.body;
  const undefinedInput = validateInput({ boardId, startTime, endTime, relays });
  if (undefinedInput.length != 0)
    return res
      .status(404)
      .json({ error: "Body -- " + undefinedInput + " -- not found" });
  const schedualRef = db.collection("schedules");
  schedualRef.add({
    boardId,
    startTime,
    endTime,
    relays,
    type: "time",
    status: "pending",
  });
  return res.json({ message: "Schedule created successfully" });
});

exports.default = router;
