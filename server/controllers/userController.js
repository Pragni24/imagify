// we will create controller function for user registration, user login and user logout
import userModel from "../models/userModel.js";//now using this usermodel we will create different apis, using which user can create account, login to exisiting account and user cqan logout from the account
import bcrypt from 'bcrypt'// using this we can encrpyt the password
import jwt from 'jsonwebtoken'//using this we will create a token for user authentication
import razorpay from 'razorpay'
import transactionModel from "../models/transactionModel.js";

//registeruser function, to register new user
const registerUser = async(req, res)=>{
    try{
        const{name,email,password}=req.body
        if(!name || !email || !password){
            return res.json({success:false, message: 'Missing Deatils'})
        }
        //if all the deatils are available, the next step is to encrypt the password
        const salt = await bcrypt.genSalt(10);//10 will add the moderate encryption, if we use more value, it will make string password, but will take more time
        const hashedPassword = await bcrypt.hash(password, salt)//to hash the password that the user has provided

        //store this in database
        const userData = {
            name, 
            email, 
            password: hashedPassword
            //the credit balance will be added to newUser by default, since we have specified that the creditbalance is 5 by default
        }
        //to save this userdata in mongodb database
        const newUser = new userModel(userData)
        const user = await newUser.save()

        //generate one token that will be sent in the response so that we can enable the login and registartin in the forntend
        //to generate this token we will use jwt
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)//for every user _id will be generated in the mongodb database automatically
        //send this token in response   
        res.json({success:true, token, user: {name: user.name}})
    }catch(error){
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

//to create controller function for the existing user to login in to their account
const loginUser = async(req,res)=>{
    try {
        //we will try to find the email id and password using request
        const{email,password}=req.body;
        //we have to fins the user using email id, since it is unqiue for every user
        const user = await userModel.findOne({email})

        // check if user is available with this email id or not
        if(!user){
            return res.json({success:false, message:'User does not exist'})
        }
        //if user is available, next step will be to match the password
        const isMatch = await bcrypt.compare(password, user.password)//check the entered pass with the stored pass for the user
        if(isMatch){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)//for every user _id will be generated in the mongodb database automatically
            res.json({success:true, token, user: {name: user.name}})
        }else{
            return res.json({success:false, message:'Invalid Credentials'})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})        
    }
}

const userCredits = async(req,res)=>{
    try {
        //we need user id to get credits of particular user
        const{userId} = req.body

        const user = await userModel.findById(userId)
        res.json({success: true, credits: user.creditBalance, user: {name: user.name}})
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//controller function
const paymentRazorpay = async(req,res)=>{
    try {
        const {userId, planId} = req.body
        const userData = await userModel.findById(userId)
        //to check if user data and plan id is available or not
        if(!userId || !planId){
            return res.json({success:false, message:'Missing Details'})
        }
        let credits, plan, amount, date
        
        switch (planId) {
            case 'Basic':
                plan='Basic'
                credits=100
                amount=50
                break;
            case 'Advanced':
                plan='Advanced'
                credits=500
                amount=200
                break;
            case 'BUsiness':
                plan='Business'
                credits=5000
                amount=1500
                break;
            default:
                return res.json({success:false, message:'Plan Not Found'});
        }

        date = Date.now()//it will store the current date time stamp
        //now we have to create an object which will stroe al transaction data
        const transactionData={
            userId, plan, amount, credits, date
        }
        //we have to store the transaction data in mongodb database
        const newTransaction = await transactionModel.create(transactionData)
        //we have to create an order using razorpay
        const options = {
            amount: amount*100,
            currency: process.env.CURRENCY,
            //receipt is unique, this is very imp beacuse we have to verify the razorpay payment later
            receipt: newTransaction._id,//this id is autogenerated by mongodb database

        }

        await razorpayInstance.orders.create(options, (error,order)=>{
            if (error) {
                console.log(error);
                return res.json({success: false, message:error})

            }
            res.json({success:true, order})
        })


    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

//controller function to verify razor pay
const verifyrazorpay = async (req,res) => {
    try {
        const{razorpay_order_id}=req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if(orderInfo.status === 'paid'){
            const transactionData = await transactionModel.findById(orderInfo.receipt)
            if(transactionData.payment){
                //it means payment is already verified
                return res.json({success:false, message:'Payment failed'})
            }
            const userData = await userModel.findById(transactionData.userId)

            const creditBalance = userData.creditBalance + transactionData.credits

            await userModel.findByIdAndUpdate(userData._id, {creditBalance})

            await transactionModel.findByIdAndUpdate(transactionData._id, {payment:true})

            res.json({success:true, message:'Credits added'})
        }else{
            res.json({success:false, message:'Payment Failed'})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }    
}

export {registerUser, loginUser, userCredits, paymentRazorpay, verifyrazorpay}
