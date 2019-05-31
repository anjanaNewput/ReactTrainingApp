import React from "react";
import ls from "localstorage-ttl";
import Navbar from "react-bootstrap/lib/Navbar";
import Nav from "react-bootstrap/lib/Nav";
import NavItem from "react-bootstrap/lib/NavItem";
import NavDropdown from "react-bootstrap/lib/NavDropdown";
import MenuItem from "react-bootstrap/lib/MenuItem";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Image from "react-bootstrap/lib/Image";

import logo from "../public/assets/images/newput-logo.png";

export const Header = ((props) => {
  return (
    <Navbar collapseOnSelect fluid fixedTop id="header">
        <Navbar.Header>
            <Navbar.Brand>
                <Image src="http://www.newput.com/wp/wp-content/uploads/2016/01/newput-logo.png" alt="logo" width="150px" height="60px" onClick={() => props.getHomePath()}/>
            </Navbar.Brand>
            <div className="navbar-title-text">Newput Training Program</div>
            <Navbar.Toggle />
        </Navbar.Header>
        { ls.get("isUserLoggedIn") ? <Navbar.Collapse>
            <Nav pullRight>
                <NavItem eventKey={1}>
                  {props.user}
                </NavItem>
                <NavDropdown eventKey={2} title={<Glyphicon glyph="cog"/>} id="basic-nav-dropdown">
                    <MenuItem eventKey={2.1} onClick={() => props.logout()}>Logout &nbsp;&nbsp;<Glyphicon glyph="off"/></MenuItem>
                </NavDropdown>
            </Nav>
        </Navbar.Collapse> : ""}
    </Navbar>
  );
});
