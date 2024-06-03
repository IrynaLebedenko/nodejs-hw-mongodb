import Contact from '../models/contacts.js';

export const getContactById = async (id) => {
    try {
        const contact = await Contact.findById(id);
        return contact;
    } catch(error){
        console.error(error);
        throw new Error('Failed to fetch contact');
    }
};