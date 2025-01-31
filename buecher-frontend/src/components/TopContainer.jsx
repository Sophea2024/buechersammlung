import React from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function TopContainer() {
    const navigate = useNavigate();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        {/* <Navbar.Brand href="#">Navbar Bücher</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="navbarBuecher" />
        <Navbar.Collapse id="navbarBuecher">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1" className="nav-link-custom">Home</Nav.Link>
            <Nav.Link href="#action2" className="nav-link-custom about">About</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Book Title"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>            
            <Button variant="primary" className="ms-2" onClick={() => navigate("/add-book")}>Buch hinzufügen</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopContainer;