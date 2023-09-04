const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        //jwt decrypt and verify the token validity
        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if(err) {
                res.status(403).json("Invalid token")
            } else {
                //get the user object from the decrypted string
                //assign it to req for verification
                req.user = user;
                next();
            }

        })
    } else {
        return res.status(401).json("User not authenticated!")
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user._id === req.params.userId || 
            req.user._id === req.params.id || 
            req.user.isAdmin) 
        {
            next();
        } 
        else {
            res.status(403).json("Invalid authorization")
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("Invalid authorization")
        }
    })
}

module.exports = { 
    verifyToken, 
    verifyTokenAndAuthorization, 
    verifyTokenAndAdmin 
}