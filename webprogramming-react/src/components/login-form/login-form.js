import React, { Component } from 'react'
import './login-form.css'
import fire from '../../firebase'
import firebase from 'firebase'
import 'firebase/auth'

class LoginForm extends Component {
	constructor(props) {
		super(props)

		this.initialState = {
			email: '',
			password: '',
			currentUser: { email: '' }
		}
		this.state = this.initialState
	}

	handleChange = event => {
		const { name, value } = event.target
		this.setState({
			[name]: value
		})
	}

	handleLogin = event => {
		event.preventDefault()
		const { email, password } = this.state
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(response => console.log(response))
			.catch(function(error) {
				var errorCode = error.code
				var errorMessage = error.message
				console.log(errorCode, errorMessage)
			})
		this.getCurrentUser()
	}

	getCurrentUser = () => {
		let user = firebase.auth().currentUser
		console.log('test')
		this.setState({})
	}

	render() {
		const { currentUser } = this.state
		return (
			<div id='login-section'>
				<h1>Login to this mega awesome chat app</h1>
				<div id='login-form'>
					<form onSubmit={this.handleLogin}>
						<div>
							<input type='email' name='email' id='email' placeholder='E-mail' onChange={this.handleChange} />
						</div>

						<div>
							<input type='password' name='password' id='password' placeholder='Password' onChange={this.handleChange} />
						</div>

						<button type='submit' value='Submit'>
							Login
						</button>
					</form>
					<h5>
						Not a user? Sign up <a href='#ffds'>here</a>
					</h5>
				</div>
				<button
					onClick={e => {
						e.preventDefault()
						firebase.auth().signOut()
					}}
				>
					Log Out
				</button>
				<h1>{currentUser.name} </h1>
			</div>
		)
	}
}

export default LoginForm
