import {  getContactById } from '../services/contactById.js';

  
export const getContact = async (req, res) => {
    const { contactId } = req.params;
    try{
        const contact = await getContactById(contactId);
        if (!contact) {

            return res.status(404).json({

                status: 404,
                message: 'Not found',

            });
        }
        res.status(200).json({
            status: 'success',
            message: `Successfully found contact with id ${contactId}!`,
             data: contact,
        });

    }catch (error){
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};