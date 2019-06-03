const jwt = require("jsonwebtoken");

module.exports = (req, res, next)=>{
    console.log("auth middleware called()");
    req.user = {};
    // console.log(req.body);
    const token = req.header('auth');
    if(!token){
        return res.status(400).send({
            message: "Failed: No auth header!"
        });
    }

    const user = jwt.verify(token, "secretkey");
    // console.log(user.id);
    req.user.id = user.id;
    next();
};