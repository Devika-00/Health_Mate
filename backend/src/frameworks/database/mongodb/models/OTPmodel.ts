import mongoose from "mongoose";

const OTPModel = new mongoose.Schema(
  {
    OTP: {
      type: String,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Add TTL index for automatic expiration after 120 seconds
OTPModel.index({ createdAt: 1 }, { expireAfterSeconds: 120 });

export default mongoose.model("OTP", OTPModel);
