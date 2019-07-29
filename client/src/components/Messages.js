import React, { Component } from 'react'
import axios from 'axios';
import Message from './Message.js'
import './Messages.css'
import io from 'socket.io-client'

export default class Messages extends Component {

    //Edit a message
    editMessage = (messageId, newMessage) => {
        axios.put(`/api/channels/${this.props.activeGroup.channelId}/groups/${this.props.activeGroup._id}/messages/${messageId}`, newMessage)
            .then(() => {
                this.props.getAllMessagesByGroupId()
            })
    }

    //create a Message
  

    //delete a message
    deleteMessage = (messageId) => {
        axios.delete(`/api/channels/${this.props.activeGroup.channelId}/groups/${this.props.activeGroup._id}/messages/${messageId}`)
            .then(() => {
                this.props.getAllMessagesByGroupId()
            })
    }

    //Scroll to bottom of page
    componentDidUpdate() {
        this.setScrollToBottomOfMessageContainer()
    }
   
    //start listening for data from socket
    componentDidMount() {
        this.getMessageFromWebSocketServer()
    }

    //Show newest images located at the bottom
    setScrollToBottomOfMessageContainer = () => {
        this.messegesContainer.scrollTop = 990000
    }

    //establish connection to websocket
    socket = io()

    //send input message 
    sendMessageToWebSocketServer = (event, message) => {
        event.preventDefault()
        if (message !== '') {
            this.socket.emit('message', {
                user: this.props.currentUser,
                message: message
            })
            this.input.value = ''
        }
    }

    //listen for messages from websocket server
    getMessageFromWebSocketServer = () => {
        this.socket.on('newMessage', (data) => {
            this.props.createMessage(data)
                .then((res) => this.props.updateMessagesState(res.data))
        })
    }

    render() {

        let messagesList = this.props.messages.map(message => {
            return (
                <Message
                    key={message._id}
                    id={message._id}
                    user={message.user}
                    message={message.message}
                    editMessage={this.editMessage}
                    deleteMessage={this.deleteMessage}
                />
            )
        })


        return (
            <div className='Messages col-md-8'>
                <h1>{this.props.activeGroup.name}</h1>
                <div
                    ref={a => this.messegesContainer = a}
                    className="MessagesContainer">
                    {messagesList}
                </div>
                <form
                    className='messageForm'>
                    <input
                        className='MessageInputField form-control'
                        type='text'
                        ref={inputElement =>
                            this.input = inputElement}
                    />
                    <button
                        className='btn MessageSubmitButton'
                        onClick={(evt) => this.sendMessageToWebSocketServer(evt, this.input.value)}>
                        Send</button>
                </form>

            </div>
        )
    }
}
