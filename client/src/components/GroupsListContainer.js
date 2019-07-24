import React, { Component } from 'react'
import axios from 'axios'
 

export default class GroupsListContainer extends Component {

    state = {
        channel: {
            name: '',
            description: '',
            color: '',
            password: '',
            _id: ''
        },
        groupsList: [],
    }

    //Get all the groups that are associated with this channel
    getGroupsForSpecificChannel = () => {
        axios.get(`/api/channels/${this.state.channel._id}/groups`)
            .then(res => {
                let newGroupsList = res.data
                this.setState({ groupsList: newGroupsList })
            })
    }

    //Code to run when component mounts
    componentDidMount() {
        this.getChannelInformation()
    }

    //Get all the information for the current channel
    getChannelInformation = () => {
        axios.get(`/api/channels/${this.props.match.params.channelId}`)
            .then(res => {
                let newChannel = res.data
                this.setState({ channel: newChannel })
                this.getGroupsForSpecificChannel()
            })
    }


    render() {

        //Destructure channel object
        let { name, description, color, password, _id } = this.state.channel

        
        return (
            <div>
                <h1>{name}</h1>

            </div>
        )
    }
}


//display the available groups