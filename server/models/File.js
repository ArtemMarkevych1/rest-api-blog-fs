const mongoose = require("mongoose")

const fileSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    originalName: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    size: Number,
    mimeType: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
},
    {
        timestamps: true
    }
)

const File = mongoose.model("File", fileSchema)

module.exports = File