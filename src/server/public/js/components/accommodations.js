var React = require('react');
var ReactDOM = require('react-dom');

var AccommodationList = React.createClass({
	render: function() {
		var accommodations = [];

		for(var i = 0;i < this.state.accommodations.length;i++) {
			accommodations.push(<Accomodation key={this.state.accommodations[i].id} 
				title={this.state.accommodations[i].title}
				description={this.state.accommodations[i].description}
				picture={this.state.accommodations[i].picture}
					city={this.state.accommodations[i].cityname} />);
		}

		return (
			<div id="accommodationlist">
				<table border="1">
					<tbody>
					{accommodations}
					</tbody>
				</table>
			</div>
		);
	},
	getInitialState: function() {
		return { accommodations: [] };
	},
	componentDidMount: function() {
	    this.serverRequest = $.get(this.props.source, (result) => {
	      this.setState({accommodations: result});
	    });
  	},
  	componentWillMount: function() {

  	}
});

var Accomodation = React.createClass({
	render: function() {
		return (
			<tr>
				<td><img src={this.props.picture} /></td>
				<td>
					<table>
						<tbody>
							<tr><td><b>{this.props.title}</b></td></tr>
							<tr><td>{this.props.description}</td></tr>
							<tr><td>in: <em>{this.props.city}</em></td></tr>
						</tbody>
					</table>
				</td>
			</tr>);
	},
	getInitialState: function() {
		return { };
	},
	componentDidMount: function() {

  	}
});

module.exports.AccommodationList = AccommodationList;
module.exports.Accomodation = Accomodation;