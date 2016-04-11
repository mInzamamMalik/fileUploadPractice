import express = require("express");
import mongoose = require("mongoose");
import path = require("path");
var multipart = require('connect-multiparty');



let app = express();
app.set("port", (process.env.port || 3000) );





let frontEndFiles = path.resolve(__dirname,"frontendFiles");
app.use(express.static(frontEndFiles));


app.listen(app.get("port") , ()=>{
    console.log("listening on " + app.get("port"));   
});





/////////////////////////////////////////////////////////////////////////////////////////////////
let dbURI = "mongodb://localhost/fileUploadPractice";
// let dbURI = 'mongodb://localhost/mydatabase';
mongoose.connect(dbURI);


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function() {//connected
    console.log("Mongoose is connected");
    // process.exit(1);
});

mongoose.connection.on('disconnected', function() {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function(err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function() {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function() {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////
