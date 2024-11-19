const router = require('express').Router();

const contactController = require('../controllers/contactController');
const { contactSchema, isValid } = require('../utilities/contactValidator');
const { validateId } = require('../utilities/idValidator');


router.get('/', contactController.getAll);

router.get('/:id',
    validateId,
    contactController.getByID
);

router.post('/', 
    contactSchema,
    isValid,
    contactController.createContact
);

router.put('/:id',
    validateId,
    contactSchema,
    isValid,
    contactController.updateContact
);

router.delete('/:id', 
    validateId,
    contactController.deleteContact
);

module.exports = router;
