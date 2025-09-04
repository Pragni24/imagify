//to store transaction data in the mongodb database
import mongoose from "mongoose";
//create user schema
const transactionSchema=new mongoose.Schema({
    //we have to define the sturcture of our data that we will store in the datbase
    userId: {type:String, required:true},
    plan: {type:String, required:true},
    amount: {type:Number, required:true},
    credits: {type:Number, required:true},
    payment: {type:Boolean, default: false},
    date: {type:Number},

})
//using the above schema , we will now create the transaction model
const transactionModel = mongoose.models.transaction  || mongoose.model("transaction", transactionSchema)//so using this schema it will create a model with the name user; also first it will check for exisiting users

export default transactionModel;