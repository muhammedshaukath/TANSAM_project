const jwt = require("jsonwebtoken");   // Importing the jsonwebtoken library for handling JWTs

const authMiddleware = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: "Token Missing"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET 
        );

        req.user = decoded;         // Transfer info to front end to payload

        next();

    } catch (error) {

        return res.status(401).json({          //401 - Unauthorized error ; 403 - Forbidden error; 404 - Not Found error
            message: "Invalid Token"
        });

    }

};

module.exports = authMiddleware;