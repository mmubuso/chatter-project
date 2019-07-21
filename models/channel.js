// Channel model
const mongoose = require('./connection.js')

// Creates schema for model
const ChannelModelSchema = new mongoose.Schema({
 name: {
   type: String,
   default: "Global Chat",
 },
 description: {
   type: String,
 },
 color: {
   type: String
 },
 password: {
   type: String
  //  required: true
 }
  

})

//Name of collection for where channel data will be stored
const ChannelCollection = mongoose.model('Channel', ChannelModelSchema)

//Get all channels
function getAllChannels() {
  return ChannelCollection.find()
}

//Get one specific channel by Id
function getOneChannelById(channelId) {
  return ChannelCollection.findById(channelId)
}

//Create a Channel
function createNewChannel(newChannel) {
  return ChannelCollection.create(newChannel)
}

//Delete a specific channel
function deleteChannelById(channelId) {
  return ChannelCollection.findByIdAndDelete(channelId)
}

//Update a specific channel 
function updateChannelById(channelId,newChannel) {
  return ChannelCollection.findByIdAndUpdate(channelId,newChannel,{new: true})
}

//Update a specifci channel by its I
module.exports = {
  getAllChannels,
  getOneChannelById,
  createNewChannel,
  deleteChannelById,
  updateChannelById
}
