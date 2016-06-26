var React = require('react');
var ReactDOM = require('react-dom');
var Image = require('react-bootstrap').Image;
var Thumbnail = require('react-bootstrap').Thumbnail;
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;
var Button = require('react-bootstrap').Button;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var ButtonGroup = require('react-bootstrap').ButtonGroup;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Modal = require('react-bootstrap').Modal;
var FormGroup = require('react-bootstrap').FormGroup;
var FormControl = require('react-bootstrap').FormControl;
var ControlLabel = require('react-bootstrap').ControlLabel;
var Alert = require('react-bootstrap').Alert;

// Components
var UserList = require('./components/users.js').UserList;
var AccommodationList = require('./components/accommodations.js').AccommodationList;
var EvaluationList = require('./components/evaluations.js').EvaluationList;
var Userbar = require('./components/userbar.js').Userbar;


var Root = React.createClass({
	render: function() {
		return (<div>
				{this.renderSignUpModal()}
				{this.renderSignInModal()}
				<Userbar user={this.state.user} onSignOffClick={this.onSignOff} onSignUpClick={this.showSignUpModal} onSignInClick={this.showSignInModal} />
				<AccommodationList user={this.state.user} source="https://accoeval.herokuapp.com/api/accommodations" />
				<UserList user={this.state.user} source="https://accoeval.herokuapp.com/api/users" />
				<EvaluationList user={this.state.user} source="https://accoeval.herokuapp.com/api/evaluations" />
			</div>
		);
	},
	getInitialState: function() {
		return {
			showRegisterModal: false,
			showSignUpModal: false,
			showSignInModal: false,
			nosignin: false,
			nopassrepeat: false,
			user: undefined
		};
	},
	componentDidMount: function() {

  	},
  	componentWillMount: function() {

  	},
  	renderSignInModal: function() {
  			var usernameOrPassword;

  			if(this.state.nosignin === true) {
  				usernameOrPassword = <Alert bsStyle="danger">
								    Username or password incorrect.
								  </Alert>
  			} else {
  				usernameOrPassword = '';
  			}

  			return <Modal show={this.state.showSignInModal} onHide={this.onHideSignInModal}>
				      <Modal.Header>
				        <Modal.Title>Sign In</Modal.Title>
				      </Modal.Header>

				      <Modal.Body>
				      {usernameOrPassword}
					      <form>
						    <FormGroup controlId="username">
						      <ControlLabel>Username</ControlLabel>
						      <FormControl type="text" placeholder="Enter username" />
						    </FormGroup>
						   <FormGroup controlId="password">
						      <ControlLabel>Password</ControlLabel>
						      <FormControl type="password" />
						    </FormGroup>
						    </form>
				      </Modal.Body>

				      <Modal.Footer>
				        <Button onClick={this.onHideSignInModal}>Cancel</Button>
				        <Button onClick={this.handleSignInButton} bsStyle="primary">Sign In</Button>
				      </Modal.Footer>

				    </Modal>;
  	},
  	showSignInModal() {
  		this.setState({
  			showSignInModal: true,
  			nosignin: false
  		});
  	},
  	onHideSignInModal() {
  		this.setState({
  			showSignInModal: false,
  			nosignin: false
  		});
  	},
  	renderSignUpModal: function() {
  			var passRepeatError;

  			if(this.state.nopassrepeat === true) {
  				passRepeatError = <Alert bsStyle="danger">
								    Password does not match.
								  </Alert>
  			} else {
  				passRepeatError = '';
  			}

  			return <Modal show={this.state.showSignUpModal} onHide={this.onHideSignUpModal}>
				      <Modal.Header>
				        <Modal.Title>Sign Up</Modal.Title>
				      </Modal.Header>

				      <Modal.Body>
				      {passRepeatError}
					      <form>
						    <FormGroup controlId="username">
						      <ControlLabel>Username</ControlLabel>
						      <FormControl type="text" placeholder="Enter username" />
						    </FormGroup>
						   <FormGroup controlId="password">
						      <ControlLabel>Password</ControlLabel>
						      <FormControl type="password" />
						    </FormGroup>
						    <FormGroup controlId="repeatPassword">
						      <ControlLabel>Repeat Password</ControlLabel>
						      <FormControl type="password" />
						    </FormGroup>
						    </form>
				      </Modal.Body>

				      <Modal.Footer>
				        <Button onClick={this.onHideSignUpModal}>Cancel</Button>
				        <Button onClick={this.handleSignUpButton} bsStyle="primary">Submit</Button>
				      </Modal.Footer>

				    </Modal>;
  	},
  	showSignUpModal() {
  		this.setState({
  			showSignUpModal: true,
  			nopassrepeat: false
  		});
  	},
  	onHideSignUpModal() {
  		this.setState({
  			showSignUpModal: false,
  			nopassrepeat: false
  		});
  	},
  	handleSignUpButton() {
  		var user = document.getElementById('username').value;
  		var pass = document.getElementById('password').value;

  		if(pass !== document.getElementById('repeatPassword').value) {
  			this.setState({
	  			nopassrepeat: true
	  		});
  		} else {
  			// Send Signup
  			$.ajax({
			    type: 'POST',
			    url: 'https://accoeval.herokuapp.com/api/auth/signup',
			    data: JSON.stringify({ username: user, password: pass }),
			    success: (user) => { 
			    	this.setState({ user: user });
			    	this.onHideSignUpModal();
			    },
			    contentType: "application/json",
			    dataType: 'json'
			});
  			
  		}
  	},
  	handleSignInButton() {
  		$.ajax({
			type: 'POST',
			url: 'https://accoeval.herokuapp.com/api/auth/signin',
			data: JSON.stringify({
				username: document.getElementById('username').value, 
				password: document.getElementById('password').value
			}),
			success: (user) => { 
				this.setState({ user: user });
			    this.onHideSignInModal();
			},
			error: (jqXHR, textStatus, errorThrown) => {
				this.setState({ nosignin: true });
			},
			contentType: "application/json",
			dataType: 'json'
		});
  		
  	},
  	onSignOff() {
  		this.setState({ user: undefined });
  	}
});

ReactDOM.render(
	<Root />,
	document.getElementById('root'));
