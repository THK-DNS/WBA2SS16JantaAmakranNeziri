var React = require('react');
var ReactDOM = require('react-dom');
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var NavDropdown = require('react-bootstrap').NavDropdown;
var MenuItem = require('react-bootstrap').MenuItem;
var Button = require('react-bootstrap').Button;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;


var Userbar = React.createClass({
	render: function() {
		return (
			<Navbar>
		    <Navbar.Header>
		      <Navbar.Brand>
		        <a href="#">Accoeval</a>
		      </Navbar.Brand>
		    </Navbar.Header>
		    <Nav>
		      <NavItem eventKey={1} href="#">Accomodations</NavItem>
		      <NavItem eventKey={2} href="#">Users</NavItem>
		    </Nav>
		    <ButtonToolbar>
		    <Button onClick={this.props.onSignUpClick} bsStyle="success">Sign Up</Button>
		    <Button onClick={this.props.onSignInClick} >Sign In</Button>
		    </ButtonToolbar>
		  </Navbar>
			);
	},
	getInitialState: function() {
		return { };
	},
	componentDidMount: function() {

  	}
});

module.exports.Userbar = Userbar;