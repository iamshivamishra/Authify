import mongoose from "mongoose";

export async function connectToDatabase() {
  try{
    await mongoose.connect(process.env.MONGO_URL!)
    const connection = mongoose.connection;

    connection.on('connected',() => {
      console.log("Connected to the database successfully");
    })

    connection.on('error',(err) => {
      console.error("Error connecting to the database:", err);
      process.exit();
    })

  }catch(error){
    console.error("Error connecting to the database:", error);
  }
}



