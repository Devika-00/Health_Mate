import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
    },
    type: {
      type: String,
      enum: ["Credit", "Debit"],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);