// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var UserList = require('./components/users.js').UserList;

ReactDOM.render(
	<UserList source="http://accoeval.herokuapp.com/api/users" />,
	document.getElementById('root'));
