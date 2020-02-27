import React, { Component } from 'react'
import fire from './firebase'
import firebase from 'firebase'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css'
import Navbar from './components/Navbar/Navbar'
import LoginForm from './components/Login/Login'
import SignUpForm from './components/Signup/SignUp'
import Chat from './components/Chat/Chat'
import Profile from './components/Profile/Profile'
import ChatroomContainer from './components/Chatrooms/Chatrooms'
import Dashboard from './components/Dashboard/Dashboard'
import Contacts from './components/Contacts/Contacts'

class App extends Component {
	constructor() {
		super()

		this.state = {
			currentUser: {}
		}
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				fire
					.collection('users')
					.doc(user.uid)
					.get()
					.then(doc => {
						this.setState({ currentUser: { ...doc.data(), id: doc.id } })
					})
					.then(() => {
						this.fetchFriends()
					})
			} else {
				this.setState({ currentUser: {} })
			}
		})
	}

	fetchFriends() {
		let friendId = []
		fire
			.collection('user-user')
			.doc(this.state.currentUser.id)
			.get()
			.then(doc => {
				if (doc.data() === undefined) {
					throw Error
				}
				friendId = Object.keys(doc.data())
			})
			.then(() => {
				friendId.forEach(element => {
					fire
						.collection('users')
						.doc(element)
						.get()
						.then(friendData => {
							friendId = [friendData.data()]
						})

						.then(() => {
							this.setState({
								currentUser: { ...this.state.currentUser, friends: friendId }
							})
						})
				})
			})
			.catch(err => {
				this.setState({
					errorMsg: true
				})
			})
	}

	render() {
		return (
			<div className='App'>
				<Router>
					<Navbar currentUser={this.state.currentUser} />
					<Switch>
						<Route path='/chatrooms' exact render={props => <ChatroomContainer {...props} currentUser={this.state.currentUser} />} />
						<Route path='/chatrooms/chat/:id' exact render={props => <Chat {...props} currentUser={this.state.currentUser} />} />
						<Route path='/profile' exact render={props => <Profile {...props} currentUser={this.state.currentUser} />} />
						<Route path='/dashboard' render={props => <Dashboard {...props} currentUser={this.state.currentUser} />} />
						<Route path='/contacts' render={props => <Contacts {...props} currentUser={this.state.currentUser} />} />
						<Route path='/signup' component={SignUpForm} />
						<Route path='/' exact component={LoginForm} />
					</Switch>
				</Router>
			</div>
		)
	}
}

export default App
