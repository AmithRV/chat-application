import mongoose from "mongoose";

const chatScheema = mongoose.Schema({
    message: String,
    name: String,
    timeStamp: String,
    dateStamp: String,
    received: Boolean
});

export default mongoose.model('messageContent', chatScheema)