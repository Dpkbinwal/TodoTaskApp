import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser"
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";
import userAuth from "./routes/authRoute.js"
import cookieParser from "cookie-parser";

const app = express();
app.use(bodyParser.json());
// app.use(cors());
dotenv.config();
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:3000', // your frontend origin
    credentials: true, // to enable passing of cookies
  };
  
  app.use(cors(corsOptions));

 
app.get('/', (req, res) => {res.send("Hii")})

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(()=>{

    console.log("DB connected successfully");

    app.listen(PORT, ()=>{
        console.log(`Server is running on port: ${PORT}`);
    })

}).catch(error => console.log(error));


app.use("/api", route);

app.use("/auth",userAuth);