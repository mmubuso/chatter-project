//import express framework
const express = require('express')
const app = express()

//import router from controller
const { channelRouter } = require('./controllers/channel.js')



//Used to parse the body of the HTTP requests from a URL encoded string 
app.use(express.urlencoded({extended: true}))


 //Used to parse the body of the HTTP requests from a JSON string  
app.use(express.json())



//use the `./client/build` directory to host static resources such as css and js
app.use(express.static(`${__dirname}/client/build`))


//add router for express to used
app.use('/api/channels', channelRouter)

//catches all other get requests that arent aimed at our APIs
app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
})

//set the port to be used
const PORT = process.env.PORT || 3001

//Set por tthat the server will be listening on
app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})
