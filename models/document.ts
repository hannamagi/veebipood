import mongoose from "mongoose";

const document = new mongoose.Schema({
    dokumentType: {
        required: true,
        type: String
    },
    number: {
        required: true,
        type: Number
    },
    riik: {
        required: true,
        type: String
    },
    valjastusaeg: {
        required: true,
        type: Date
    },
    kehtivuseaeg: {
        required: true,
        type: Date
    },
    valjastanudriik: {
        required: true,
        type: String
    }
})

export default mongoose.model('Document', document);