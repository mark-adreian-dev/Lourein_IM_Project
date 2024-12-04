const jwt = require("jsonwebtoken");

const SECRET_KEY = "your_secret_key"; // Replace with an environment variable in production

// Middleware to verify the JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Attach user info to request object
        next(); // Pass control to the next middleware/route handler
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authenticateToken;
