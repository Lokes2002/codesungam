import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Dropdown, Image } from 'react-bootstrap';
import avatar from './img1.jpg'; // Adjust path as needed

function CustomNavbar() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">Campus Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                    <Nav.Link as={Link} to="/events">Events</Nav.Link>
                    <Nav.Link as={Link} to="/attendance">Classes</Nav.Link>
                    <Nav.Link as={Link} to="/notification">Notification</Nav.Link>
                </Nav>
                
                <Dropdown align="end">
                    <Dropdown.Toggle as={Image}
                        src={avatar}
                        roundedCircle
                        width={40} 
                        height={40} 
                        className="me-2"
                    />
                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => alert('Logging out...')}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default CustomNavbar;
