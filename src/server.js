import express from 'express';
import cors from 'cors';
// import pino from 'pino';
import pinoHttp from 'pino-http';
import { getContacts, getContact } from './controllers/contacts.js';


import { isHttpError } from 'http-errors';
import { MongooseError } from 'mongoose';


 export const setupServer =() =>{
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(pinoHttp());

    app.get('/contacts', getContacts);
    app.get('/contacts/:contactId', getContact);
  
    app.use((req, res) => {
    res.status(404).json({
        message: 'Not found',
    });

  });

  const PORT = process.env.PORT || 3000;

   app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
   });
};
  
 

export const errorHandler = (err, req, res) => {
  if (isHttpError(err)) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err,
    });
    return;
  }

   if (err instanceof MongooseError) {
//     res.status(500).json({
//       status: err.status,
//       message: 'Mongoose error',
//     });
//     return;
//   }

  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
};
};


export const notFoundHandler = (req, res) => {
    res.status(404).json({ message: 'Route not found' });
  };
