import {  getContactById } from '../services/contactById.js';

export const getContact = async (req, res) => {
    try {
      const contact = await getContactById();
      if (!contact) {
        return res.status(404).json({
          status: 'fail',
          message: `Not found`,
        });
      }
      res.status(200).json({
        status: 'success',
        message: 'Successfully found contact!',
        data: contact,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  };
  