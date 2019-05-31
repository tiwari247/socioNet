const express = require("express");
const mongoose = require("mongoose");

const app = express();
const posts = require("./backend/routes/posts");

mongoose.connect("mongodb://localhost/socioNet")
    .then(()=>{
        console.log("Connected to DB!");
    }).catch((err)=>{
        console.log("Errori: "+err);
    });

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "Content-Type, Accept, Origin, X-Requested-With");
    res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE");
    next();
});
app.use(express.json());
app.use('/api/posts', posts);

//
app.get("/", (req, res)=>{
    res.send("Connected to server!");
})

const port = process.env.PORT||3000 ;

app.listen(3000, ()=>{
    console.log(`Listening at ${port}`);
});