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
			password: ''
		}

		this.state = {
			currentUser: { email: null }
		}
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged(
			function(user) {
				if (user) {
					this.setState({ currentUser: { email: user.email } })
				} else {
					this.setState({ user: null })
				}
			}.bind(this)
		)
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
				this.state = this.initialState
			})
			.catch(function(error) {
				var errorCode = error.code
				var errorMessage = error.message
				console.log(errorCode, errorMessage)
			})
	}

	handleLogOut = () => {
		firebase
			.auth()
			.signOut()
			.then(
				this.setState({
					currentUser: { email: null }
				})
			)
	}

	render() {
		const { currentUser } = this.state
		let greeting

		if (this.state.currentUser.email != null) {
			greeting = <h2>hi {currentUser.email}</h2>
		} else {
			greeting = null
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
						Not a user? Sign up <a href='#ffds'>here</a>
					</h5>
					<button onClick={this.handleLogOut}>Log Out</button>
				</div>

				{greeting}
			</div>
		)
	}
}

export default LoginForm
