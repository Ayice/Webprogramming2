import React, { Component } from 'react'
import './Login.css'
// import fire from '../../firebase'
import firebase from 'firebase'
import 'firebase/auth'
import { Link, Redirect } from 'react-router-dom'

class LoginForm extends Component {
	constructor(props) {
		super(props)

		this.initialState = {
			email: '',
			password: ''
		}

		this.state = {
			redirect: null,
			currentUser: {}
		}
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
			.then(() => {
				this.setState(this.initialState)
			})
			.then(() => {
				this.setState({ redirect: '/dashboard' })
			})
			.catch(function(error) {
				var errorCode = error.code
				var errorMessage = error.message
				console.log(errorCode, errorMessage)
			})
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />
		}
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
						Not a user? Sign up <Link to='/signup'>here</Link>
					</h5>
				</div>
			</div>
		)
	}
}

export default LoginForm
