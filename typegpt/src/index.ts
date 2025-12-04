import "reflect-metadata"
import AppDataSource from "./config/database.config.ts";
import express from "express";
import router from "./Routes/User.router.ts";
import cookieparser from "cookie-parser";
import cors from "cors"
import messageRoute from "./Routes/message.routes/messages.routes.ts";

const app = express();
app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());
app.use(cors({
     origin:"http://localhost:5173",
        credentials:true
}));


AppDataSource.initialize()
.then(async()=>{
    console.log("database connected successfully");

    app.use("/auth",router);
    app.use("/chat",messageRoute)
    app.listen(8000,()=>{
        console.log("server is running ");
    })
 
})
.catch((err)=>{
    console.error("the error is "+err)
});

