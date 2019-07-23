import React, { Component } from 'react'
import axios from 'axios'

export default class SignUp extends Component {

    state = {
        user: {
            name: 'amoo',
            password: 'newStuff'
        },
        showSignUp: true
    }

    componentDidMount() {
        this.updateLocalStorageWithUserInfo()
    }

    //create a user 
    createUserInfo = (userObject) => {
        axios.post('/api/users', userObject)
            .then(res => {
                this.setState({user: res.data})
            })
    }

    //hid or show the sign up page
    toggleShowSignUp = (event) => {
        this.setState((state,) => {
            this.setState({showSignUp: !state.showSignUp})
        })
    }

    //get user from db and set user
    getUserInfo = (userId) => {
        axios.get(`/api/users/${userId}`)
            .then(res => {
                this.setState({user: res.data})
            })
    }

    //upload or replace user information to localStorage
    updateLocalStorageWithUserInfo = () => {
        let userJSONOBject = JSON.stringify(this.state.user)
        localStorage.setItem("userInfo",userJSONOBject)
    }

    render() {
        return (
            <h1>Hello</h1>
        )
    }
}
