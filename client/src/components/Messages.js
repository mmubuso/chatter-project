import React, { Component } from 'react'
import axios from 'axios';
import Message from './Message.js'

export default class Messages extends Component {

    //Edit a message
    editMessage = (messageId, newMessage) => {
        axios.put(`/api/channels/${this.props.activeGroup.channelId}/groups/${this.props.activeGroup._id}/messages/${messageId}`, newMessage)
            .then(() => {
                this.props.getAllMessagesByGroupId()
            })
    }

    //create a Message
    createMessage = (event) => {
        event.preventDefault()
        if (this.input.value !== '') {
            axios.post(`/api/channels/${this.props.activeGroup.channelId}/groups/${this.props.activeGroup._id}/messages`,
                {
                    user: this.props.currentUser,
                    message: this.input.value
                }
            )
            this.input.value = ''
            this.props.getAllMessagesByGroupId()
        }
    }

    //delete a message
    deleteMessage = (messageId) => {
        console.log(messageId)
        axios.delete(`/api/channels/${this.props.activeGroup.channelId}/groups/${this.props.activeGroup._id}/messages/${messageId}`)
            .then(() => {
                this.props.getAllMessagesByGroupId()
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
            <div className='col-md-8'>
                <h1>{this.props.activeGroup.name}</h1>
                {messagesList}
                <form onSubmit={this.createMessage}>
                    <input
                        type='text'
                        ref={inputElement =>
                            this.input = inputElement}
                    />
                    <submit onClick={(evt) => this.createMessage(evt)} >Send</submit>
                </form>
            </div>
        )
    }
}
