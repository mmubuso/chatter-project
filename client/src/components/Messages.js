import React, { Component } from 'react'
import axios from 'axios';

export default class Messages extends Component {

    state = {
        messages: [],
        currentUser: 'Anon'
    }

    //
    componentDidMount() {
        this.getAllMessagesByGroupId()
        this.updateUserInfoWithLocalStorage()
    }


    //Get all the messages for this group
    getAllMessagesByGroupId = () => {
        axios.get(`/api/channels/${this.props.activeGroup.channelId}/groups/${this.props.activeGroup._id}/messages`)
            .then(res => {
                this.setState({ messages: res.data })
            })
            .catch(err => console.log('Error' + err))
    }

    //create method to pull user info from localStorage
    updateUserInfoWithLocalStorage = () => {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        this.setState({ currentUser: userInfo.name })
    }

    //create a Message
    createMessage = (event) => {
        event.preventDefault()
        if (this.input.value !== '') {
            axios.post(`/api/channels/${this.props.activeGroup.channelId}/groups/${this.props.activeGroup._id}/messages`,
                {
                    user: this.state.currentUser,
                    message: this.input.value
                }
            )
            this.input.value = ''
            this.getAllMessagesByGroupId()
        }
    }
    render() {

        let messagesList = this.state.messages.map(message => {
            return (
                <div>
                    <p><span>{message.user}</span>: {message.message}</p>
                </div>
            )
        })

        return (
            <div className='col-md-9'>
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
