// Channel model
const mongoose = require('./connection.js')

// Creates schema for model
const MessageModelSchema = new mongoose.Schema({
 user: {
   type: String,
   default: "Anon"
 },
 message: {
   type: String,
   default: 'new stuff'
 },
 groupId: {
   type: mongoose.Types.ObjectId
 }
},{timestamps: true})

//Name of collection for where messages data will be stored
const MessageCollection = mongoose.model('Message', MessageModelSchema)

//Get all messages by groupId 
function getAllMessages(groupId) {
  return MessageCollection.find({groupId: groupId})
}

//Get one specific message by messageId
function getOneMessageById(messageId) {
  return MessageCollection.findById(messageId)
}

//Create a new message by groupId
function createNewMessage(newMessage, groupId) {
  newMessage.groupId = groupId
  return MessageCollection.create(newMessage)
}

//delete one specific message
function deleteMessageById(messageId) {
  return MessageCollection.findByIdAndDelete(messageId)
}

//delete all messages
function deleteAllMessages(){
  return MessageCollection.deleteMany()
}

//Update a specific messages 
function updateMessageById(messagesId,newMessages) {
  return MessageCollection.findByIdAndUpdate(messagesId,newMessages,{new: true})
}

//Update a specifci Messages by its I
module.exports = {
  getAllMessages,
  getOneMessageById,
  createNewMessage,
  deleteMessageById,
  updateMessageById,
  deleteAllMessages
}
