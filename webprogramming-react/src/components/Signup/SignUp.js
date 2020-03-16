import React, { Component } from 'react'
import firebase from 'firebase'
import { Redirect } from 'react-router-dom'
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
			avatar: undefined,
			avatarURL: '',
			redirect: null
		}

		this.state = this.initialState
		this.handleSubmit = this.handleSubmit.bind(this)
		this.imageUpload = this.imageUpload.bind(this)
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
					.then(async response => {
						this.uploadAvatar(response, users)
					})
					.catch(function(error) {
						// Handle Errors here.
						var errorCode = error.code
						var errorMessage = error.message
						alert(errorCode, errorMessage)
					})
			})
	}

	createUserDb = (avatarRes, userInfo, avatarUrl) => {
		fire
			.collection('users')
			.doc(avatarRes)
			.set({
				name: userInfo.name,
				address: userInfo.address,
				email: userInfo.email,
				username: userInfo.username,
				avatar: avatarUrl
				// password: users.password
			})
		console.log('hej')
	}

	uploadAvatar(response, userInfo) {
		const currentUserId = response.user.uid

		// const avatar = this.state.avatar
		storage
			.child('users/' + currentUserId)
			.put(this.state.avatar)
			.then(() => {
				storage
					.child('users/' + currentUserId)
					.getDownloadURL()
					.then(url => {
						this.createUserDb(response.user.uid, userInfo, url)
					})
					.then(() => {
						this.props.loggedIn()
					})
			})
			.catch(err => console.log(err))
	}

	imageUpload = e => {
		const file = e.target.files
		// const fileName = file[0].name
		this.setState({
			avatar: file[0]
		})
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />
		}
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
