const express = require('express')
const app = express();
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;


const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uhcor.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log(err);
  const productCollection = client.db("shoes").collection("products");
  const orderCollection = client.db("shoes").collection("orderProduct");

  app.get("/products", (req, res) => {
    productCollection.find({})
      .toArray((err, document) => {
        res.send(document)
      })

  })

  app.get("/products/:id", (req, res) => {
    const id =req.params.id
    productCollection.find({_id: ObjectId(id)})
      .toArray((err, document) => {
        res.send(document[0]); 
      })

  })
    // order collection
    app.post("/addCreate", (req, res) => {
      const order = req.body;
      ordersCollection.insertOne(order).then((result) => {
        res.send(result.insertedCount > 0);
      });
    });

  app.get("/checkOut", (req, res) => {
    const id =req.params.id
    orderCollection.find({})
      .toArray((err, document) => {
        res.send(document[0]);
      })

  })

  app.get("/checkOut/:email", (req, res) => {
    const email = req.params.email;
    const id =req.params.id
    orderCollection.find({email:email })
      .toArray((err, document) => {
        res.send(document[0]);
      })
         // order collection
  })

  app.post('/addProduct', (req, res) => {
    const product = req.body;
    productCollection.insertMany(product,(err,result)=>{ 
      res.send({count: result}); 
    })
  })


  app.post("/addOrder", (req, res) => {
    const order = req.body;
    ordersCollection.insertOne(order).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });





  

  app.post('/addProducts', (req, res) => {
    const products = req.body;

    console.log(products);
    productCollection.insertOne(products) 
    .then(result =>{
      res.send(result); 
    })
  })

  app.delete("/deleteProducts/:id", (req, res) => {
    const id = req.params.id;
    console.log("delete this", id);
    productCollection.deleteOne({ _id: id})
      .then(result =>{
        console.log(result.deletedCount);
        res.send(result.deletedCount > 0);
      })
  });







  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
});




app.listen(process.env.PORT || port)