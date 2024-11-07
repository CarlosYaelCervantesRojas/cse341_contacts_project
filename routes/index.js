const router = require("express").Router();
const contactRouter = require("./contactRoutes");

router.get("/", (req, res) => {
    res.send("Hello world!");
});

router.use("/contacts", contactRouter);

module.exports = router;