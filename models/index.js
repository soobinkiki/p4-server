const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/2048'

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

const db = mongoose.connection

db.once('open', () => {
    console.log(`mongoDB connected @ ${db.host}:${db.port} ⛓️`)
})

db.on('error', err => {
    console.error(err)
})