//Setup controller for group model
const express = require('express')

//variable used to access group model methods
const messageApi = require('../models/message.js')

//Express router
const messageRouter = express.Router({mergeParams: true})

//Path to get all messages
messageRouter.get('/', (req, res) => {
  messageApi.getAllMessages(req.params.groupId )
    .then(messages => res.json(messages))
    .catch(err => console.log(err))
})

//Path to get one message
messageRouter.get('/:messageId', (req,res) => {
  messageApi.getOneMessageById(req.params.messageId)
    .then(message => res.json(message))
    .catch(err => console.log(err))
})

//Path to create a new message
messageRouter.post('/', (req,res) => {
  messageApi.createNewMessage(req.body, req.params.groupId)
    .then(createdMessage => res.json(createdMessage))
    .catch(err => console.log(err))
})

//Update an individual message
messageRouter.put('/:messageId', (req,res) =>{
  messageApi.updateMessageById(req.params.messageId,req.body)
    .then(updatedMessage => res.json(updatedMessage))
    .catch(err => console.log(err))
})

//delete every message 
messageRouter.delete('/', (req,res) => {
  messageApi.deleteAllMessages()
    .then(() => res.json('deleted all messages'))
    .catch(err => console.log(err))
})

//delete an individual message
messageRouter.delete('/:messageId', (req,res) => {
  messageApi.deleteMessageById(req.params.messageId)
    .then(deletedMessage => res.json(deletedMessage))
    .catch(err => console.log(err))
})

module.exports = {
  messageRouter
}
