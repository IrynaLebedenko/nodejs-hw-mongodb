import express from 'express';
import cors from 'cors';
// import pino from 'pino';
import pinoHttp from 'pino-http';
import { getContacts, getContact } from './controllers/contacts.js';

 const setupServer =() =>{
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
  
  export default setupServer;