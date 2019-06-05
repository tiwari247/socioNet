const express = require("express");
const mongoose = require("mongoose");

const app = express();
const posts = require("./routes/posts");
const users = require("./routes/users");
const cors = require("./middleware/cors");
//odRR9b0jXy1JqLaM
//mongodb+srv://tiwari247:odRR9b0jXy1JqLaM@cpcluster-lggms.mongodb.net/socioNet?retryWrites=true&w=majority
// mongoose.connect("mongodb://localhost/socioNet")
mongoose.connect("mongodb+srv://tiwari247:" + process.env.MONGO_PASSWORD +"@cpcluster-lggms.mongodb.net/socioNet?retryWrites=true&w=majority")
    .then(()=>{
        console.log("Connected to DB!");
    }).catch((err)=>{
        console.log("Errori: "+err);
    });

app.use('/images',express.static(__dirname + "/images"));
app.use(cors);
app.use(express.json());
app.use('/api/posts', posts);
app.use('/api/users', users);

//
app.get("/", (req, res)=>{
    res.send("Connected to server!");
})

const port = process.env.PORT|8081 ;

app.listen(3000, ()=>{
    console.log(`Listening at ${port}`);
});