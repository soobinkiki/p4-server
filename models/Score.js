const mongoose = require('mongoose')

const ScoreSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    score: {
        type: Number
    }
}, {
    timestamps: true
})

const Score = mongoose.model('score', ScoreSchema)
module.exports = Score