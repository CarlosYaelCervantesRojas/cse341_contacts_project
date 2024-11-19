const router = require('express').Router();
const contactRouter = require('./contactRoutes');
const swaggerRouter = require('./swagger');

router.use('/', swaggerRouter);

router.use('/contacts', contactRouter);

module.exports = router;
