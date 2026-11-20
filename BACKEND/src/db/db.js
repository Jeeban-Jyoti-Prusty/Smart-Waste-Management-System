const mongoose = require("mongoose");
require("dotenv").config();

async function ConnectDb() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("✅Database Connected Sucessfully")

    } catch (error) {
        console.log("Error", error)

    }

}

module.exports = ConnectDb;