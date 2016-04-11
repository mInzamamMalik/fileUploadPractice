var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var app = express();
app.set("port", (process.env.port || 3000));
var frontEndFiles = path.resolve(__dirname, "frontendFiles");
app.use(express.static(frontEndFiles));
app.listen(app.get("port"), function () {
    console.log("listening on " + app.get("port"));
});
/////////////////////////////////////////////////////////////////////////////////////////////////
var dbURI = "mongodb://localhost/fileUploadPractice";
// let dbURI = 'mongodb://localhost/mydatabase';
mongoose.connect(dbURI);
////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {
    console.log("Mongoose is connected");
    // process.exit(1);
});
mongoose.connection.on('disconnected', function () {
    console.log("Mongoose is disconnected");
    process.exit(1);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});
process.on('SIGINT', function () {
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////
