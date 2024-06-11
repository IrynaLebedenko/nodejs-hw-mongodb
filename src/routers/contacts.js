

import { Router } from 'express';
import { getContactByIdController,
    getAllContactsController,
    createContactController, 
    deleteContactController, 
    upsertContactController,
    patchContactController  
 } from '../controllers/contacts.js';
//  import { ctrlWrapper } from '../routers/contacts.js';


 const ctrlWrapper = (controller) => {
    return async (req, res, next) => {
      try {
        await controller(req, res, next);
      } catch (error) {
        next(error);
      }
    };
  };

 const router = Router;

 router.get('/contacts', ctrlWrapper(getAllContactsController));
 router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
 router.post('/contacts', ctrlWrapper(createContactController));
 router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
 router.put('/contacts/:contactId', ctrlWrapper(upsertContactController));
 router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));