const mongoose = require("mongoose")




async function connectDB(){
    try{
        await mongoose.connect(process.env.Mongo_URI)
        console.log("db is connected")
    }
    catch(err)
    {
        console.log("connection failed", err)
    }

}


connectDB()