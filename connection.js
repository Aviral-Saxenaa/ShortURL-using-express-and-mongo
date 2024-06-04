const mongoose = require("mongoose");

//Connecting mongoose
async function connectMongoDb(url) {
        return mongoose.connect(url);
}

module.exports = { connectMongoDb };
