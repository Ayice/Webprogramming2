import React, { Component } from 'react'
import { fire, storage } from './firebase'
import firebase from 'firebase'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

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
			allUsers: [],
			isLoggedIn: false
			// testImg: ''
		}
	}

	componentDidMount() {
		// const storageRef = storage.ref()
		// const userImgRef = storageRef.child('users')
		// const userAvatar = userImgRef.child('2018-05-14 21.22.03.jpg')

		// this.setState({
		// 	testImg: userAvatar
		// })
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				fire
					.collection('users')
					.doc(user.uid)
					.get()
					.then(doc => {
						// console.log(doc)
						this.setState({ currentUser: { ...doc.data(), id: doc.id, friends: [] } })
					})
					.then(() => {
						this.setState({
							isLoggedIn: true
						})
						this.fetchFriends()
					})
					.catch(err => {
						alert(err)
					})
			} else {
				this.setState({
					currentUser: {},
					isLoggedIn: false
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
				if (doc.data()) {
					// console.log(doc.data())

					friendId = Object.keys(doc.data())
					this.fetchFriendData(friendId)
				}
			})
	}

	fetchFriendData(friendArray) {
		let friendDataArray = []
		friendArray.forEach(friendId => {
			// console.log(element)
			fire
				.collection('users')
				.doc(friendId)
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
			.then(users => {
				users.forEach(doc => {
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
				console.log(err, 'What! an error ?')
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
		// const { testImg } = this.state
		return (
			<div className='App'>
				{/* <img src={testImg} alt='hej' /> */}
				<Router basename={'/react-exam'}>
					<Navbar currentUser={this.state.currentUser} />
					<Switch>
						<Route path='/chatrooms' exact render={props => (this.state.isLoggedIn ? <ChatroomContainer {...props} currentUser={this.state.currentUser} /> : <Redirect to='/' />)} />
						<Route path='/chatrooms/chat/:id' exact render={props => (this.state.isLoggedIn ? <Chat {...props} currentUser={this.state.currentUser} allUsers={this.state.allUsers} addToChat={this.addToChat} /> : <Redirect to='/' />)} />
						<Route path='/profile' exact render={props => (this.state.isLoggedIn ? <Profile {...props} currentUser={this.state.currentUser} /> : <Redirect to='/' />)} />
						11
						<Route path='/dashboard' render={props => (this.state.isLoggedIn ? <Dashboard {...props} currentUser={this.state.currentUser} /> : <Redirect to='/' />)} />
						<Route path='/contacts' render={props => (this.state.isLoggedIn ? <Contacts {...props} currentUser={this.state.currentUser} allUsers={this.state.allUsers} handleSubmit={this.addUser} handleRemove={this.handleRemove} /> : <Redirect to='/' />)} />
						<Route path='/signup' component={SignUpForm} render={props => (!this.state.isLoggedIn ? <SignUpForm /> : <Redirect to='/dashboard' />)} />
						<Route path='/' exact render={props => (!this.state.isLoggedIn ? <LoginForm /> : <Redirect to='/dashboard' />)} />
					</Switch>
				</Router>
			</div>
		)
	}
}

export default App
