

import { Router } from 'express';
import { getAllContactsController,
    getContactByIdController,
    createContactController, 
    deleteContactController, 
    upsertContactController,
    patchContactController  
 } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import validateId from '../middlewares/validateId.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';
 

 const router = Router();

//  router.use(authenticate);

 router.use('/:contactId', validateId('contactId'));
 router.get('/', ctrlWrapper(getAllContactsController));
 router.get('/:contactId', ctrlWrapper(getContactByIdController));
 router.post('', validateBody(createContactSchema), authenticate, ctrlWrapper(createContactController));
 router.delete('/:contactId', authenticate, ctrlWrapper(deleteContactController));
 router.put('/:contactId', validateBody(createContactSchema), authenticate, ctrlWrapper(upsertContactController));
 router.patch('/:contactId', validateBody(updateContactSchema), authenticate, ctrlWrapper(patchContactController));

 export default router;