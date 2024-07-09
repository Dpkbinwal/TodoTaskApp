
import userAuth from "../model/userAuthModel.js";
import jwt from 'jsonwebtoken'

export const checkUser = (req,res,next)=>{
    const token = req.cookies.jwt;
    
    if(token){
        json.verify(token,"dpkbinwal secret key",async (err,decodedToken )=>{
            if(err){
                res.json({status:false});
                next();
            }else{
                const user = await userAuth.findById(decodedToken.id);
                if(user){
                    res.json({status :true ,user :user.email});
                }else res.json({status :false});
                next();
            }

        })
    }else{
        res.json({status:false});
    }
}