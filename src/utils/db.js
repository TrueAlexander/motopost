import mongoose from "mongoose"

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO)
    console.log("Connected to DB successfully")
  } catch (error) {
    throw new Error("Connection to DB failed!", error)
  }
}

export default connect