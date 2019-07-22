//import all Apis
const userApi = require('./user.js')
const messageApi = require('./message.js')
const channelApi = require('./channel.js')
const groupApi = require('./group.js')


//Create test data objects
//channels
const regularFolksChannel = {
    name: 'Regular folks',
    description: 'the most boring people in the universe',
    color: 'gray',
    password: 'password'
}

const developersCircleChannel = {
    name: 'Developer Circle',
    description: 'hello world',
    color: 'blue',
    password: 'password'
}
//groups
const pencilCounters = {
    name: 'Counting Pencils',
    description: 'Who wants to count pencils with me'
}

const howManyLicksDoesItTakeToGetToTheCenteOfTootsiePopGroup = {
    name: 'How many licks does it take to get to the center of a tootsie pop',
    description: 'You hava a tonge and we have pops, lets get too licking'
}

const weDoReactGroup = {
    name: 'We Do React',
    description: 'A group of developers who like React'
}

const machinesCanLearn = {
    name: 'Machines can learn',
    description: 'Folks who like to learn about machine learning'
}
//messages
const ojSimpsonMessage = {
    user: 'Orange Juice Simpson',
    message: 'looking for friends'
}

const ojSimpson2Message = {
    user: 'Orange Juice Simposn',
    message: 'It takes 30 licks to get to the center'
}

const ojSimpson3Message = {
    user: 'Orange Juice Simposn',
    message: 'I love counting pencils'
}

const bardiMessage = {
    user: 'Bardi',
    message: 'Okurrrrr'
}

const bardi2Message = {
    user: 'Bardi',
    message: 'Eeeeooowwww'
}

const guwopMessage = {
    user: 'Radric Davis',
    message: 'Burrrr'
}

const guwop2Message = {
    user: 'Radric Davis',
    message: 'Bricccck Squaddd'
}

const chadTheCoderMessage = {
    user: 'Chad The Code',
    message: 'Burrrrr'
}

const chadTheCoder2Message = {
    user: 'Chad The Code',
    message: 'I am an Apple from the future, here to educate and strengthen the human race before the androids attack!'
}
//users
const chadTheCoder = {
    name: 'Chad the Coder',
}

const bardi = {
    name: 'Bardi'
}

const radricDavis = {
    name: 'Radric Davis'
}

const ojSimpson = {
    name: 'Orange Juice Simpson'
}

//script to load files to local host
let runScript = async () => {
    try {
        await deleteAllFiles()
        await createChannel()
        await createUsers()
        console.log('Deleted all files and created new files')
        process.exit()
    }
    catch (err) {
        console.log('unable to delete files ' + err)
        process.exit()
    }
}

//delete all items in data
let deleteAllFiles = async () => {
    await userApi.deleteAllUsers()
    await messageApi.deleteAllMessages()
    await groupApi.deleteAllGroups()
    await channelApi.deleteAllChannels()
}

//Creates channels 
let createChannel = async () => {
    let firstChannel = await channelApi.createNewChannel(regularFolksChannel)
    let secondChannel = await channelApi.createNewChannel(developersCircleChannel)
    await createGroup(firstChannel, pencilCounters, howManyLicksDoesItTakeToGetToTheCenteOfTootsiePopGroup)
    await createGroup(secondChannel, machinesCanLearn, weDoReactGroup)
}

//Create groups
let createGroup = async (channel, group1, group2) => {
    let firstGroup = await groupApi.createNewGroup(group1, channel._id)
    let secondGroup = await groupApi.createNewGroup(group2, channel._id)
    await createMessages(firstGroup, secondGroup)
}

//create messages
let createMessages = async (firstGroup, secondGroup) => {
    await messageApi.createNewMessage(ojSimpsonMessage, firstGroup._id)
    await messageApi.createNewMessage(ojSimpsonMessage, secondGroup._id)
    await messageApi.createNewMessage(ojSimpson2Message, secondGroup._id)
    await messageApi.createNewMessage(ojSimpson3Message, firstGroup._id)
    await messageApi.createNewMessage(guwopMessage, firstGroup._id)
    await messageApi.createNewMessage(guwop2Message, secondGroup._id)
    await messageApi.createNewMessage(chadTheCoderMessage, firstGroup._id)
    await messageApi.createNewMessage(chadTheCoder2Message, secondGroup._id)
    await messageApi.createNewMessage(bardiMessage, firstGroup._id)
    await messageApi.createNewMessage(bardi2Message, secondGroup._id)
}

//create users
let createUsers = async () => {
    await userApi.createNewUser(chadTheCoder)
    await userApi.createNewUser(bardi)
    await userApi.createNewUser(ojSimpson)
    await userApi.createNewUser(radricDavis)
}


runScript()
