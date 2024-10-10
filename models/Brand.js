import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    model: { type: mongoose.Schema.Types.ObjectId, ref: "model" },
    name: {
        type: String,
        required: true
    },
    color: String,
    amount: Number,

});

const Brand = mongoose.models.brand || mongoose.model("brand", brandSchema);

export default Brand;