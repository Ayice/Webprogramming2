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
			isLoggedIn: false,
			msg: ''
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
				this.fetchCurrentUser(user)
			} else {
				this.setState({
					currentUser: {},
					isLoggedIn: false
				})
			}
		})
		this.fetchUsers()
	}

	fetchCurrentUser(user) {
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

	fetchFriends() {
		let friendId = []
		fire
			.collection('user-user')
			.doc(this.state.currentUser.id)
			.onSnapshot(doc => {
				if (doc.data()) {
					friendId = Object.keys(doc.data())
					this.fetchFriendData(friendId)
				}
			})
	}

	fetchFriendData(friendArray) {
		let friendDataArray = []
		if (friendArray.length > 0) {
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
		} else {
			this.setState({
				currentUser: { ...this.state.currentUser, friends: [] }
			})
		}
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
				this.fetchFriends()
			})
			.catch(err => {
				console.log(err, 'What! an error ?')
			})
	}

	editUser = data => {
		const user = firebase.auth().currentUser
		console.log(data)

		fire
			.collection('users')
			.doc(this.state.currentUser.id)
			.set(
				{
					...data,
					newPassword: ''
				},
				{ merge: true }
			)
			.then(() => {
				let dataAuth = {}
				for (const key in data) {
					if (key === 'address') {
						delete data[key]
					} else if (key === 'newPassword') {
						user.updatePassword(data[key]).then(() => {
							delete data[key]
							this.setState({ msg: 'Updated Password, ' })
						})
					} else if (key === 'email') {
						if (data[key] !== this.state.currentUser.email) {
							user.updateEmail(data[key]).then(() => {
								delete data[key]
								// user.sendEmailVerification()
								this.setState({ msg: this.state.msg + 'Updated Email' })
							})
						} else {
							delete data[key]
						}
					}
				}
				dataAuth = { ...data, displayName: data.name }
				return dataAuth
			})
			.then(dataAuth => {
				console.log(dataAuth)
				user.updateProfile({
					...dataAuth
				})
			})
			.then(() => {
				this.fetchCurrentUser(user)
			})
			.then(() => {
				alert(this.state.msg)
				console.log(this.state.msg)
			})
			.catch(error => {
				console.log('you done goofed')
			})
	}

	removeUser = () => {
		const user = firebase.auth().currentUser
		const curUserId = this.state.currentUser.id
		// console.log(user)
		fire
			.collection('users')
			.doc(curUserId)
			.delete()
			.then(() => {
				user.delete()
			})
			.then(() => {
				alert('Thanos snapped his fingers and your ass is dust')
			})
			.catch(error => {
				console.log('you done goofed')
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
				alert(`Yes! You connected you friend to the chatroom`)
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
						<Route path='/profile' exact render={props => (this.state.isLoggedIn ? <Profile {...props} removeUser={this.removeUser} currentUser={this.state.currentUser} editUser={this.editUser} /> : <Redirect to='/' />)} />
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
