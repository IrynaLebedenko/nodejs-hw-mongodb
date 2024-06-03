import Contact from '../models/contacts.js'; 

export const getAllContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error){
    console.error(error);
    throw new Error('Failed to fetch contacts');
  }
};

