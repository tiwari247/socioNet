const router = require("express").Router();
const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async(req, res)=>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        email: req.body.email,
        password: hashedPassword
    });
    console.log(user);
    user.save()
        .then((document)=>{
            res.status(201).send({
                message: "User registered!",
                user: {
                    id: document._id,
                    email: document.email  
                }
            });
        })
        .catch((err)=>{
            res.send(err.message);
        });

});

router.post("/login", async(req, res)=>{
    const email = req.body.email;
    User.findOne({email})
        .then((user)=>{
            if(!user){
                return res.status(401).send("Wrong Email or Password!");
            }

            bcrypt.compare(req.body.password, user.password)
                .then((isValid)=>{        
                    console.log(isValid);
                    if(!isValid){
                        return res.status(401).send("Wrong Email or Password!");
                    }
                    const token = jwt.sign({
                        id: user.id,
                        email: user.email
                    }, "secretkey", {expiresIn: "1h"});
                    res.send({
                        message: "Login successful!", 
                        user: {
                            id: user.id,
                            email: user.email
                        },
                        token: token,
                        expiresIn: 3600
                    });
                });
        })
        .catch((err)=>{
            console.log(err);
            res.status(401).send("Wrong Email or Password!");
        });
});

module.exports = router;