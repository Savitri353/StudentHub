const jwt = require("jsonwebtoken");

exports.optionalAuth = (req,res,next) => {
    const token = req.cookies.token;

    if(!token) {
        return next(); //continue without user

    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

    } catch(error) {
        //ignore invalid token

    }

    next();
};