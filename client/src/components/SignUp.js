import React, { Component } from 'react';
import {
    Col,
    Button,
    Form,
    FormGroup,
    Label,
} from 'reactstrap';

export default class SignUp extends Component {
    //Create the object and call the axios post request to create it
    //  in the database
    createObject = (event) => {
        event.preventDefault()
        console.log(this.name)
        this.props.createUser({
            name: this.name.value,
            password: this.password.value
        })
    }

    render() {
        return (

            <Form
                className='col-md-8 col-xs-12'>
                <h1 className='display-4'>Create An Account</h1>
                <FormGroup className="row mb-2 mr-sm-0 mt-sm-0 row" >
                    <Col xs={3} lg={2} >
                        <Label for="new-name" className="col-xs- mr-sm-0">Name</Label>
                    </Col>
                    <Col xs={9} lg={10}>
                        <input
                            ref={nameInputElement =>
                                this.name = nameInputElement
                            }
                            className='input form-control'
                            type="name"
                            name="name"
                            id="new-name"
                            placeholder="Name "
                             />
                    </Col>
                </FormGroup>
                <FormGroup row className="mb-2 mr-sm-0 mb-sm-0 row">
                    <Col xs={3} lg={2}>
                        <Label for="new-password" className="mr-sm-0">Password</Label>
                    </Col>
                    <Col xs={9} lg={10}>
                        <input
                            ref={passwordInputelement =>
                                this.password = passwordInputelement
                            }
                            className='input form-control'
                            type="password"
                            name="password"
                            id="new-password"
                            placeholder="Top secret"
                            required />
                    </Col>
                </FormGroup>
                <Button onClick={this.createObject} className="mt-4">Submit</Button>
            </Form>

        )
    }
}
