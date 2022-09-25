import mongoose from "mongoose";

const userScheema = mongoose.Schema({
    name: String,
    email: String,
    createAt: String,
    lastMeesage: String,
    imgUrl: String
});

export default mongoose.model('users', userScheema)