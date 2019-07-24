import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Channel extends Component {
    render() {
        return (
            <div>
                <hr className="my-2" />
                <Link to={`/channels/${this.props.channelId}`}><h2>{this.props.name}</h2></Link>
                <p className="lead">Description: {this.props.description}</p>
            </div>
        )
    }
}
