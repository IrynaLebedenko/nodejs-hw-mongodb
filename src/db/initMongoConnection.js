import mongoose from 'mongoose';

const initMongoConnection = async () => {
    try { 
        const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB} = process.env;
        const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

    await mongoose.connect(uri);

 console.log('Mongo connection successfully established!');
    }catch(error){
        console.log('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default initMongoConnection;


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://lebedirenka:<password>@cluster0.wzqdf3o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);