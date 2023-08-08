const mongoose=require("mongoose")
const { Schema } = mongoose;

const publicationSchema = new Schema({
    Id:String,
    name:String,
    books:[String]
});

const PublicationModel = mongoose.model('publication',publicationSchema);
module.exports = PublicationModel;