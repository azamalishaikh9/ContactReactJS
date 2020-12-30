import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faList } from '@fortawesome/free-solid-svg-icons';
export default class Navigation extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Link to="" className="navbar-brand">Ali</Link>
                <Nav className="mr-auto">
                    <Link to="addcontact" className="nav-link"><FontAwesomeIcon icon={faAddressBook} /> Add Contact</Link>
                    <Link to="contactlist" className="nav-link"><FontAwesomeIcon icon={faList} /> Contact List</Link>
                </Nav>
            </Navbar>
        )
    }
}

