"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faSyncAlt,
  faFilter,
  faChevronDown,
  faSearch,
  faMagnifyingGlass,
  faBell,
  faUserCircle,
  faBars,
  faChevronLeft,
  faChevronRight,
  faChartSimple,
  faPenToSquare,
  faComment,
  faFolderPlus,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Image,
  Button,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Table,
  Pagination,
} from "react-bootstrap";
import logo from "../../public/img/LogoPage.jpg";
import "./index.css";
import Header from "./component/Header/header";
import Sidebar from "./component/Sidebar/sidebar";
import Article from "./component/Article/article";

const Admin: React.FC = () => {
  return (
    <Container
      fluid
      style={{
        backgroundColor: "#f0f0f0",
        minHeight: "100%",
        overflow: "auto",
      }}
    >
      <Row>
        <Header />
      </Row>

      <Row>
        <Sidebar />
        <Article />
      </Row>
    </Container>
  );
};

export default Admin;
