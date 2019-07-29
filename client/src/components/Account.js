import React, { Component } from 'react'
import './Account.css'
import axios from 'axios';
import { Redirect } from 'react-router-dom'

export default class Account extends Component {

    state = {
        showEditForm: false,
        user: {},
        redirectToHomePage: false
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
        if (this.name.value !== '') {
            axios.put(`/api/users/${this.state.user._id}`, {
                name: this.name.value,
                password: this.password.value
            })
                .then(res => {
                    this.updateLocalStorageWithUserInfo(res.data)
                    this.setState({ showEditForm: false })
                })
        }
    }

    //Delete an account from DB and local storage
    deleteAccount = (event) => {
        event.preventDefault()
        axios.delete(`/api/users/${this.state.user._id}`)
            .then(() => {
                localStorage.removeItem("userInfo")
                this.redirectToHomePageToggle()
            })
    }

    //Method to toggle redirect
    redirectToHomePageToggle = () => {
        this.setState(state => {
            return { redirectToHomePage: !state.redirectToHomePage }
        })
    }

    render() {


        //destructure state
        let { showEditForm, redirectToHomePage, user } = this.state


        return (

            <div className='jumbotron accountPage row justify-content-center align-items-center'>
                {/* <h1 className='display-2 col-12 mb-4'>Account Page</h1> */}
                {
                    showEditForm
                        ?
                        <form className='accountForm mt-4 col-xs-12 col-md-6'>
                            <h1 className='display-2 '>Account Page</h1>
                            <div className='row'>
                                <label className='col-md-2' htmlFor='nameInput'>Name</label>
                                <input ref={a => this.name = a} className='col-md-8 input form-control' id='nameInput' />
                            </div>
                            <div className='row'>
                                <label className='col-md-2' htmlFor='new-password'>Password</label>
                                <input ref={a => this.password = a} className='col-md-8 input form-control mt-1' id='new-password' />
                            </div>
                            <div className='buttonContainer mt-4'>
                                <button onClick={(event) => this.updateUserInformationInDatabase(event)} className='btn '> Submit</button>
                                <button onClick={(event) => this.toggleEditForm(event)} className='btn ml-4'> Cancel</button>
                            </div>
                        </form>
                        :
                        <form className='accountForm mt-4 col-xs-12 col-md-6'>
                            <h1 className='display-2 '>Account Page</h1>
                            <div className='row justify-content-center'>
                                <label className='col-xs-2  col-md-4  ' htmlFor='nameInput'>Name</label>
                                <p className='col-xs-3 lead col-md-4' id='nameInput'>{user.name}</p>
                            </div>
                            <div className='row justify-content-center'>
                                <label className='col-xs-2 col-md-4 ' htmlFor='new-password'>Password</label>
                                <p className='col-xs-3 col-md-4 lead mt-1' id='new-password'>*******</p>
                            </div>
                            <div className='buttonContainer mt-4'>
                                <button className='btn' onClick={(event) => this.toggleEditForm(event)}> Edit</button>
                                <button className='btn ml-4' onClick={(event) => this.deleteAccount(event)}> Delete</button>
                            </div>
                        </form>

                }
                {
                    redirectToHomePage
                        ?
                        <Redirect to='/' />
                        :
                        null
                }
            </div>
        )
    }
}
