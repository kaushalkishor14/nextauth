import mongoose from "mongoose";


export async function  connect (){
    try {
        
        mongoose.connect(process.env.MONGO_URL!);
        
        const connection = mongoose.connection

        connection.on("connected", ()=>{
            console.log("MongoDB connected successfully")
        })

        connection.on("error", (error)=>{
            console.log("MongoDB connection failed" + error)
            process.exit()
        })




    } catch (error) {
        console.log("Something went wrong in connecting to db", error)
    }
}