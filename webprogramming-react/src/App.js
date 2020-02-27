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
import Dashboard from './components/Dashboard/Dashboard'
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
						<Route path='/chatrooms' exact render={props => <ChatroomContainer {...props} currentUser={this.state.currentUser} />} />
						<Route path='/chatrooms/chat/:id' exact component={Chat} />
						<Route path='/signup' component={SignUpForm} />
						<Route path='/' exact component={LoginForm} />
						<Route path='/dashboard' exact component={Dashboard} />
					</Switch>
				</Router>
			</div>
		)
	}
}

export default App
