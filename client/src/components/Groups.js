import React, { Component } from 'react'
import './Group.css'

export default class Groups extends Component {
    render() {

        //create list of items in array
        let listOfGroups = this.props.groups.map(group => {
            return (    
                <div className='groupItem' key={group._id}>
                    <h2 onClick={() => this.props.setActiveGroup(group)}>{group.name}</h2>
                    <p>{group.description}</p>
                </div>
            )
        })
        return (
            <div className='group col-md-3'>
                <h1>Group Chats</h1>
                {listOfGroups}
            </div>
        )
    }
}
