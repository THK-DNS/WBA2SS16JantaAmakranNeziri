// main.js
var React = require('react');
var ReactDOM = require('react-dom');

// Components
var UserList = require('./components/users.js').UserList;
var AccommodationList = require('./components/accommodations.js').AccommodationList;


ReactDOM.render(
	<AccommodationList source="https://accoeval.herokuapp.com/api/accommodations" />,
	document.getElementById('root'));
