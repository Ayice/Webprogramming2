import React, { Component } from 'react'
import fire from '../../firebase'
import { Link } from 'react-router-dom'
// import firebase from 'firebase'

import './Chatrooms.css'
class ChatroomContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			chatrooms: [],
			errorMsg: false
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.currentUser !== this.props.currentUser) {
			this.getChatrooms(nextProps)
		}
	}

	componentDidMount() {
		if (this.props.currentUser.email) {
			this.getChatrooms(this.props)
		}
	}

	getChatrooms(nextProps) {
		let chatrooms = []
		let chatRoomIds = []
		let members = []
		fire
			.collection('user-rooms')
			.doc(nextProps.currentUser.id)
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

							if (data.members.length > 0) {
								data.members.forEach(element => {
									members = []
									element.get().then(doc => {
										// console.log(doc.data())
										members.push({ name: doc.data().name })
									})
								})
								data.members = members
								chatrooms.push({ ...data })
							} else {
								// console.log(data)
								// console.log(chatrooms)
								chatrooms.push({ ...data })
							}

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

	render() {
		const { chatrooms, errorMsg } = this.state

		if (errorMsg) {
			return (
				<div className='chatroom-container'>
					<div className='chatroom-title-container'>
						<h2 className='chatroom-title'>Hi {this.props.currentUser.username} !</h2>
						<p>You are not a member in any chatroom </p>
					</div>

					<div className='create-chatroom'>
						<div className='create-chatroom-title'>
							<h2>You can create a chatroom here and invite your friends</h2>
						</div>
						<div>
							<form>
								<input type='text' name='chatroom-name' placeholder="Enter your chatroom's name here" required />
							</form>
						</div>
					</div>
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
								<Link key={chatroom.id} to={`chatrooms/chat/${chatroom.id}`}>
									<div className='chatroom'>
										<p>{chatroom.name}</p>
										{/* Later in the process 
									
									{element.members.map((member, index) => (
										<p> {member.name} </p>
									))} */}
									</div>
								</Link>
							)
						})}
					</div>

					<div className='create-chatroom'>
						<div className='create-chatroom-title'>
							<h2>You can create a chatroom here and invite your friends</h2>
						</div>
						<div>
							<form>
								<input type='text' name='chatroom-name' placeholder="Enter your chatroom's name here" required />
							</form>
						</div>
					</div>
				</div>
			)
		}
	}
}
export default ChatroomContainer
