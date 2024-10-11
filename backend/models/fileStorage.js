const mongoose = require('mongoose')
require('dotenv').config()



const fileSchema = mongoose.Schema({
    fileName : {
        type : String,
        required: true,
        unique:true,
    },
    fileCode : {
        type : Number,
        required: true,
        unique: true,
    },
    originalName : {
        type: String,
        required:true,
    },
    fileSize : {
        type:Number,
        required: true
    }
}, {timestamps: true})

const filemodel = mongoose.model('file', fileSchema)

module.exports = filemodel;