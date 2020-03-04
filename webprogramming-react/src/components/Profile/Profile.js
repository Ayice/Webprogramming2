import React, { Component } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom'

class Profile extends Component {
	constructor(props) {
		super(props)

		this.state = {
			currentUser: props.currentUser,
			username: '',
			address: '',
			email: '',
			password: '',
			newpassword: ''
		}
	}

// constructor(props){
// 	super(props);
// 	this.state = { username: '', password: '' };
//   }
 
//   handleChange = ({ target }) => {
// 	 this.setState({ [target.name]: target.value });
//   };

	editUser = () => {
		this.props.editUser()
	}

	removeUser = () => {
		this.props.removeUser()
	}

	handleChange = ({ target }) => {
		this.setState({
			[target.name]: target.value
		});
	}

	render() {
		return (
			<div className="profileContainer">
				<h1>{this.props.currentUser.name}</h1>
				<form className="profileForm">
					
					<div className="profileFormfield">
						<label>Name</label>
						<input value={this.props.currentUser.name} type="text" onChange={this.handleChange}/>
					</div>

					<div className="profileFormfield">
						<label>Address</label>
						<input value={this.props.currentUser.address} type="text" onChange={this.handleChange}/>
					</div>

					<div className="profileFormfield">
						<label>E-mail</label>
						<input value={this.props.currentUser.email} type="email" onChange={this.handleChange}/>
					</div>

					<div className="profileFormfield">
						<label>Username</label>
						<input value={this.props.currentUser.username} type="text" onChange={this.handleChange}/>
					</div>

					<div className="profileFormfield">
						<label>Current Password</label>
						<input value={this.props.currentUser.password} type="password" onChange={this.handleChange}/>
					</div>

					<div className="profileFormfield">
						<label>New Password</label>
						<input value={this.props.currentUser.newpassword} placeholder="Enter new password" type="password" onChange={this.handleChange}/>
					</div>

					<div className="buttonContainer">
						<button onClick={(e) => {e.preventDefault(); this.editUser()}} className="saveButton" type="submit">Save Changes</button>
						<Link to='/contacts'>
							<button renderAs='button'>
								<span>Manage Contacts</span>
							</button>
						</Link>
						<button onClick={(e) => {e.preventDefault(); this.removeUser()}} className="deleteAccountButton" type="submit">Delete Account</button>
					</div>
				</form>
			</div>
		)
	}
}
export default Profile
