//Setup controller for group model
const express = require('express')

//variable used to access group model methods
const groupApi = require('../models/group.js')

//Express router
const groupRouter = express.Router({mergeParams: true})

//Path to get all groups
groupRouter.get('/', (req, res) => {
  groupApi.getAllGroups(req.params.channelId)
    .then(groups => res.json(groups))
    .catch(err => console.log(err))
})

//Path to get one group
groupRouter.get('/:groupId', (req,res) => {
  groupApi.getOneGroupById(req.params.groupId)
    .then(group => res.json(group))
    .catch(err => console.log(err))
})

//Path to create a new post
groupRouter.post('/', (req,res) => {
  groupApi.createNewGroup(req.body, req.params.channelId)
    .then(createdgroup => res.json(createdgroup))
    .catch(err => console.log(err))
})

//Update an individual group
groupRouter.put('/:groupId', (req,res) =>{
  groupApi.updateGroupById(req.params.groupId,req.body)
    .then(updatedgroup => res.json(updatedgroup))
    .catch(err => console.log(err))
})

//delete every group 
groupRouter.delete('/', (req,res) => {
  groupApi.deleteAllGroups()
    .then(() => res.json('deleted all groups'))
    .catch(err => console.log(err))
})


//delete an individual group
groupRouter.delete('/:groupId', (req,res) => {
  groupApi.deleteGroupById(req.params.groupId)
    .then(deletedgroup => res.json(deletedgroup))
    .catch(err => console.log(err))
})

module.exports = {
  groupRouter
}
