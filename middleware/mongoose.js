import mongoose from "mongoose";

const connectDb = handler => async (req, res)=>{
    if(mongoose.connections[0].readystate){
        return handler(req,res)
    }
        await mongoose.connect(process.env.MONGO_URI)
        return handler(req,res);
}
export default connectDb;




// const mongoose = require("mongoose");
// const uri = 'mongodb://localhost:27017';

// const connectDb = (handler) => async (req, res) => {
//   try {
//     if (mongoose.connection.readyState === 1) {
//       return handler(req, res);
//     }

//     await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log("Connected to MongoDB");
//     return handler(req, res);
//   } catch (error) {
//     console.error("MongoDB connection error:", error.message);
//     return res.status(500).json({ error: error.message });
//   }
// };

// export default connectDb;




