//to store users data in the mongodb database
import mongoose from "mongoose";
//create user schema
const userSchema=new mongoose.Schema({
    //we have to define the sturcture of our data that we will store in the datbase
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required:true},
    creditBalance:{type: Number, default: 5},
})
//using the above schema , we will now create the user model
const userModel = mongoose.models.user  || mongoose.model("user", userSchema)//so using this schema it will create a model with the name user; also first it will check for exisiting users
//if the user is not  available, it will create a new model using userschema

export default userModel;