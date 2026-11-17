import mongoose from "mongoose";

let connectionPromise;

export const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not configured");
  }

  // Reuse an existing connection.
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // Reuse an ongoing connection attempt.
  if (!connectionPromise) {
    console.log("[MongoDB] Connecting...");

    connectionPromise = mongoose
      .connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
      })
      .then((connection) => {
        console.log(`[MongoDB] Connected to ${connection.connection.host}`);

        return connection;
      })
      .catch((error) => {
        connectionPromise = undefined;

        console.error("[MongoDB] Connection failed:", error);

        throw error;
      });
  }

  return connectionPromise;
};

// Reset the cached promise if the connection is disconnected.
mongoose.connection.on("disconnected", () => {
  connectionPromise = undefined;
});
