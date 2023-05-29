import React, { useState } from "react";
import { Container, Form, Navbar, Nav, Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/backgroundColor.css";
import "../../styles/navbar.css";

function NavigationBar() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!search) return;

    navigate(`/search?q=${search}`);
    setSearch("");
  };
  return (
    <>
      {["xl"].map((expand) => (
        <Navbar key={expand} expand={expand} className="mb-3 bg-sc p-2">
          <Container fluid>
            <Navbar.Brand as={Link} to={"/"} className="text-white">
              Navbar Offcanvas
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas id={`offcanvasNavbar-expand-${expand}`} aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`} placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>Offcanvas</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Form className="d-flex" onSubmit={handleSearch}>
                  <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" onChange={(e) => setSearch(e.target.value)} value={search} />
                </Form>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link as={Link} to={"/popular"} className="text-white nav-link">
                    Popular Movies
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/top-rated"} className="text-white nav-link">
                    Top Rated
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/now-playing"} className="text-white nav-link">
                    NowPlaying
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/up-coming"} className="text-white nav-link">
                    Up Coming
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavigationBar;
