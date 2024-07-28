import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already connected");
    return;
  }

  if (connectionState === 2) {
    console.log("Connecting...");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI!, {
      dbName: "nextjsrestapi",
      bufferCommands: true,
    });
    console.log("Connected to MongoDB");
  } catch (err: any) {
    console.error("Error connecting to MongoDB: ", err);
  }
};

export default connect;
