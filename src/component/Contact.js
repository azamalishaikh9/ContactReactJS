import React, { Component } from 'react'
import { Card, Form, Button, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faEdit, faList, faSave, faUndo } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import MyToast from './MyToast';

export default class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
    }

    initialState = { contactId: '', firstName: '', lastName: '', phone: '', email: '', address: '', vehicleNo: '', company: '', department: '' };

    componentDidMount(){
        const contId = +this.props.match.params.contactId;
        if(contId){
            this.findContactById(contId);
        }
    }

    findContactById = (contId) => {
        Axios.get("http://localhost:8093/"+contId)
            .then(response => {
                if(response.data != null){
                    this.setState({
                        contactId:response.data.contactId,
                        firstName:response.data.firstName,
                        lastName:response.data.lastName,
                        phone:response.data.phone,
                        email:response.data.email,
                        address:response.data.address,
                        vehicleNo:response.data.vehicleNo,
                        company:response.data.company,
                        department:response.data.department,
                    })
                }
            }).catch((error) =>{
                console.error("Error : - " +error);
            });
    }

    submitContact = (event) => {
        event.preventDefault();
        const contact = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phone: this.state.phone,
            email: this.state.email,
            address: this.state.address,
            vehicleNo: this.state.vehicleNo,
            company: this.state.company,
            department: this.state.department,
        };

        Axios.post("http://localhost:8093/saveContact", contact)
            .then(response => {
                if (response.data != null) {
                    this.setState({ "show": true });
                    setTimeout(() => this.setState({ "show": false }), 3000);
                } else {
                    this.setState({ "show": false });
                }
            });
        this.setState(this.initialState);
    };

    updateContact = (event) => {
        event.preventDefault();
        const contact = {
            contactId:this.state.contactId,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phone: this.state.phone,
            email: this.state.email,
            address: this.state.address,
            vehicleNo: this.state.vehicleNo,
            company: this.state.company,
            department: this.state.department,
        };

        Axios.put(this.findContactById, contact)
            .then(response => {
                if (response.data != null) {
                    this.setState({ "show": true });
                    setTimeout(() => this.setState({ "show": false }), 3000);
                    setTimeout(() => this.contactList, 2000);
                } else {
                    this.setState({ "show": false });
                }
            });
        this.setState(this.initialState);

    };

    contactChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    contactList = () => {
        return this.props.history.push("/contactlist");
    };

    resetContact = () => {
        this.setState(() => this.initialState);
    };


    render() {

        const { firstName, lastName, phone, email, address, vehicleNo, department, company } = this.state;

        return (
            <div>
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <MyToast show={this.state.show} message={"Contact Saved Successfully."} type={"success"} />
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Form onReset={this.resetContact} onSubmit={this.state.id ? this.updateContact : this.submitContact} id="contactFormId">
                        <Card.Header><FontAwesomeIcon icon={this.state.contactId ? faEdit : faAddressBook} /> {this.state.contactId ? "Update Contact" : "Add New Contact"}</Card.Header>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" name="firstName" value={firstName} onChange={this.contactChange} required className={"bg-dark text-white"} placeholder="Enter First Name"></Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" name="lastName" value={lastName} onChange={this.contactChange} required className={"bg-dark text-white"} placeholder="Enter Last Name"></Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPhone">
                                    <Form.Label>Phone No.</Form.Label>
                                    <Form.Control type="number" name="phone" value={phone} onChange={this.contactChange} required className={"bg-dark text-white"} placeholder="Enter Phone No."></Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control type="email" name="email" value={email} onChange={this.contactChange} required className={"bg-dark text-white"} placeholder="Enter E-mail"></Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridAddress">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text" name="address" value={address} onChange={this.contactChange} required className={"bg-dark text-white"} placeholder="Enter Address"></Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridVehicleNo">
                                    <Form.Label>Vehicle No.</Form.Label>
                                    <Form.Control type="text" name="vehicleNo" value={vehicleNo} onChange={this.contactChange} required className={"bg-dark text-white"} placeholder="Enter Vehicle No."></Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCompany">
                                    <Form.Label>Company</Form.Label>
                                    <Form.Control type="text" name="company" value={company} onChange={this.contactChange} required className={"bg-dark text-white"} placeholder="Enter Company Name"></Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridDepartment">
                                    <Form.Label>Department</Form.Label>
                                    <Form.Control type="text" name="department" value={department} onChange={this.contactChange} required className={"bg-dark text-white"} placeholder="Enter Department Name"></Form.Control>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{ "textAlign": "right" }}>
                            <Button size="sm" variant="success" type="submit"><FontAwesomeIcon icon={faSave} /> {this.state.contactId ? "Update" : "Save"}</Button>&nbsp;
                            <Button size="sm" variant="secondary" type="reset"><FontAwesomeIcon icon={faUndo} /> Reset</Button>&nbsp;
                            <Button size="sm" variant="secondary" type="reset" onClick={this.contactList}><FontAwesomeIcon icon={faList} /> Contact List</Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}
