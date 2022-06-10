const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const cors = require('cors') //support diffrent port
require('dotenv').config()// for envirment variable
const port = process.env.PORT || 5000
const app = express()
const jwt = require('jsonwebtoken');
app.use(cors()) //
app.use(express.json()) //for parse
const stripe = require('stripe')(process.env.STRIPE_KEY);

app.get('/', (req, res) => {
    res.send('Welcome To Manufacture Server')
})
/* https://safe-inlet-78940.herokuapp.com */


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lnkho.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect()
        
        const myProject = client.db("projects").collection("projectsCollection");


        //projects
        app.get('/my-projects', async (req, res) => {
            const query = {}
            const cursor = myProject.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })
        
        app.get('/my-projects/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await myProject.findOne(query)
            res.send(result)
        })
    }
    finally {
        //await client.close()
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Show Here ${port}`)
})


/* 
echo "# my-project" >> README.md
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Cihsan/my-project.git
git push -u origin main
*/