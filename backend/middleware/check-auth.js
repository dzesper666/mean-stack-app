const jsonwebtoken = require("jsonwebtoken");

module.exports = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(" ")[1];
        const decodedToken = jsonwebtoken.verify(token, process.env.JWT_TOKEN);
        request.userData = { email: decodedToken.email, userId: decodedToken.userId };
        next();
    } catch (error) {
        response.status(401).json({
            message: "You are not authenticated. Invalid token!"
        });
    }
}