import mongoose from "mongoose";

const user = new mongoose.Schema({
    personalCode: {
        required: true,
        type: String
    },
    contactData: {
        required: true,
        type: mongoose.Schema.Types.ObjectId, ref: 'ContactData'
    },
    email: {
        required: true,
        type: String
    },
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    telephone: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    admin: {
        required: true,
        type: Boolean
    },
    created: {
        required: true,
        type: Date
    },
})

export default mongoose.model('User', user);