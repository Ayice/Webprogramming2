import React, { Component } from 'react'
import { fire } from '../../firebase'
import firebase from 'firebase'
import { Link } from 'react-router-dom'
// import firebase from 'firebase'

import './Chatrooms.css'
class ChatroomContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			chatrooms: [],
			errorMsg: false,
			chatroomName: ''
		}
	}

	// UNSAFE_componentWillReceiveProps(nextProps) {
	// 	if (nextProps.currentUser !== this.props.currentUser) {
	// 		this.getChatrooms(nextProps)
	// 	}
	// }

	componentDidMount() {
		if (this.props.currentUser.email) {
			this.getChatrooms(this.props)
		}
	}

	getChatrooms(props) {
		let chatrooms = []
		let chatRoomIds = []
		// let members = []
		fire
			.collection('user-rooms')
			.doc(props.currentUser.id)
			.get()
			.then(doc => {
				chatRoomIds = Object.keys(doc.data())
				// console.log(chatRoomIds)
				if (chatRoomIds.length < 1) {
					throw Error
				}
			})
			.then(ids => {
				chatRoomIds.forEach(chatroomId => {
					fire
						.collection('chatrooms')
						.doc(chatroomId)
						.get()
						.then(chatRoomData => {
							let data = { id: chatRoomData.id, ...chatRoomData.data() }

							chatrooms.push({ ...data })

							this.setState({
								chatrooms: chatrooms
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

	removeFromChat = (userId, chatroomId, e) => {
		console.log(chatroomId)
		fire
			.collection('user-rooms')
			.doc(userId)
			.update({
				[chatroomId]: firebase.firestore.FieldValue.delete()
			})
			.then(() => {
				alert('You left the Chatroom.. what a sad day')
				this.props.history.push('/chatrooms')
			})
			.then(() => {
				this.getChatrooms(this.props)
			})
	}

	handleChange = event => {
		const { name, value } = event.target
		this.setState({
			[name]: value
		})
	}

	createChatroom = chatroom => {
		let currentUserID = this.props.currentUser.id

		fire
			.collection('chatrooms')
			.add({
				name: this.state.chatroomName
			})
			.then(doc => {
				// console.log(doc.id)
				fire
					.collection('user-rooms')
					.doc(currentUserID)
					.set(
						{
							[doc.id]: true
						},
						{ merge: true }
					)
			})
			.then(() => {
				this.getChatrooms(this.props)
				this.setState({
					chatroomName: ''
				})
			})
	}

	render() {
		const { chatroomName, chatrooms, errorMsg } = this.state

		const form = (
			<div className='create-chatroom'>
				<div className='create-chatroom-title'>
					<h2>You can create a chatroom here and invite your friends</h2>
				</div>

				<div>
					<form
						onSubmit={e => {
							e.preventDefault()
							this.createChatroom(this.state)
						}}
					>
						<input type='text' name='chatroomName' value={chatroomName} placeholder="Enter your chatroom's name here" required onChange={this.handleChange} />
						<button type='submit'>Create Chatroom</button>
					</form>
				</div>
			</div>
		)

		if (errorMsg) {
			return (
				<div className='chatroom-container'>
					<div className='chatroom-title-container'>
						<h2 className='chatroom-title'>Hi {this.props.currentUser.username} !</h2>
						<p>You are not a member in any chatroom </p>
					</div>
					{form}
				</div>
			)
		} else {
			return (
				<div className='chatroom-container'>
					<div className='chatroom-title-container'>
						<h2 className='chatroom-title'>Hi {this.props.currentUser.username} !</h2>
						<p>These are the chatrooms you are a part of: </p>
					</div>

					<div className='chatrooms'>
						{chatrooms.map(chatroom => {
							return (
								<div className='chatroom' key={chatroom.id}>
									<Link className='chatroom-link' to={`chatrooms/chat/${chatroom.id}`}>
										<p>{chatroom.name}</p>
										{/* Later in the process 
									
									{element.members.map((member, index) => (
										<p> {member.name} </p>
									))} */}
									</Link>
									<span
										className='chatroom-leave'
										onClick={e => {
											e.preventDefault()
											this.removeFromChat(this.props.currentUser.id, chatroom.id, e)
										}}
									>
										X
									</span>
								</div>
							)
						})}
					</div>

					{form}
				</div>
			)
		}
	}
}
export default ChatroomContainer
