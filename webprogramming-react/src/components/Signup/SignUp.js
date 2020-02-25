import React, { Component } from 'react'
import firebase from 'firebase'
import fire from '../../firebase'
import './signUpStyles.css'

export default class SignUpForm extends Component {
	constructor(props) {
		super(props)

		this.initialState = {
			name: '',
			address: '',
			email: '',
			username: '',
			password: ''
		}

		this.state = this.initialState
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange = event => {
		const { name, value } = event.target
		this.setState({
			[name]: value
		})
	}

	handleSubmit = users => {
		// Tilføjer users til databasen
		fire.collection('users').add({
			name: users.name,
			address: users.address,
			email: users.email,
			username: users.username,
			password: users.password
		})
		firebase
			.auth()
			.createUserWithEmailAndPassword(users.email, users.password)
			.catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code
				var errorMessage = error.message
				// ...
			})
		console.log('test')
		this.setState(this.initialState)
	}

	render() {
		const { name, address, email, username, password } = this.state
		return (
			<div>
				<form
					onSubmit={e => {
						e.preventDefault()
						this.handleSubmit(this.state)
					}}
				>
					<div>
						<h1>Sign up, my dude</h1>
					</div>

					<fieldset>
						<div>
							{/* Value = name/time i state dette er for at vi kan tømme inputs senere */}
							<input type='text' name='name' id='name' value={name} placeholder='Enter name here' onChange={this.handleChange} />
						</div>

						<div>
							<input type='text' name='address' id='address' value={address} placeholder='Enter your address here' onChange={this.handleChange} />
						</div>

						<div>
							<input type='text' name='email' id='email' value={email} placeholder='Enter a valid e-mail here' onChange={this.handleChange} />
						</div>

						<div>
							<input type='text' name='username' id='username' value={username} placeholder='Enter a valid username' onChange={this.handleChange} />
						</div>

						<div>
							<input type='password' name='password' id='password' value={password} placeholder='Enter a valid password' onChange={this.handleChange} />
						</div>
						<div>
							<button type='submit' value='Submit'>
								Submit
							</button>
						</div>
					</fieldset>
				</form>
			</div>
		)
	}
}
