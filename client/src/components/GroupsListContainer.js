import React, { Component } from 'react'
import axios from 'axios'
import Groups from './Groups.js'
import Messages from './Messages.js'

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
        activeGroup: {},
        toggleMessages: false,
        messages: [],
        currentUser: 'Anon'
    }
    //Code to run when component mounts
    componentDidMount() {
        this.getChannelInformation()
        this.updateUserInfoWithLocalStorage()
    }

    //Set active group
    setAsActiveGroup = (group) => {
        this.setState({ activeGroup: group },
            () => {
                this.getAllMessagesByGroupId()
                this.showMessages()
            })
    }

    //toggle messages 
    showMessages = () => {
        this.setState({ toggleMessages: true })
    }

    //Get all the groups that are associated with this channel
    getGroupsForSpecificChannel = () => {
        axios.get(`/api/channels/${this.state.channel._id}/groups`)
            .then(res => {
                let newGroupsList = res.data
                this.setState({ groupsList: newGroupsList })
            })
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

    //Get all the messages for this group
    getAllMessagesByGroupId = () => {
        axios.get(`/api/channels/${this.state.activeGroup.channelId}/groups/${this.state.activeGroup._id}/messages`)
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

    render() {

        //Destructure channel object
        let { name, description, color, password, _id } = this.state.channel


        return (
            <div className='row'>
                <h1 className='display-3 col-12'>{name}</h1>
                <Groups
                    groups={this.state.groupsList}
                    setActiveGroup={this.setAsActiveGroup} />
                {
                    this.state.toggleMessages
                        ?
                        <Messages
                            channel
                            activeGroup={this.state.activeGroup}
                            messages={this.state.messages}
                            currentUser={this.state.currentUser}
                            getAllMessagesByGroupId={this.getAllMessagesByGroupId}
                        />
                        : null
                }
            </div>
        )
    }
}


//display the available groups