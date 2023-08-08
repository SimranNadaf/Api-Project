const mongoose=require("mongoose")
const { Schema } = mongoose;

const authorSchema = new Schema({
    Id:String,
    name:String,
    books:[String]
});

const AuthorModel = mongoose.model('author',authorSchema);
module.exports = AuthorModel;