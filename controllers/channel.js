//Setup controller for channel model
const express = require('express')

//variable used to access channel model methods
const channelApi = require('../models/channel.js')

//Express router
const channelRouter = express.Router()

//Path to get all channels
channelRouter.get('/', (req, res) => {
  channelApi.getAllChannels()
    .then(channels => res.send(channels))
    .catch(err => console.log(err))
})

//Path to get one channel
channelRouter.get('/:channelId', (req,res) => {
  channelApi.getOneChannelById(req.params.channelId)
    .then(channel => res.send(channel))
    .catch(err => console.log(err))
})

//Path to create a new post
channelRouter.post('/', (req,res) => {
  channelApi.createNewChannel(req.body)
    .then(createdChannel => res.send(createdChannel))
    .catch(err => console.log(err))
})

//Update an individual channel
channelRouter.put('/:channelId', (req,res) =>{
  channelApi.updateChannelById(req.params.channelId,req.body)
    .then(updatedChannel => res.send(updatedChannel))
    .catch(err => console.log(err))
})

//delete an individual channel
channelRouter.delete('/', (req,res) => {
  channelApi.deleteAllChannels()
    .then(()=> res.send('deletedAllchannel'))
    .catch(err => console.log(err))
})


//delete an individual channel
channelRouter.delete('/:channelId', (req,res) => {
  channelApi.deleteChannelById(req.params.channelId)
    .then(deletedChannel => res.send(deletedChannel))
    .catch(err => console.log(err))
})

module.exports = {
  channelRouter
}
