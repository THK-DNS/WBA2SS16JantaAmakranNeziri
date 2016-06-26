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

var AccommodationList = React.createClass({
	render: function() {
		var accommodations = [];
		

		for(var i = 0;i < this.state.accommodations.length;i++) {
			accommodations.push(<Accomodation id={this.state.accommodations[i].id} 
				key={this.state.accommodations[i].id} 
				title={this.state.accommodations[i].title}
				description={this.state.accommodations[i].description}
				picture={this.state.accommodations[i].picture}
					city={this.state.accommodations[i].city}
						onClickEvaluation={this.handleEvaluationButton}
						onClickEdit={this.handleEditButton}
						onClickRemove={this.handleRemoveButton} />);
		}

		return (<div>
			{this.renderAddAccModal()}
			<Button onClick={this.showAddAccModal}>
					<Glyphicon glyph="glyphicon glyphicon-plus" /> Accommodation
				</Button>
			<ListGroup>
				{accommodations.map((accomodation) => {
					return <ListGroupItem>{accomodation}</ListGroupItem>
				})}
			</ListGroup></div>
		);
	},
	getInitialState: function() {
		return { 
			accommodations: [],
			showAddAccModal: false
		};
	},
	componentDidMount: function() {
	    this.serverRequest = $.get(this.props.source, (result) => {
	      this.setState({accommodations: result});
	    });
  	},
  	componentWillMount: function() {

  	},
  	handleEvaluationButton: function(id) {
		console.log(id);
	},
	handleEditButton: function(id) {
		console.log(id);
	},
	handleRemoveButton: function(id) {
		$.ajax({
			type: 'DELETE',
		    url: this.props.source + `/${id}`,
		    success: (data) => { 
		    	var removed = this.state.accommodations.filter((acco) => {
		    		return acco.id !== id;
		    	});
		    	
		    	this.setState({accommodations: removed});
		    }
		});
	},
  	handleAddAcco() {
  		var accommodation = {
  			owner: 0,
  			title: document.getElementById('accotitle').value,
  			description: document.getElementById('accodesc').value,
  			picture: document.getElementById('accopic').value,
  			city: document.getElementById('accocountry').value
  		};

		$.ajax({
		    type: 'POST',
		    url: this.props.source,
		    data: JSON.stringify(accommodation),
		    success: (data) => { 
		    	console.log(data);
		    },
		    contentType: "application/json",
		    dataType: 'json'
		});
  	},
  	renderAddAccModal: function() {
  			return <Modal show={this.state.showAddAccModal} onHide={this.onHideAddAccModal}>
				      <Modal.Header>
				        <Modal.Title>Add Accommodation</Modal.Title>
				      </Modal.Header>

				      <Modal.Body>
					      <form>
						    <FormGroup controlId="accotitle">
						      <ControlLabel>Title</ControlLabel>
						      <FormControl type="text" placeholder="Enter title" />
						    </FormGroup>
						    <FormGroup controlId="accodesc">
						      <ControlLabel>Description</ControlLabel>
						      <FormControl componentClass="textarea" placeholder="Enter description" />
						    </FormGroup>
						    <FormGroup controlId="accopic">
						      <ControlLabel>Picture</ControlLabel>
						      <FormControl type="text" placeholder="Enter picture url" />
						    </FormGroup>
						    <FormGroup controlId="accocountry">
						      <ControlLabel>City</ControlLabel>
						      <FormControl type="text" placeholder="Enter city name" />
						    </FormGroup>
						    </form>
				      </Modal.Body>

				      <Modal.Footer>
				        <Button onClick={this.onHideAddAccModal}>Close</Button>
				        <Button onClick={this.handleAddAcco} bsStyle="primary">Add</Button>
				      </Modal.Footer>

				    </Modal>;
  	},
  	showAddAccModal() {
  		this.setState({
  			showAddAccModal: true
  		});
  	},
  	onHideAddAccModal() {
  		this.setState({
  			showAddAccModal: false
  		});
  	}
});

var Accomodation = React.createClass({
	render: function() {

		var control = '';
		// Gets only controls if he's logged in and owning accomodations
		control = <ButtonToolbar>
			      <ButtonGroup bsSize="small">
			      	<Button onClick={() => this.props.onClickEvaluation(this.props.id)} bsStyle="primary"><Glyphicon glyph="glyphicon glyphicon-comment" /></Button>
			        <Button onClick={() => this.props.onClickEdit(this.props.id)} ><Glyphicon glyph="glyphicon glyphicon-pencil" /></Button>
			        <Button onClick={() => this.props.onClickRemove(this.props.id)} bsStyle="danger"><Glyphicon glyph="glyphicon glyphicon-remove" /></Button>
			      </ButtonGroup>
			    </ButtonToolbar>;

		return (
		<Grid>
			<Row>
				<Col md={2}>
					<Thumbnail href="#" alt="100x100" src={this.props.picture} responsive />
				</Col>
				<Col md={8}>
					<Grid>
						<Row>
						<Col md={6}><h4><strong>{this.props.title}</strong></h4></Col>
						</Row>
						<Row>
						<Col md={6}><h5>{this.props.description}</h5></Col>
						</Row>
						<Row>
						<Col md={6}><h6>in: {this.props.city}</h6></Col>
						</Row>
					</Grid>
				</Col>
				<Col md={2}>{control}</Col>
			</Row>
		</Grid>
			);
	},
	getInitialState: function() {
		return { };
	},
	componentDidMount: function() {

  	}
});

module.exports.AccommodationList = AccommodationList;
module.exports.Accomodation = Accomodation;