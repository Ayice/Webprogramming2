import React, { Component } from 'react'
import './Profile.css'
import { Link } from 'react-router-dom'

class Profile extends Component {
	constructor(props) {
		super(props)

		this.state = {
			// currentUser: props.currentUser,
			form: { ...this.props.currentUser, newPassword: '' }
		}
		this.handleChange = this.handleChange.bind(this)
	}

	editUser = event => {
		event.preventDefault()

		let data = { ...this.state.form }
		data = {
			...data,
			friends: [],
			id: ''
		}

		for (const key in data) {
			if (data[key] === '') {
				delete data[key]
			}
		}
		console.log(data)
		this.props.editUser(data)
	}

	removeUser = () => {
		this.props.removeUser()
	}

	handleChange = event => {
		const { name, value } = event.target
		this.setState({
			form: { ...this.state.form, [name]: value }
		})
	}

	render() {
		const { form } = this.state
		return (
			<div className='profileContainer'>
				<h1>{this.props.currentUser.name}</h1>
				<form onSubmit={this.editUser} className='profileForm'>
					<div className='profileFormfield'>
						<label>Name</label>
						<input value={form.name} type='text' name='name' onChange={this.handleChange} />
					</div>

					<div className='profileFormfield'>
						<label>Address</label>
						<input value={form.address} type='text' name='address' onChange={this.handleChange} />
					</div>

					<div className='profileFormfield'>
						<label>E-mail</label>
						<input value={form.email} type='email' name='email' onChange={this.handleChange} />
					</div>

					<div className='profileFormfield'>
						<label>Username</label>
						<input value={form.username} type='text' name='username' onChange={this.handleChange} />
					</div>

					<div className='profileFormfield'>
						<label>Current Password</label>
						<input value={form.password} type='password' name='password' onChange={this.handleChange} />
					</div>

					<div className='profileFormfield'>
						<label>New Password</label>
						<input name='newPassword' placeholder='Enter your new Password' type='password' onChange={this.handleChange} />
					</div>

					<div className='buttonContainer'>
						<button name='submit' className='saveButton' type='submit'>
							Save Changes
						</button>
					</div>

					<Link to='/contacts'>
						<button>
							<span>Manage Contacts</span>
						</button>
					</Link>

					<button
						onClick={e => {
							e.preventDefault()
							this.removeUser()
						}}
						className='deleteAccountButton'
						type='submit'
					>
						Delete Account
					</button>
				</form>
			</div>
		)
	}
}
export default Profile
