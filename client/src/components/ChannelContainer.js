import React, { Component } from 'react'
import axios from 'axios'
import { Jumbotron } from 'reactstrap'
import Channel from './Channel';
import './Channel.css'

export default class ChannelContainer extends Component {

    state = {
        channels: []
    }

    componentDidMount() {
        this.getChannels()
    }

    getChannels = () => {
        axios.get('/api/channels')
            .then(res => {
                let channelData = res.data
                this.setState({ channels: channelData })
            })
    }

    render() {

        let channelList = this.state.channels.map(channel => {
            return (
                <Channel
                    key={channel._id}
                    channelId={channel._id}
                    name={channel.name}
                    description={channel.description}
                />
            )
        })


        return (
            <div>

                <Jumbotron id='channelsContainer' className='container mt-4'>
                    <h1
                        className="jumbo-h1 display-3">Channels
                    </h1>
                    {channelList}
                </Jumbotron>
            </div>
        )
    }
}
