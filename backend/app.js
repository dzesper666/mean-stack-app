const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

// możliwe, że trzeba będzie tu wrócić - leckja 99, moment: 5:17
// mongoose.connect("mongodb+srv://kacpi:oeoLLLZreTwo9Y3R@cluster0.lun6f.mongodb.net/node-angular?retryWrites=true&w=majority")
mongoose.connect("mongodb+srv://kacpi:" + process.env.MONGO_ATLAS_PASSWORD + "@cluster0.lun6f.mongodb.net/node-angular?retryWrites=true&w=majority")
    .then(() => {
        console.log('Connected to database!')
    })
    .catch(() => {
        console.log('Connection failed!')
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((request, respond, next) => {
    respond.setHeader("Access-Control-Allow-Origin", "*");
    respond.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    respond.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
    next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;