import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Channel.css'

export default class Channel extends Component {
    render() {
        return (
            <div className='ChannelLink' >
                <Link to={`/channels/${this.props.channelId}`}>
                    <hr className="my-2" />
                    <h2>{this.props.name}</h2>
                    <p className="lead">Description: {this.props.description}</p>
                </Link>
            </div>
        )
    }
}
