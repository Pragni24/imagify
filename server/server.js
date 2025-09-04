import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

const PORT=process.env.PORT || 4000 //backend url:localhost:4000
const app = express()

app.use(express.json())
app.use(cors())
await connectDB()//to call function connectdb, it will connect our express app with the mongodb datavbase

app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)
app.get('/',(req,res)=>res.send("API Working"))

//to start the express app
app.listen(PORT, ()=> console.log('Server running on port '+PORT));