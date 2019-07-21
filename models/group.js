// Channel model
const mongoose = require('./connection.js')

// Creates schema for model
const GroupModelSchema = new mongoose.Schema({
 name: {
   type: String,
   default: "Global Chat",
 },
 description: {
   type: String,
 },
 channelId: {
   type: mongoose.Types.ObjectId
 }
})

//Name of collection for where groups data will be stored
const GroupCollection = mongoose.model('Group', GroupModelSchema)

//Get all groups
function getAllGroups(channelId) {
  return GroupCollection.find({channelId: channelId})
}

//Get one specific groupby groupId
function getOneGroupById(groupId) {
  return GroupCollection.findById(groupId)
}

//Create a new group by channelId
function createNewGroup(newGroups,channelId) {
  console.log(channelId)
  newGroups.channelId = channelId
  return GroupCollection.create(newGroups)
}

//delete one specific group
function deleteGroupById(groupId) {
  return GroupCollection.findByIdAndDelete(groupId)
}

function deleteAllGroups(){
  return GroupCollection.deleteMany()
}

//Update a specific Groups 
function updateGroupById(GroupsId,newGroups) {
  return GroupCollection.findByIdAndUpdate(GroupsId,newGroups,{new: true})
}

//Update a specifci Groups by its I
module.exports = {
  getAllGroups,
  getOneGroupById,
  createNewGroup,
  deleteGroupById,
  updateGroupById,
  deleteAllGroups
}
