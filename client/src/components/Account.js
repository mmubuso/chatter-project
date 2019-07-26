import React, { Component } from 'react'
import './Account.css'
import { get } from 'http';
import axios from 'axios';

export default class Account extends Component {

    state = {
        showEditForm: false,
        user: {},
    }

    componentDidMount() {
        this.updateStateWithLocalStorageInfo()
    }

    //toggle edit form
    toggleEditForm = (event) => {
        event.preventDefault()
        this.setState(state => {
            return { showEditForm: !state.showEditForm }
        })
    }

    //upload user information to localStorage
    updateLocalStorageWithUserInfo = (userOBject) => {
        userOBject = JSON.stringify(userOBject)
        localStorage.setItem("userInfo", userOBject)
    }

    //update state with information from localStorage
    updateStateWithLocalStorageInfo = () => {
        let newUserObject = JSON.parse(localStorage.getItem("userInfo"))
        this.setState({ user: newUserObject })
    }

    //Update db with new information
    updateUserInformationInDatabase = (event) => {
        event.preventDefault()
        axios.put(`/api/users/${this.state.user._id}`,{
            name: this.name.value,
            password: this.password.value
        })
        .then(res => {
            console.log('res')
            this.updateLocalStorageWithUserInfo(res.data)
            this.setState({showEditForm: false})
        })
    }

    render() {


        //destructure state
        let { showEditForm, dataBaseUser, user } = this.state


        return (

            <div className='jumbotron accountPage row justify-content-center align-items-center'>
                <h1 className='display-2 col-12 mb-4'>Account Page</h1>
                {
                    showEditForm
                        ?
                        <form className='accountForm mt-4 col-xs-12 col-md-6'>
                            <div className='row'>
                                <label className='col-md-4' htmlFor='nameInput'>Name</label>
                                <input ref={a => this.name = a}className='col-md-8 input form-control' id='nameInput' />
                            </div>
                            <div className='row'>
                                <label className='col-md-4' htmlFor='new-password'>Password</label>
                                <input ref={a => this.password = a}className='col-md-8 input form-control mt-1' id='new-password' />
                            </div>
                            <div className=' mt-4'>
                                <button onClick={event => this.updateUserInformationInDatabase(event)}className='btn btn-success'> Submit</button>
                                <button onClick={(event) => this.toggleEditForm(event)} className='btn btn-danger ml-4'> Cancel</button>
                            </div>
                        </form>
                        :
                        <form className='accountForm mt-4 col-xs-12 col-md-6'>
                            <div className='row justify-content-center'>
                                <label className='col-xs-2  col-md-4  ' htmlFor='nameInput'>Name</label>
                                <p className='col-xs-3 lead col-md-4' id='nameInput'></p>
                            </div>
                            <div className='row justify-content-center'>
                                <label className='col-xs-2 col-md-4 ' htmlFor='new-password'>Password</label>
                                <p className='col-xs-3 col-md-4 lead mt-1' id='new-password'>*******</p>
                            </div>
                            <div className=' mt-4'>
                                <button className='btn btn-success' onClick={(event) => this.toggleEditForm(event)}> Edit</button>
                                <button className='btn btn-danger ml-4'> Delete</button>
                            </div>
                        </form>
                }




            </div>
        )
    }
}
