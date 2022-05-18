const jwt = require('jsonwebtoken');
const UserModel = require('../models/user')

/* check if token is valid,
   then if the user still exist,
   then forward the request */
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET, async (err, user) => {
            if (err) {
                return res.status(401).json({message: "You are not connected"});
            }
            const _user = await UserModel.findOne({ _id: user._id });
            if (!_user){
                return res.status(403).json({message: "This user doesn't exist anymore"}); 
            }
            req.user = user;
            next();
        });
    } else {
        res.status(500).json({message: "Unexpected error"});
    }
};

module.exports = authenticateJWT