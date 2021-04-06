const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require('knex');

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");


const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'proft001',
        database: 'smartbrain'
    }
});

//console.log(db.select("*").from('users'))


const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
    "users": [
        {
            id: "123",
            name: "john",
            email: "john@gmail.com",
            password: "cookies",
            entries: 0,
            joined: new Date()
        },
        {
            id: "1234",
            name: "dave",
            email: "dave@gmail.com",
            password: "banana",
            entries: 0,
            joined: new Date()
        },
    ]
}

app.get("/", (req, res) => {
    res.send(database.users);
})

app.post("/signin", (req, res) => {signin.handleSignin(req, res, db, bcrypt)})



app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get("/profile/:id", (req, res) => {profile.handleprofile(req, res, db) })

app.put("/image", (req, res) => { image.handleimage(req, res, db) })

app.post("/imageUrl", (req, res) => { image.handleApiCall(req, res) })



app.listen(3000, () => {
    console.log("Server running successfully")
})