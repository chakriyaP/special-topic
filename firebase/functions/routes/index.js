const express = require("express");
const router = express.Router();

router.use("/boards", require("./boards").default);
router.use("/relays", require("./relays").default);
router.use("/sensors", require("./sensors").default);
router.use("/settings", require("./settings").default);



exports.default = router;
