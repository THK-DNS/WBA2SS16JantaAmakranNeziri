var React = require('react');
var ReactDOM = require('react-dom');

var UserList = React.createClass({
	render: function() {
		var users = [];

		for(var i = 0;i < this.state.users.length;i++) {
			users.push(<User key={this.state.users[i]._id} name={this.state.users[i].username} />);
		}

		return (
			<div id="userlist">
				<table>
					<tbody>
						{users}
					</tbody>
				</table>
				</div>
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