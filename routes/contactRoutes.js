const router = require("express").Router();
const contactController = require("../controllers/contactController");

router.get("/", contactController.getAll);

router.get("/:id", contactController.getByID);

module.exports = router;