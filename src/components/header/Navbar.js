import React from 'react';
import { Link } from 'react-router-dom';
import sagiri from '../../SagiriLogo.svg';
import {
  Collapse,
  Navbar as BootstrapNavbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem } from 'reactstrap';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <BootstrapNavbar dark color={this.state.isOpen ? 'dark' : ''} fixed="top" expand="lg">
          <NavbarBrand href="/">
            <img alt="Sagiri" width="130px" style={{marginTop: "-13px"}} src={sagiri}/>
          </NavbarBrand>
          <NavbarToggler
            onClick={this.toggle}
            className={this.state.isOpen ? 'navbar-icon-close' : ''}
          />

          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/commands">Commands</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/donate">Donate</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/community">Community</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </BootstrapNavbar>
      </div>
    );
  }
}