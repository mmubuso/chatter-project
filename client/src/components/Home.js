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
        this.checkIfUserIsLoggedIn()
    }

    //create a user 
    createUserInfo = (userObject) => {
        this.updateLocalStorageWithUserInfo(userObject)
        axios.post('/api/users', userObject)
            .then(res => {
                this.setState({ user: res.data })
            })
    }

    //check if user has account
    checkIfUserIsLoggedIn = () => {
        if (JSON.parse(localStorage.getItem("userInfo")) !== null) {
            this.updateStateWithLocalStorageInfo()
            this.toggleShowSignUp()
        }
    }



    //hid or show the sign up page
    toggleShowSignUp = () => {
        this.setState((state) => {
            return { showSignUp: !state.showSignUp }
        })
    }

    //get user from db and set user
    getUserInfo = (userId) => {
        axios.get(`/api/users/${userId}`)
            .then(res => {
                this.updateLocalStorageWithUserInfo(res.data)
                this.setState({ user: res.data })
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

    render() {
        let { showSignUp, user } = this.state
        return (

            <div className='row HomeContainer justify-content-center align-items-center' >
                {
                    showSignUp
                        ?
                        <h1
                            className="col-md-8">
                            Welcome to Chatter, {user.name}
                        </h1>
                        :
                        <SignUp
                            createUser={this.createUserInfo}
                            removeSignUp={this.toggleShowSignUp} />
                }
            </div>
        )
    }
}
