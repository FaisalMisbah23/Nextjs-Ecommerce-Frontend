const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: string },
        quantity: { type: Number, default: 1 },
      },
    ],
    address: {
      type: String,
      required: true,
    },
    amount: { type: Number, required: true },
    status: { type: Number, required: true, default: "Pending" },
  },
  { timestamps: true }
);

mongoose.models={}
export default mongoose.model("Order", OrderSchema);
