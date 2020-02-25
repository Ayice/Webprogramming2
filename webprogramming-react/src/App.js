import React, { Component } from 'react'
import './App.css'
import './components/Signup/SignUp.css'
import Navbar from './components/Navbar/Navbar'
import LoginForm from './components/login-form/login-form'
import SignUpForm from './components/Signup/SignUp'
import fire from './firebase'
import firebase from 'firebase'
import ChatroomContainer from './components/Chatrooms/Chatrooms'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends Component {
	constructor() {
		super()

		this.state = {
			currentUser: {}
		}
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged(
			function(user) {
				if (user) {
					fire
						.collection('users')
						.doc(user.uid)
						.get()
						.then(doc => {
							this.setState({ currentUser: { ...doc.data() } })
						})
				} else {
					this.setState({ currentUser: {} })
				}
			}.bind(this)
		)
	}

	render() {
		return (
			<div className='App'>
				<Router>
					<Navbar currentUser={this.state.currentUser} />
					<Switch>
						<Route path='/chat'>
							<ChatroomContainer />
						</Route>

						<Route path='/signup'>
							<SignUpForm />
						</Route>

						<Route path='/'>
							<LoginForm />
						</Route>
					</Switch>
				</Router>
			</div>
		)
	}
}

export default App
