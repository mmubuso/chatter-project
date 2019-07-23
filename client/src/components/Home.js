import React, { Component } from 'react'
import axios from 'axios'
import SignUp from './SignUp.js'
import './Home.css'

export default class Home extends Component {

    state = {
        user: {
            name: 'amoo',
            password: 'newStuff'
        },
        showSignUp: false
    }

    //methods are ran when the component runs
    componentDidMount() {
        this.updateLocalStorageWithUserInfo()
    }

    //create a user 
    createUserInfo = (userObject) => {
        axios.post('/api/users', userObject)
            .then(res => {
                this.setState({ user: res.data })
            })
    }

    //hid or show the sign up page
    toggleShowSignUp = (event) => {
        this.setState((state, ) => {
            this.setState({ showSignUp: !state.showSignUp })
        })
    }

    //get user from db and set user
    getUserInfo = (userId) => {
        axios.get(`/api/users/${userId}`)
            .then(res => {
                this.setState({ user: res.data })
            })
    }

    //upload or replace user information to localStorage
    updateLocalStorageWithUserInfo = () => {
        let userJSONOBject = JSON.stringify(this.state.user)
        localStorage.setItem("userInfo", userJSONOBject)
    }

    render() {
        let { showSignUp, user } = this.state
        return (

            <div className='row HomeContainer justify-content-center align-items-center' >
                {
                    showSignUp
                        ?
                        <h1>Welcome to Chatter</h1>
                        :
                        <SignUp createUser={this.createUserInfo} />
                }
            </div>
        )
    }
}
