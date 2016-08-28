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

var EvaluationList = React.createClass({
	render: function() {
		var evaluations = [];

		for(var i = 0;i < this.state.evaluations.length;i++) {
			evaluations.push(<Evaluation
				key={this.state.evaluations[i].id}
				id={this.state.evaluations[i].id} 
				writer={this.state.evaluations[i].writer}
				accommodation={this.state.evaluations[i].accommodation}
				text={this.state.evaluations[i].text}
				rating={this.state.evaluations[i].rating}
				user={this.props.user} />);
		}

		var addEvaluationButton;
		if(this.props.user !== undefined && this.props.inacco === 'true') {
			addEvaluationButton = <Button onClick={this.showAddEvalModal}>
									<Glyphicon glyph="glyphicon glyphicon-plus" /> Evaluation
								</Button>
		} else {
			addEvaluationButton = '';
		}

		return (
			<ListGroup>
				{this.renderAddEvalModal()}
				{evaluations.map((evaluation) => {
					if(this.props.inacco === 'false' || evaluation.props.accommodation === this.props.accommodation) {
						return <ListGroupItem>{evaluation}</ListGroupItem>
					} else {
						return '';
					}
				})}
				{addEvaluationButton}
			</ListGroup>
		);
	},
	getInitialState: function() {
		return { 
			evaluations: [],
			showAddEvalModal: false
		 };
	},
	componentDidMount: function() {
	    this.serverRequest = $.get(this.props.source, (result) => {
	      this.setState({evaluations: result});
	    });
  	},
  	componentWillMount: function() {

  	},
  	showAddEvalModal() {
  		this.setState({showAddEvalModal: true});
  	},
  	handleAddEval() {
  		var evaluation = {
  			writer: parseInt(this.props.user._id),
  			accommodation: parseInt(this.props.accommodation),
  			text: document.getElementById('evaltext').value,
  			rating: document.getElementById('evalrating').value
  		};

  		console.log(this.props.source);
  		console.log(evaluation);

		$.ajax({
		    type: 'POST',
		    url: this.props.source,
		    data: JSON.stringify(evaluation),
		    contentType: "application/json",
		    dataType: 'json',
		    success: (data) => { 
		    	var newEvaluation = this.state.evaluations;
		    	newEvaluation.push(data);
		    	this.setState({evaluations: newEvaluation});
		    	this.onHideAddEvalModal();
		    },
		    error: (data) => {
		    	console.log(data.getAllResponseHeaders());
		    }
		});
  	},
  	onHideAddEvalModal() {
  		this.setState({showAddEvalModal: false});
  	},
  	renderAddEvalModal: function() {
  			return <Modal show={this.state.showAddEvalModal} onHide={this.onHideAddEvalModal}>
				      <Modal.Header>
				        <Modal.Title>Add Evaluation</Modal.Title>
				      </Modal.Header>

				      <Modal.Body>
					      <form>
						    <FormGroup controlId="evaltext">
						      <ControlLabel>Evaluation</ControlLabel>
						      <FormControl type="text" placeholder="Enter evaluation text" />
						    </FormGroup>
						    <FormGroup controlId="evalrating">
						      <ControlLabel>Rating</ControlLabel>
						      <FormControl componentClass="textarea" placeholder="Enter rating" />
						    </FormGroup>
						    </form>
				      </Modal.Body>

				      <Modal.Footer>
				        <Button onClick={this.onHideAddEvalModal}>Close</Button>
				        <Button onClick={this.handleAddEval} bsStyle="primary">Add</Button>
				      </Modal.Footer>

				    </Modal>;
  	}
});

var Evaluation = React.createClass({
	render: function() {
		
		// 
		var rating = [];
		for(var i = 0;i < parseInt(this.props.rating);i++) {
			rating.push(<Glyphicon glyph="glyphicon glyphicon-star" />);
		}

		return (
			<div>
			{this.props.text}	({rating})

			</div>);
	},
	getInitialState: function() {
		return { evaluation: undefined };
	},
	componentDidMount: function() {

  	}
});

module.exports.EvaluationList = EvaluationList;
module.exports.Evaluation = Evaluation;