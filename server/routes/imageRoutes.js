//api endpoint using generateimage controller function
import express from 'express'
import { generateImage } from '../controllers/imageController.js'
import userAuth from '../middlewares/auth.js'

const imageRouter = express.Router()
//now in this router add path and provide the controller function so that we can create the api endpoint
imageRouter.post('/generate-image', userAuth ,generateImage)

export default imageRouter