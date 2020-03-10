import React, { Component } from 'react'
import firebase from 'firebase'
import { fire, storage } from '../../firebase'
import './SignUp.css'

export default class SignUpForm extends Component {
	constructor(props) {
		super(props)

		this.initialState = {
			name: '',
			address: '',
			email: '',
			username: '',
			password: '',
			avatar: null
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
		fire
			.collection('users')
			.where('username', '==', users.username)
			.get()
			.then(querySnapShot => {
				if (querySnapShot.docs.length > 0) {
					alert('The username already exists')
					throw new Error('Username already exist')
				}
			})
			.then(() => {
				firebase
					.auth()
					.createUserWithEmailAndPassword(users.email, users.password)
					.then(response => {
						console.log(response.user.email, response.user.displayName)
						fire
							.collection('users')
							.doc(response.user.uid)
							.set({
								name: users.name,
								address: users.address,
								email: users.email,
								username: users.username
								// password: users.password
							})
					})
			})
			.then(() => {
				this.uploadAvatar()
			})
			.then(() => {
				this.setState(this.initialState)
				alert("You created a user AND you're already logged in!")
			})
			.catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code
				var errorMessage = error.message
				console.log(errorCode, errorMessage)
			})
	}

	uploadAvatar(event) {
		event.preventDefault()
		const currentUserId = this.state.currentUser.id
		const avatar = this.state.avatar
		storage
			.child('users/' + currentUserId)
			.put(avatar)
			.then(() => console.log('hell ye'))
			.catch(err => console.log(err))
	}

	imageUpload = e => {
		const file = e.target.files
		// const fileName = file[0].name

		this.setState({
			avatar: file[0]
		})

		// storage
		// 	.child('users/' + this.state.currentUser.id)
		// 	.put(file[0])
		// 	.then(() => console.log('hell ye'))
		// 	.catch(err => console.log(err))
	}

	render() {
		const { name, address, email, username, password } = this.state
		return (
			// <input name={input.name} value={input.name} />
			<div>
				<form
					className='signupform'
					onSubmit={e => {
						e.preventDefault()
						this.handleSubmit(this.state)
					}}
				>
					<div>
						<h1 className='signuph1'>Sign up, my dude</h1>
					</div>

					<fieldset className='signupfieldset'>
						<div>
							{/* Value = name/time i state dette er for at vi kan tømme inputs senere */}
							<input type='text' name='name' id='name' value={name} placeholder='Enter name here' onChange={this.handleChange} className='inputContainer' />
						</div>

						<div>
							<input type='text' name='address' id='address' value={address} placeholder='Enter your address here' onChange={this.handleChange} className='inputContainer' />
						</div>

						<div>
							<input type='text' name='email' id='email' value={email} placeholder='Enter a valid e-mail here' onChange={this.handleChange} className='inputContainer' />
						</div>

						<div>
							<input type='text' name='username' id='username' value={username} placeholder='Enter a valid username' onChange={this.handleChange} className='inputContainer' />
						</div>

						<div>
							<input type='password' name='password' id='password' value={password} placeholder='Enter a valid password' onChange={this.handleChange} className='inputContainer' />
						</div>

						<div>
							<input type='file' accept='image/x-png,image/gif,image/jpeg' onChange={this.imageUpload} />
						</div>

						<div>
							<button type='submit' value='Submit' className='signupButton'>
								Submit
							</button>
						</div>
					</fieldset>
				</form>
			</div>
		)
	}
}
