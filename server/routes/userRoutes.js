import express from 'express'
import {registerUser, loginUser, userCredits, paymentRazorpay, verifyrazorpay} from '../controllers/userController.js'
import userAuth from '../middlewares/auth.js'

const userRouter = express.Router()
userRouter.post('/register',registerUser)//at this path it will execute the controller funtion registeruser
userRouter.post('/login',loginUser)//here it will execute the loginuser contoller function
userRouter.get('/credits', userAuth, userCredits)
userRouter.post('/pay-razor', userAuth, paymentRazorpay)
userRouter.post('/verify-razor', verifyrazorpay)
export default userRouter

//localhost:4000/api/user/register      //whenever we will hit this endpoint, it will execute the registerUser controller function
//localhost:4000/api/user/login      //whenever we will hit this endpoint, it will execute the loginUser controller function
//localhost:4000/api/user/credits
                          

