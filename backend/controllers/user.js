const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/user");

exports.createUser = (request, respond, next) => {
    bcrypt.hash(request.body.password, 10, )
    .then(hash => {
        const user = new User({
            email: request.body.email,
            password: hash
        });
        user.save()
            .then(result => {
                respond.status(201).json({
                    message: "User created!",
                    result: result
                })
            })
            .catch(error => {
                respond.status(500).json(
                    {
                        message: "Invalid authentication credentials during signup!"
                    }
                );
            });
    });
}

exports.useLogin = (request, response, next) => {
    let fetchedUser;
    User.findOne({ email: request.body.email })
        .then(user => {
            if(!user) {
                return response.status(401).json({
                    message: "Auth failed"
                })
            }
            fetchedUser = user;
            return bcrypt.compare(request.body.password, user.password)
        })
        .then(result => {
            if (!result) {
                return response.status(401).json({
                    message: "Auth failed"
                });
            }
            const token = jsonwebtoken.sign({ 
                email: fetchedUser.email, userId: fetchedUser._id }, 
                process.env.JWT_TOKEN, 
                { expiresIn: "1h" }
            );
            response.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: fetchedUser._id
            })
        })
        .catch(error => {
            return response.status(401).json({
                message: "Invalid authentication credentials during login!"
            })
        });
}