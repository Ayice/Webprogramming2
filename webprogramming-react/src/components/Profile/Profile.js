import React, { Component } from 'react';
import './Profile.css';

class Profile extends Component {
	constructor(props) {
		super(props)

		this.state = {
			currentUser: props.currentUser
		}
	}

	componentDidMount() {
		setTimeout(() => {
			console.log(this.props.currentUser)
		}, 1000)
	}

	render() {
		return (
			<div className="profileContainer">
				<h1>{this.props.currentUser.name}</h1>
				<form className="profileForm">
					
					<div className="profileFormfield">
						<label>Name</label>
						<input value={this.props.currentUser.name} />
					</div>

					<div className="profileFormfield">
						<label>Address</label>
						<input value={this.props.currentUser.address} />
					</div>

					<div className="profileFormfield">
						<label>E-mail</label>
						<input value={this.props.currentUser.email} />
					</div>

					<div className="profileFormfield">
						<label>Username</label>
						<input value={this.props.currentUser.username} />
					</div>

					<div className="profileFormfield">
						<label>Current Password</label>
						<input value={this.props.currentUser.password} type="password"/>
					</div>

					<div className="profileFormfield">
						<label>New Password</label>
						<input value={this.props.currentUser.newpassword} placeholder="Enter new password" type="password" />
					</div>

					<div className="buttonContainer">
						<button className="saveButton" type="submit">Save Changes</button>
						<button className="manageContactsButton" type="button">Manage Contacts</button>
						<button className="deleteAccountButton" type="submit">Delete Account</button>
					</div>
				</form>
				
			</div>
		)
	}
}
export default Profile
