import axios from "axios"
import userModel from "../models/userModel.js"
import FormData from "form-data"
import { response } from "express"

export const generateImage = async(req,res)=>{
    try {
        //we will write the logic here, to generate the image using the prompt
        const {userId, prompt}=req.body

        //fetching the user using userid
        const user = await userModel.findById(userId)
        //if user is not available or prompt is not available
        if(!user || !prompt){
            return res.json({success:false, message:'Missing Details'})
        }
        //now we will check the users balance, if the balance is 0 or less, we cant generate image
        if(user.creditBalance ===0 || userModel.creditBalance<0){
            return res.json({success:false, message:'No Credit Balance',creditBalance: user.creditBalance})
        }
        // if the balance is greater than zero than we have to provide the image by using the clipdrop api
        const formData = new FormData()
        formData.append('prompt',prompt)

        //next we have to send this formdata to the api
        //we will use axios to make the api request
        //in data, we will store the response from the api call, we will get response in array buffer, and using that array buffer we have to convert the image to base 64
        const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers:{
                'x-api-key': process.env.CLIPDROP_API,
            },
            responseType:'arraybuffer'
        })

        const base64Image = Buffer.from(data, 'binary').toString('base64')
        //using this base64image we have to generate the url
        const resultImage = `data:image/png;base64,${base64Image}`
        //deduct the userscredits, since we generated image so deduct one credit
        await userModel.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance-1})
        res.json({success:true, message:"Image Generated", creditBalance:user.creditBalance-1, resultImage})
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message: error.message})
    }
}