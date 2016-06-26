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
				<Userbar onSignUpClick={this.showSignUpModal} onSignInClick={this.showSignInModal} />
				<AccommodationList source="https://accoeval.herokuapp.com/api/accommodations" />
				<UserList source="https://accoeval.herokuapp.com/api/users" />
				<EvaluationList source="https://accoeval.herokuapp.com/api/evaluations" />
			</div>
		);
	},
	getInitialState: function() {
		return {
			showRegisterModal: false,
			showSignUpModal: false,
			showSignInModal: false
		};
	},
	componentDidMount: function() {

  	},
  	componentWillMount: function() {

  	},
  	renderSignInModal: function() {
  			return <Modal show={this.state.showSignInModal} onHide={this.onHideSignInModal}>
				      <Modal.Header>
				        <Modal.Title>Sign In</Modal.Title>
				      </Modal.Header>

				      <Modal.Body>
					      <form>
						    <FormGroup controlId="formControlsText">
						      <ControlLabel>Username</ControlLabel>
						      <FormControl type="text" placeholder="Enter username" />
						    </FormGroup>
						   <FormGroup controlId="formControlsPassword">
						      <ControlLabel>Password</ControlLabel>
						      <FormControl type="password" />
						    </FormGroup>
						    </form>
				      </Modal.Body>

				      <Modal.Footer>
				        <Button onClick={this.onHideSignInModal}>Cancel</Button>
				        <Button bsStyle="primary">Sign In</Button>
				      </Modal.Footer>

				    </Modal>;
  	},
  	showSignInModal() {
  		this.setState({
  			showSignInModal: true
  		});
  	},
  	onHideSignInModal() {
  		this.setState({
  			showSignInModal: false
  		});
  	},
  	renderSignUpModal: function() {
  			return <Modal show={this.state.showSignUpModal} onHide={this.onHideSignUpModal}>
				      <Modal.Header>
				        <Modal.Title>Sign Up</Modal.Title>
				      </Modal.Header>

				      <Modal.Body>
					      <form>
						    <FormGroup controlId="formControlsText">
						      <ControlLabel>Username</ControlLabel>
						      <FormControl type="text" placeholder="Enter username" />
						    </FormGroup>
						   <FormGroup controlId="formControlsPassword">
						      <ControlLabel>Password</ControlLabel>
						      <FormControl type="password" />
						    </FormGroup>
						    <FormGroup controlId="formControlsPassword">
						      <ControlLabel>Repeat Password</ControlLabel>
						      <FormControl type="password" />
						    </FormGroup>
						    </form>
				      </Modal.Body>

				      <Modal.Footer>
				        <Button onClick={this.onHideSignUpModal}>Cancel</Button>
				        <Button bsStyle="primary">Submit</Button>
				      </Modal.Footer>

				    </Modal>;
  	},
  	showSignUpModal() {
  		this.setState({
  			showSignUpModal: true
  		});
  	},
  	onHideSignUpModal() {
  		this.setState({
  			showSignUpModal: false
  		});
  	}
});

ReactDOM.render(
	<Root />,
	document.getElementById('root'));
