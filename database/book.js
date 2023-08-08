const mongoose=require("mongoose")
const { Schema } = mongoose;

const bookSchema = new Schema({
    ISBN:String,
    title:String,
    pubdate:String,
    language:String,
    numpage:Number,
    author:[String],
    publication:[String],
    category:[String]
});

const BookModel = mongoose.model('book',bookSchema);
module.exports = BookModel;