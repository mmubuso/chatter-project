import React, { Component } from 'react'
import Axios from 'axios';

export default class Messages extends Component {

    state = {
        messages: []
    }

    //
    componentDidMount() {
        this.getAllMessagesByGroupId()
    }
   

    //Get all the messages for this group
    getAllMessagesByGroupId = () => {
        Axios.get(`/api/channels/${this.props.activeGroup.channelId}/groups/${this.props.activeGroup._id}/messages`)
            .then(res => {
                this.setState({messages: res.data})
            })
            .catch(err => console.log('Error' + err))
    }


    render() {
        let messagesList = this.state.messages.map(message => {
            return(
                <p>{message.message}</p>
            )
        })
        return (
            <div className='col-md-9'>
                <h1>{this.props.activeGroup.name}</h1>
                {messagesList}
            </div>
        )
    }
}
