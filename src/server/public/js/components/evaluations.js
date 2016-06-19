var React = require('react');
var ReactDOM = require('react-dom');

var EvaluationList = React.createClass({
	render: function() {
		var evaluations = [];

		for(var i = 0;i < this.state.evaluations.length;i++) {
			evaluations.push(<Evaluation key={this.state.evaluations[i].id} 
				writer={this.state.evaluations[i].writer}
				text={this.state.evaluations[i].text}
				rating={this.state.evaluations[i].rating} />);
		}

		return (
			<div id="evaluationlist">
				<table>
					<tbody>
						{evaluations}
					</tbody>
				</table>
			</div>
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

  	}
});

var Evaluation = React.createClass({
	render: function() {
		var entry = this.props.text + ' (' + this.props.rating + ')';
		return (
			<tr>
				<td>{entry}</td>
			</tr>);
	},
	getInitialState: function() {
		return { };
	},
	componentDidMount: function() {

  	}
});

module.exports.EvaluationList = EvaluationList;
module.exports.Evaluation = Evaluation;