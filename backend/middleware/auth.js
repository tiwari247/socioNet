const jwt = require("jsonwebtoken");

module.exports = (req, res, next)=>{
    console.log("auth middleware called()");
    const token = req.header('auth');
    if(!token){
        return res.status(400).send({
            message: "Failed: No auth header!"
        });
    }

    const user = jwt.verify(token, "secretkey");
    // console.log(user);
    req.body.userId = user.id;
    next();
};