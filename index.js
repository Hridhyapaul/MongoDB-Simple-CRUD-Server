const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// hridhyapaul77
// TqLwviHqvQFCrARR



const uri = "mongodb+srv://hridhyapaul77:TqLwviHqvQFCrARR@cluster0.gfisnkk.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("usersDB");
    const userCollection = database.collection("user");

    app.get('/user', async(req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })

    app.get('/user/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await userCollection.findOne(query)
      res.send(result)
    })


    app.post('/user', async(req, res) => {
      const user = req.body;
      console.log('new user', user);
      const result = await userCollection.insertOne(user);
      res.send(result);
    })

    app.put('/user/:id', async(req, res) => {
      const id = req.params.id;
      const user = req.body
      console.log(user)
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateUser = {
        $set: {
          name: user.name,
          email: user.email
        }
      }
      const result = await userCollection.updateOne(filter, updateUser, options);
      res.send(result);
    })

    app.delete('/user/:id', async(req, res) => {
      const id = req.params.id;
      console.log('Please delete from database', id)
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Simple CRUD is Running')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

/*
async function run(){
    try{

    }
    catch{

    } or,

    finally{

    }
}
run().catch(error => console.log(error))
or 
const run = async() => {

}
run().catch(error => console.log(error))
*/




