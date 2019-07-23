import React, { Component } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

export default class SignUp extends Component {
    render() {
        return (
            <Form
                className='container mt-4'
                >
                <FormGroup className="mb-2 mr-sm-2 mt-lg-4">
                    <Label for="name" className="mr-sm-2">Name</Label>
                    <Input type="name" name="name" id="name" placeholder="Name " />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="password" className="mr-sm-2">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="Top secret" />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        )
    }
}
