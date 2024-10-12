"use client";

import React from "react";
import { Navbar, Form, FormControl, InputGroup, Button, Row, Col, ButtonGroup } from "react-bootstrap";
import h from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <>
      <Navbar bg="white" expand="lg" className={`${h.nav} d-flex justify-content-between align-items-center`}>
        <Navbar.Brand href="#">
          <img
            src="/img/logoPage.jpg"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Form className={` ${h.formGroup} mx-auto`}>

          <input type="text"
            placeholder="Tìm kiếm"
            aria-label="Search"
            className={h.searchInput} />

          <Button className={h.btnSearch}> <img src="/img/searchBlue.svg" alt="Search" /></Button>

        </Form>
        <ButtonGroup className={`${h.CTA}`}>
          <Button variant="link" className={h.iconButton}>
            <img src="/img/Bell.svg" alt="Notifications" />
          </Button>

          <Button variant="link" className={h.iconButton}>
            <img src="/img/user.svg" alt="User" />
          </Button>
          <Button variant="link" className={h.iconButton}>
            <img src="/img/list.svg" alt="Menu" />
          </Button>
        </ButtonGroup>
      </Navbar >
    </>
  );
};

export default Header;
