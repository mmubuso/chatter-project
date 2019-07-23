import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import {
    Navbar,
    Nav,
    NavItem,
} from 'reactstrap';
import './NavBar.css';

export default class NavBar extends Component {

    render() {

        return (

            <div>
                <Navbar color="dark" light expand="md">
                    <Link
                        to='/'
                        className='LinkTags '>
                        Chatter
                    </Link>
                    <Link
                        className='ml-4'
                        to='/channels'>Channels
                    </Link>
                    <Nav
                        className="ml-auto"
                        navbar>
                        <NavItem>
                            <Link
                                to="/accounts">Account
                            </Link>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div >
        )
    }
}
