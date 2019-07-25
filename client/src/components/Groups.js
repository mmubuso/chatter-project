import React, { Component } from 'react'

export default class Groups extends Component {
    render() {

        //create list of items in array
        let listOfGroups = this.props.groups.map(group => {
            return (    
                <div key={group._id}>
                    <h2 onClick={() => this.props.setActiveGroup(group)}>{group.name}</h2>
                    <p>{group.description}</p>
                </div>
            )
        })
        return (
            <div className='col-md-4'>
                <h1>Hello Groups</h1>
                {listOfGroups}
            </div>
        )
    }
}
