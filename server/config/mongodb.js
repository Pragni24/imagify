//here we will add code to connect the project with mongodb database
import mongoose from "mongoose";

const connectDB = async()=>{

    //whenever databse will be connected the following function will run 
    //and the following message will be displayed
    mongoose.connection.on('connected',()=>{
        console.log('Database Connected')
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/CaseCraze`)
}

//to exportconnectDB function so that we can use it in other files
export default connectDB;