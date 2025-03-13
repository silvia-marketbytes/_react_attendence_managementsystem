// src/components/layout/Header.jsx
import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-4 py-4">
      <Container
        fluid
        className="d-flex align-items-center justify-content-end mx-4"
      >
        <FontAwesomeIcon
          icon={faRightFromBracket}
          className="text-white text-lg"
        />
      </Container>
    </Navbar>
  );
};

export default Header;
