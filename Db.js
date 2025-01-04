const mongoose = require("mongoose");

try{
    mongoose.connect("mongodb://localhost:27017/news")
    .then(() => console.log("mongodb connected successfully"))
    .catch(err => console.log("connection error : ",err))
}catch(err){
    console.log('Error : ',err)
}   