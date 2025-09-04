// we have to find the user id using the json web joken, so we import jwt
import jwt from 'jsonwebtoken'
//whenever success will be tru we will call next method which will execute the controller function


//this userAuth is a middleware that will find the userId from the token and it will add that userid in the request body

const userAuth = async(req,res,next)=>{
    const {token} = req.headers;
    //from this token fin uders id
    if(!token){
        return res.json({success: false, message:'Not Authorized. Login Again'});
    }
    try{
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if(!req.body){
            req.body={};
        }
        if(tokenDecode.id){
            req.body.userId = tokenDecode.id;//so user id will be added in request body
        }else{
            return res.json({success: false, message:'Not Authorized. Login Again'});
        }

        //now we have to call the next method, which will execute the controller function whichwill return the users credit
        next();
    }catch(error){
        res.json({success:false, message:error.message});
    }
};
export default userAuth;