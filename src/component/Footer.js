import React, { Component } from 'react'
import { Navbar, Container, Col } from 'react-bootstrap'

export default class Footer extends Component {
    render() {
        let fullYear = new Date().getFullYear();
        return (
            <Navbar fixed="bottom" bg="dark" variant="dark">
                <Container lg={12} className="text-center text-muted">
                    <Col lg={12} className="text-center text-muted">
        <div>{fullYear}-{fullYear+1}, All Copyrights Reserved By Ali</div>
                    </Col>
                </Container>
            </Navbar>
        )
    }
}
