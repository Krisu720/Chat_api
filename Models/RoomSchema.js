const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
    name: String,
    password: {type:String,required: true},
    secret: {type:String, required: true},
    creator: {type:String,required: true},
    users: [String],
},{timestamps: true})


module.exports = mongoose.model('Room',RoomSchema)