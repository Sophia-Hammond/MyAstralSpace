const { Timestamp } = require("bson");
const mongoose = require("mongoose");

const thoughtBoardSchema = new mongoose.Schema({
    user: { // user who created the board
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },
    thoughts: [ // array of thoughts and its position on the screen 
        {
            text: String,
            position: {
                x: Number,
                y: Number,
            },
            Timestamp: { type: Date, defult: Date.now },
        },
    ],
    background: { // stored the video background for the board 
        type: String, 
        required: true, 
    },
});

module.exports = mongoose.model("ThoughtBoard", thoughtBoardSchema);