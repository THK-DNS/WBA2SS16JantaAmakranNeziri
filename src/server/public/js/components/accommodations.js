var React = require('react');
var ReactDOM = require('react-dom');

var AccommodationList = React.createClass({
	render: function() {
		var accommodations = [];

		for(var i = 0;i < this.state.accommodations.length;i++) {
			accommodations.push(<Accomodation key={this.state.accommodations[i].id} 
				title={this.state.accommodations[i].title}
				description={this.state.accommodations[i].description}
				picture={this.state.accommodations[i].picture} />);
		}

		return (
			<div id="accommodationlist">{accommodations}</div>
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
		return (<h1>{this.props.title}</h1>);
	},
	getInitialState: function() {
		return { };
	},
	componentDidMount: function() {

  	}
});

module.exports.AccommodationList = AccommodationList;
module.exports.Accomodation = Accomodation;