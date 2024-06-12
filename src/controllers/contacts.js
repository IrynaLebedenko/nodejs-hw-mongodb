import { getAllContacts,
         getContactById,
        //  createContact,
         updateContact,
         deleteContact,
        //  patchContact,
 } from '../services/contacts.js';
 import createHttpError from 'http-errors';
 import Contact from '../models/contacts.js';

 export const getAllContactsController = async (req, res) => {
    const contacts = await getAllContacts();
  
    res.status(200).json({
      status: 'success',
      message: 'Successfully retrieved all contacts',
      data: contacts,
    });
  };
  
  export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
  
    if (!contact) {
      const error = new Error('Contact not found');
      error.status = 404;
      throw error;
      }
  
    res.status(200).json({
      status: 200,
      message: `Contacts found with id ${contactId}`,
      data: contact,
    });
  };

export const createContactController = async (req, res, next) => {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;
    
    if (!name || !phoneNumber) {
        return res.status(400).json({
            status: 400,
            message: 'Name and phoneNumber are required',
            data: { message: 'Validation error' }
        });
    }

    try {
        const newContact = new Contact({
            name,
            phoneNumber,
            email,
            isFavourite,
            contactType
        });
        await newContact.save();
        
        res.status(201).json({
            status: 201,
            message: 'Contact created successfully',
            contact: newContact
        });
    } catch (error) {
        next(error);
    }
};



export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
  
    const contact = await deleteContact(contactId);
  
    if (!contact) {
        next(createHttpError(404, {
            status: 404,
            message: 'Contact not found',
            data: { message: 'Contact not found'}
          }));
    }
  
    res.status(204).send();
  };
  
  export const upsertContactController = async (req, res, next) => {
    const { contactId } = req.params;
  
    const result = await updateContact(contactId, req.body, {
      upsert: true,
    });
  
    if (!result) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }
  
    const status = result.isNew ? 201 : 200;
  
    res.status(status).json({
      status,
      message: `Successfully upserted a contact!`,
      data: result.contact,
    });
  };
  
  export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const { name, phoneNumber, email,isFavourite, contactType} = req.body;

    try {
        const contact = await getContactById(contactId);
  
    if (!contact) {
      next(createHttpError(404, {
        status: 404,
        message: ' Not found',
        data: { message: 'Contact not found'}
      }));
    }
    

    const updatedContact = await updateContact(contactId, { name, phoneNumber, email, isFavourite, contactType });

    res.status(200).json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: updatedContact
    });
} catch (error) {
    next(error);
}
};
  