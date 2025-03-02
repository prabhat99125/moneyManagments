import mongoose from "mongoose";
import { connect } from "../dbConfig/db";
connect();

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    creditors: [{
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        date: { type: Date, required: true, default: Date.now },
        village: { type: String, required: true }
    }],

    debtors: [{
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        date: { type: Date, required: true, default: Date.now },
        village: { type: String, required: true }
    }]
}, { timestamps: true });

const model = mongoose.models.Managmets || mongoose.model("Managmets", userSchema);

export default model;
