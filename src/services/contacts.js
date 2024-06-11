import Contact from '../models/contacts.js'; 


export const getAllContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error){
    console.error('Not found:', error);
    throw new Error('Not found');
  }
};

export const getContactById = async (id) => {
    try {
        const contact = await Contact.findById(id);
        return contact;
    } catch(error){
        console.error(error);
        throw new Error('Not found');
    }
};

export const createContact = async (payload) => {
    const contact = await Contact.create(payload);
    return contact;
  };

  export const deleteContact = async (contactId) => {
    const contact = await Contact.findOneAndDelete({
      _id: contactId,
    });
  
    return contact;
  };

  export const updateContact = async (contactId, payload, options = {}) => {
    const rawResult = await Contact.findOneAndUpdate(
      { _id: contactId },
      payload,
      {
        new: true,
        includeResultMetadata: true,
        ...options,
      },
    );
  
    if (!rawResult || !rawResult.value) return null;
  
    return {
      student: rawResult.value,
      isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
  };