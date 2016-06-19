// main.js
var React = require('react');
var ReactDOM = require('react-dom');

// Components
var UserList = require('./components/users.js').UserList;
var AccommodationList = require('./components/accommodations.js').AccommodationList;
var EvaluationList = require('./components/evaluations.js').EvaluationList;

var Root = React.createClass({
	render: function() {

		return (<div>
				<UserList source="https://accoeval.herokuapp.com/api/users" />
				<AccommodationList source="https://accoeval.herokuapp.com/api/accommodations" />
				<EvaluationList source="https://accoeval.herokuapp.com/api/evaluations" />
			</div>
		);
	},
	getInitialState: function() {
		return {};
	},
	componentDidMount: function() {

  	},
  	componentWillMount: function() {

  	}
});

ReactDOM.render(
	<Root />,
	document.getElementById('root'));
