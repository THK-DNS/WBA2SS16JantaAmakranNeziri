var React = require('react');
var ReactDOM = require('react-dom');
var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;

var UserList = React.createClass({
	render: function() {
		var users = [];

		for(var i = 0;i < this.state.users.length;i++) {
			var link = "users/" + this.state.users[i]._id;
			users.push(<ListGroupItem href={link}><User key={this.state.users[i]._id} name={this.state.users[i].username} /></ListGroupItem>);
		}

		return (
		<ListGroup>{users}</ListGroup>
		);
	},
	getInitialState: function() {
		return { users: [] };
	},
	componentDidMount: function() {
	    this.serverRequest = $.get(this.props.source, (result) => {
	      this.setState({users: result});
	    });
  	},
  	componentWillMount: function() {

  	}
});

var User = React.createClass({
	render: function() {
		return (<tr><td>{this.props.name}</td></tr>);
	},
	getInitialState: function() {
		return { };
	},
	componentDidMount: function() {

  	}
});

module.exports.UserList = UserList;
module.exports.User = User;