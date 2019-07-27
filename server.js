//import express framework
const express = require('express')
const app = express()
const socket = require('socket.io')

//import router from controller
const { channelRouter } = require('./controllers/channel.js')
const { groupRouter } = require('./controllers/group.js')
const { messageRouter } = require('./controllers/message.js')
const { userRouter } = require('./controllers/user.js')

//Used to parse the body of the HTTP requests from a URL encoded string 
app.use(express.urlencoded({extended: true}))

 //Used to parse the body of the HTTP requests from a JSON string  
app.use(express.json())

//use the `./client/build` directory to host static resources such as css and js
app.use(express.static(`${__dirname}/client/build`))

//add router for express to use
app.use('/api/channels', channelRouter)
app.use('/api/channels/:channelId/groups', groupRouter)
app.use('/api/channels/:channelId/groups/:groupId/messages', messageRouter)
app.use('/api/users/', userRouter)

//catches all other get requests that arent aimed at our APIs
app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
})

//set the port to be used
const PORT = process.env.PORT || 3001

//Set por tthat the server will be listening on
const server = app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})

const io = socket(server)

io.on("connection", (socket) => {
    console.log('Connected to socket')
})

