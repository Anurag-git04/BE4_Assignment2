const mongoose = require('mongoose')
require('dotenv').config()

const mongoUri = process.env.MONGODB 
console.log(mongoUri)

async function connectdb(){
    try{
        await mongoose.connect(mongoUri)
        console.log("Mongo DB Connected")
    }catch(error){
        console.error("Error while connecting DB");
        
    }
}

module.exports = connectdb