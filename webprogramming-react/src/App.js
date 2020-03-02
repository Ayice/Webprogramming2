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
			currentUser: {},
			allUsers: []
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
						this.setState({ currentUser: { ...doc.data(), id: doc.id, friends: [] } })
					})
					.then(() => {
						this.fetchFriends()
					})
					.catch(err => {
						alert(err)
					})
			}
		})

		this.fetchUsers()
	}

	fetchFriends() {
		let friendId = []
		fire
			.collection('user-user')
			.doc(this.state.currentUser.id)
			.onSnapshot(doc => {
				friendId = Object.keys(doc.data())
				this.fetchFriendData(friendId)
			})
	}

	fetchFriendData(friendArray) {
		let friendDataArray = []
		friendArray.forEach(element => {
			// console.log(element)
			fire
				.collection('users')
				.doc(element)
				.get()
				.then(friendData => {
					friendDataArray.push({ id: friendData.id, ...friendData.data() })
				})
				.then(() => {
					this.setState({
						currentUser: { ...this.state.currentUser, friends: friendDataArray }
					})
				})
		})
	}

	fetchUsers() {
		let allUsers = []
		fire
			.collection('users')
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					allUsers.push({ id: doc.id, ...doc.data() })
				})
			})
			.then(() => {
				this.setState({
					allUsers: allUsers
				})
			})
	}

	addUser = friend => {
		let currentUserId = this.state.currentUser.id
		fire
			.collection('user-user')
			.doc(currentUserId)
			.set(
				{
					[friend]: true
				},
				{ merge: true }
			)
			.then(() => {
				fire
					.collection('user-user')
					.doc(friend)
					.set(
						{
							[currentUserId]: true
						},
						{ merge: true }
					)
			})
			.then(() => {
				console.log('Yes we are now friends ! ')
			})
	}

	handleRemove = friendId => {
		const currentUserId = this.state.currentUser.id
		fire
			.collection('user-user')
			.doc(currentUserId)
			.update({
				[friendId]: firebase.firestore.FieldValue.delete()
			})
			.then(() => {
				fire
					.collection('user-user')
					.doc(friendId)
					.update({
						[currentUserId]: firebase.firestore.FieldValue.delete()
					})
			})
			.then(() => {
				alert('You just deleted a friend... Hope you will be friends again')
			})
			.catch(err => {
				console.log(err, 'What an error')
			})
	}

	addToChat = (userId, chatroomId) => {
		fire
			.collection('user-rooms')
			.doc(userId)
			.set(
				{
					[chatroomId]: true
				},
				{ merge: true }
			)
			.then(() => {
				console.log(`Yes! You connected you friend to the chatroom`)
			})
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		return (
			<div className='App'>
				<Router basename={'/react-exam'}>
					<Navbar currentUser={this.state.currentUser} />
					<Switch>
						<Route path='/chatrooms' exact render={props => <ChatroomContainer {...props} currentUser={this.state.currentUser} />} />
						<Route path='/chatrooms/chat/:id' exact render={props => <Chat {...props} currentUser={this.state.currentUser} />} />
						<Route path='/profile' exact render={props => <Profile {...props} currentUser={this.state.currentUser} />} />
						<Route path='/dashboard' render={props => <Dashboard {...props} currentUser={this.state.currentUser} />} />
						<Route path='/contacts' render={props => <Contacts {...props} currentUser={this.state.currentUser} allUsers={this.state.allUsers} handleSubmit={this.addUser} handleRemove={this.handleRemove} />} />
						<Route path='/signup' component={SignUpForm} />
						<Route path='/' exact component={LoginForm} />
					</Switch>
				</Router>
			</div>
		)
	}
}

export default App
