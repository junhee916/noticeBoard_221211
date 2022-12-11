const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try{
        const token = req.header.authorizations.split(' ')[0];
        const test = jwt.verify(token, process.env.MONGODB_URI);
        res.locals.user = test;
        next()
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
}