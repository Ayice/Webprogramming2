import React, { Component } from 'react'
import fire from '../../firebase'
import firebase from 'firebase'

import './Chatrooms.css'
class ChatroomContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			chatrooms: []
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.currentUser != this.props.currentUser) {
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
			})
			.then(ids => {
				chatRoomIds.forEach(chatroomId => {
					fire
						.collection('chatrooms')
						.doc(chatroomId)
						.get()
						.then(chatRoomData => {
							let data = chatRoomData.data()

							if (data.members.length > 0) {
								data.members.forEach(element => {
									element.get().then(doc => {
										// console.log(doc.data())
										members.push(doc.data().name)
									})
								})
								data.members = members
								chatrooms.push({ ...data })
								// console.log(chatrooms)
							} else {
								// console.log(data)
								chatrooms.push({ ...data })
							}

							this.setState({
								chatrooms: chatrooms
							})
						})
				})
			})
	}

	render() {
		const { chatrooms } = this.state

		// console.log(chatrooms.members, 'renders')
		return (
			<div className='chatroom-container'>
				<div className='chatroom-title-container'>
					<h2 className='chatroom-title'>Hi {this.props.currentUser.username} !</h2>
					<p>These are the chatrooms you are a part of: </p>
				</div>
				<div className='chatrooms'>
					{chatrooms.map(x => {
						return (
							<div className='chatroom' key={x.name}>
								<p>{x.name}</p>
								<br />
								<p></p>
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}
export default ChatroomContainer
