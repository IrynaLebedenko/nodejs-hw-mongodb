// import createHttpError from 'http-errors';
// import mongoose from 'mongoose';
// // import { getContactById } from '../services/contacts';

// const validateId = (req, res, next) => {
//     const {contacId} = req.params;

//     // if (!contactId) {
//     //   throw new Error(500, 'ID in validateId is not provided');
//     // }

//     if (!mongoose.Types.ObjectId.isValid(contacId)) {
//       return next(createHttpError(400, 'Invalid ID'));
//     }

//     return next();
//   };

// export default validateId;


import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

const validateId =
  (idName = 'id') =>
  (req, res, next) => {
    try {
        console.log(`Validating ID for parameter: ${idName}`);
    const id = req.params[idName];

    if (!id) {
        console.log('ID not provided');
      throw new Error('ID in validateId is not provided');
    }

    if (!isValidObjectId(id)) {
        console.log('Invalid ID');
      return next(createHttpError(400, 'Invalid ID'));
    }
    console.log('ID is valid');
    return next();
} catch (error) {
    console.error('Error in validateId middleware:', error);
    return next(createHttpError(500, error.message));
}
  };

export default validateId;