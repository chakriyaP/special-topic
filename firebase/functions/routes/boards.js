const express = require("express");
const router = express.Router();
const { db } = require("../util/admin");

// @route   POST board/
// @desc    Create board
// @body    { boardId: idBoard, boardName: string, plantType: string }
// @respone 200 { message: "Board created successfully" }

router.post("/", (req, res) => {
  const { boardId, boardName, plantType } = req.body;
  if (!boardId)
    return res.status(404).json({ error: "Parameter -- boardId -- not found" });
  if (!boardName)
    return res
      .status(404)
      .json({ error: "Parameter -- boardName -- not found" });
  if (!plantType)
    return res
      .status(404)
      .json({ error: "Parameter -- plantType -- not found" });
  const boardsRef = db.collection("boards").doc(boardId);
  boardsRef.get().then((doc) => {
    if (doc.exists)
      return res.status(400).json({ error: "Board already exists" });
    boardsRef.set({
      name: boardName,
      plantType,
      date: new Date().toISOString(),
    });
    return res.json({ message: "Board created successfully" });
  });
});

// @route   DELETE board/
// @desc    Delete board
// @body    { boardId: idBoard }
// @respone 200 { message: "Board deleted successfully" }
router.delete("/", (req, res) => {
  const { boardId } = req.body;
  if (!boardId)
    return res.status(404).json({ error: "Parameter -- boardId -- not found" });
 db.collection("boards").doc(boardId).delete();
 return res.status(200).json({ message: "Board deleted successfully" });
});

exports.default = router;
