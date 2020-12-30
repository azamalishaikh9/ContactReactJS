import React, { Component } from 'react';
import { Card, Table, ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import MyToast from './MyToast';
import { Link } from 'react-router-dom';

export default class ContactList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            contact: [],
            show: false
        }

    }

    componentDidMount() {
        this.findAllBooks();
    }

    findAllBooks() {
        Axios.get("http://localhost:8093/getAllContact")
            .then(response => response.data) //fetch response into data 
            .then((data) => {
                this.setState({ contact: data }) //map data into contact array
            });
    };

    deleteContact = (contactId) => {
        Axios.delete("http://localhost:8093/" + contactId)
            .then(response => {
                if (response.data != null) {
                    this.setState({ show: "true" });
                    setTimeout(() => this.setState({ show: "false" }), 3000);
                    this.setState({ contact: this.state.contact.filter(contact => contact.contactId !== contactId) });
                }
                else {
                    this.setState({ show: "false" });
                }
            });
    };



    render() {
        return (
            <div>
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <MyToast show={this.state.show} message={"Contact Deleted Successfully."} type={"danger"} />
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={faList} /> Contact List</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Vehicle No.</th>
                                    <th>Company</th>
                                    <th>Department</th>
                                    <th>Image</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.contact.length === 0 ?
                                        <tr align="center">
                                            <td colSpan="12">No Contacts Available</td>
                                        </tr>
                                        :
                                        this.state.contact.map((contact, index) => (
                                            <tr key={index}>
                                                <td>{contact.contactId}</td>
                                                <td>{contact.firstName}</td>
                                                <td>{contact.lastName}</td>
                                                <td>{contact.phone}</td>
                                                <td>{contact.email}</td>
                                                <td>{contact.address}</td>
                                                <td>{contact.vehicleNo}</td>
                                                <td>{contact.company}</td>
                                                <td>{contact.department}</td>
                                                <td>{contact.contactImage}</td>
                                                <td>{contact.contactStatus}</td>
                                                <td>
                                                    <ButtonGroup>
                                                        <Link to={`edit/${contact.contactId}`} className="btn btn-sm btn-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                                        <Button size="sm" variant="danger" onClick={this.deleteContact(contact.contactId)}><FontAwesomeIcon icon={faTrash} /></Button>
                                                    </ButtonGroup>
                                                </td>
                                            </tr>
                                        ))
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
