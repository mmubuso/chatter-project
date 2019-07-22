//Setup controller for user model
const express = require('express')

//import user model to access user method
const userApi = require('../models/user.js')

//create a router for express to use for user paths
const userRouter = express.Router()

//Path to get all users
userRouter.get('/', (req, res) => {
  userApi.getAllUsers()
    .then(users => res.send(users))
    .catch(err => console.log(err))
})

//Path to get one user
userRouter.get('/:userId', (req, res) => {
  userApi.getAllUsers(req.params.userId)
    .then(user => res.send(user))
    .catch(err => console.log(err))
})

//path to create a user
userRouter.post('/', (req, res) => {
  userApi.createNewUser(req.body)
    .then(newUser => res.send(newUser))
    .catch(err => console.log(err))
})

//path to update a user
userRouter.put('/:userId', (req, res) => {
  userApi.updateUserById(req.params.userId,req.body)
    .then(() => res.send('User was updated'))
    .catch(err => console.log(err))
})

//path to delete a specific user
userRouter.delete('/:userId', (req, res) => {
  userApi.deleteUserByID(req.params.userId)
    .then(() => res.send('user was deleted'))
    .catch(err => console.log(err))
})

//path to delete all users
userRouter.delete('/', (req, res) => {
  userApi.deleteAllUsers()
    .then(() => res.send('delete all users'))
})

//Export user router 
module.exports = {
  userRouter
}