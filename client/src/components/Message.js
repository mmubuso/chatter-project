import React, { Component } from 'react';
import { Button } from 'reactstrap';


export default class Message extends Component {

    state = {
        canEditMessage: false,
        newMessage: {
            user: this.props.user,
            message: this.props.message
        }
    }

    //Allow user to edit message
    toggleEditMode = () => {
        this.setState((state) => {
            return ({ canEditMessage: !state.canEditMessage })
        })
    }

    //Handle any changes to messages
    handleOnChangeFromInputForm = (event) => {
        let messageObject = { ...this.state.newMessage }
        messageObject.message = event.target.value
        this.setState({ newMessage: messageObject })
    }

    handleMessageUpdate = () => {
        console.log('test 1')
        this.props.editMessage(this.props.id, this.state.newMessage)
        this.toggleEditMode()
    }

    
    render() {

        //destructure props
        let { user, deleteMessage , id} = this.props

        return (
            <div className="row">
                <div className="col-md-4">{user}</div>
                <div className="col-md-8">

                    {
                        //Show input or text tag
                        this.state.canEditMessage
                            ?
                            <div>
                                <input
                                    type='text'
                                    value={this.state.newMessage.message}
                                    onChange={this.handleOnChangeFromInputForm}
                                />
                                <input
                                    type='submit'
                                    //Update or edit message
                                    onClick={this.handleMessageUpdate}
                                    className='btn-success'
                                    value='Submit'
                                />
                            </div>
                            :
                            <div>
                                <p>{this.state.newMessage.message}</p>
                                <input
                                    type='submit'
                                    //Update or edit message
                                    onClick={this.toggleEditMode}
                                    className='btn-success'
                                    value='Edit'
                                />
                            </div>
                    }

                    <input
                        type='submit'
                        color="danger"
                        onClick={() => deleteMessage(id)}
                        value='Delete'
                    />
                </div>
            </div>
        )
    }
}
