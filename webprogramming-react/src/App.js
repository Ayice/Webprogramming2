import React, { Component } from 'react'
import './App.css'
import './components/Signup/SignUp.css'
import Navbar from './components/Navbar/Navbar'
import LoginForm from './components/Login/Login'
import SignUpForm from './components/Signup/SignUp'
import Chat from './components/Chat/Chat'
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
							this.setState({ currentUser: { ...doc.data(), id: doc.id } })
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
							<ChatroomContainer currentUser={this.state.currentUser} />
						</Route>

						<Route path='/signup'>
							<SignUpForm />
						</Route>

						<Route path='/'>
							<LoginForm />
							{/* < Chat /> */}
						</Route>
					</Switch>
				</Router>
			</div>
		)
	}
}

export default App
