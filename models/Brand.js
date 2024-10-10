import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  color : String
});

const Brand = mongoose.models.brand || mongoose.model("brand", brandSchema);

export default Brand;