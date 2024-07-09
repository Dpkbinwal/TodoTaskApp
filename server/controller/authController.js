import userAuth from "../model/userAuthModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const maxAge = 3*24*60*60;

const createToken = (id) =>{
    return jwt.sign({id},"dpkbinwal secret key",{
        expiresIn:maxAge,
    })
}


export const register = async(req,res, next)=>{

    try{
        const {name,email,password}= req.body;    

        const isExist =await userAuth.findOne({email: email});
        const isUsernameExist = await userAuth.findOne({name:name});
        if(isExist || isUsernameExist){
            return res.json({msg : "User email or username exist"});
        }
        
        
        const hashPassword = await bcrypt.hash(password,10);
        
        const user = await userAuth.create({name:name,email:email,password:hashPassword});
        const token = createToken(user._id);


        res.cookie("jwt",token,{
            withCredentials:true,
            httpOnly:false,
            maxAge:maxAge*1000,
        });

        res.status(201).json({msg:"user created successfully",user: user._id, created:true});


    }catch(err){
        console.log(err);
        // res.status(400).
    }
   
}


export const login = async(req,res,next)=>{

    const {email, password} = req.body;

    const user= await userAuth.findOne({email: email});
    if(!user){
        return res.json({msg:"User not exist"});
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.json({msg:"incorrect credentials"})
    }
    
    const token = createToken(user._id);


    res.cookie("jwt",token,{
        withCredentials:true,
        httpOnly:false,
        maxAge:maxAge*1000,
    });



    res.status(200).json({msg:"Login successfully" , isVerified: true , id:user.id})
  
}