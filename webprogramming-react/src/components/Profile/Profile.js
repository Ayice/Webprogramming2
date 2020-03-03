import React, { Component } from 'react';
import './Profile.css';
import { fire, storage } from '../../firebase'
import firebase from 'firebase'

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
	removeUser = () => {
		this.props.removeUser()
	}

	handleChange = event => {
		const { name, value } = event.target
		this.setState({
			[name]: value
		})
	}

	render() {
		return (
			<div className="profileContainer">
				<h1>{this.props.currentUser.name}</h1>
				<form className="profileForm">
					
					<div className="profileFormfield">
						<label>Name</label>
						<input value={this.props.currentUser.name} onChange={this.handleChange}/>
					</div>

					<div className="profileFormfield">
						<label>Address</label>
						<input value={this.props.currentUser.address} onChange={this.handleChange}/>
					</div>

					<div className="profileFormfield">
						<label>E-mail</label>
						<input value={this.props.currentUser.email} onChange={this.handleChange}/>
					</div>

					<div className="profileFormfield">
						<label>Username</label>
						<input value={this.props.currentUser.username} onChange={this.handleChange}/>
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
						<button className="saveButton" type="submit">Save Changes</button>
						<button className="manageContactsButton" type="button">Manage Contacts</button>
						<button onClick={() => this.removeUser()} className="deleteAccountButton" type="submit">Delete Account</button>
					</div>
				</form>
				
			</div>
		)
	}
}
export default Profile
