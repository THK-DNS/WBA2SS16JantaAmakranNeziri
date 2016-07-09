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
				{evaluations.map((evaluation) => {
					return <ListGroupItem>{evaluation}</ListGroupItem>
				})}
				{addEvaluationButton}
			</ListGroup>
		);
	},
	getInitialState: function() {
		return { evaluations: [] };
	},
	componentDidMount: function() {
	    this.serverRequest = $.get(this.props.source, (result) => {
	      this.setState({evaluations: result});
	    });
  	},
  	componentWillMount: function() {

  	},
  	showAddEvalModal() {

  	}
});

var Evaluation = React.createClass({
	render: function() {
		var entry = this.props.text + ' (' + this.props.rating + ')';
		return (
			<div>
			{entry}
			</div>);
	},
	getInitialState: function() {
		return { };
	},
	componentDidMount: function() {

  	}
});

module.exports.EvaluationList = EvaluationList;
module.exports.Evaluation = Evaluation;