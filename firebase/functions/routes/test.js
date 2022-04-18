const express = require("express");
const router = express.Router();
const { db } = require("../util/admin");
const { validateInput } = require("../util/helper");

router.post("/", (req, res) => {
  const { boardId, temperature, time } = req.body;
  const undefinedInput = validateInput({
    boardId,
  });
  if (undefinedInput.length != 0)
    return res
      .status(404)
      .json({ error: "Body -- " + undefinedInput + " -- not found" });

  const sensorsRef = db.collection("sensors");
  const timeRef = db.collection("time").doc("unix");

  if(time) timeRef.set({ currTime: time });
  if(temperature) sensorsRef.doc(boardId).update({ temperature });

  return res.json({ message: "Set test successfully" });
});

exports.default = router;
