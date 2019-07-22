// User model
const mongoose = require('./connection.js')

// Creates user schema for model
const UserModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

// Name of collection for where users data will be stored
const UserCollection = mongoose.model('User', UserModelSchema)

// Get all Users
function getAllUsers() {
  return UserCollection.find()
}

//Get one specific user by Id
function getUserById(userId) {
  return UserCollection.findById(userId)
}

//Create a new user
function createNewUser (newUser) {
  return UserCollection.create(newUser)
}

//delete one user
function deleteUserByID (userId) {
  return UserCollection.findByIdAndDelete()
}

//delete all users
function deleteAllUsers () {
  return UserCollection.deleteMany()
}

//update one user model\
function updateUserById (userId, updatedUser) {
  return UserCollection.findByIdAndUpdate(userId,updatedUser,{new: true})
}

//export all method
module.exports ={
  getAllUsers,
  getUserById,
  createNewUser,
  deleteAllUsers,
  deleteUserByID,
  updateUserById
}