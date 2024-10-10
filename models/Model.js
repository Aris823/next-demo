import mongoose from "mongoose";

const modelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amount : Number
});

const Model = mongoose.models.model || mongoose.model("model", modelSchema);

export default Model;
