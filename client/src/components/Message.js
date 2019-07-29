import React, { Component } from 'react';
import './Message.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

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

    //Handle message updates
    handleMessageUpdate = () => {
        this.props.editMessage(this.props.id, this.state.newMessage)
        this.toggleEditMode()
    }


    render() {

        //destructure props
        let { user, deleteMessage, id } = this.props

        return (
            <div className="MessageBody row justify-content-center">
                <div className="descriptionMessage col-md-11">

                    {
                        //Show input or text tag
                        this.state.canEditMessage
                            ?
                            <div className='row'>
                                <input
                                    className='col-md-10 messageEditField'
                                    type='text'
                                    value={this.state.newMessage.message}
                                    onChange={this.handleOnChangeFromInputForm}
                                />
                                <div className='col-md-2 buttonsFA'>
                                    <FontAwesomeIcon icon={faCheckCircle}
                                        //Update or edit message
                                        onClick={this.handleMessageUpdate}
                                        className='MsgBtn faCheckCircleButton'
                                    />
                                    <FontAwesomeIcon icon={faTrashAlt}
                                        className='MsgBtn faTrashAltButton'
                                        onClick={() => deleteMessage(id)}
                                    />
                                </div>
                            </div>
                            :
                            <div className='row'>
                                <p className='col-md-10 messageText'>{user} : {this.state.newMessage.message}</p>
                                <div className='col-md-2 buttonsFA'>
                                    <FontAwesomeIcon icon={faEdit}
                                        //Update or edit message
                                        onClick={this.toggleEditMode}
                                        className='MsgBtn faEditButton'

                                    />
                                    <FontAwesomeIcon icon={faTrashAlt}
                                        className='MsgBtn faTrashAltButton'
                                        onClick={() => deleteMessage(id)}
                                    />
                                </div>
                            </div>
                    }


                </div>
            </div>
        )
    }
}
