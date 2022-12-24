const router = require("express").Router();
const authRoutes = require("./auth");
const notesRoutes = require("./notes");

router.use("/auth", authRoutes);
router.use("/notes", notesRoutes);

module.exports = router;
