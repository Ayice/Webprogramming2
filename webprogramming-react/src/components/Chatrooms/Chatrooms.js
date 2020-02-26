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
		fire
			.collection('user-rooms')
			.doc(nextProps.currentUser.id)
			.get()
			.then(doc => {
				chatRoomIds = Object.keys(doc.data())
			})
			.then(ids => {
				chatRoomIds.forEach(element => {
					fire
						.collection('chatrooms')
						.doc(element)
						.get()
						.then(fetchedRooms => {
							// console.log(fetchedRooms.data())
							chatrooms.push(fetchedRooms.data())
							// console.log(chatrooms)
							this.setState({
								chatrooms: chatrooms
							})
						})
				})
			})
	}

	render() {
		const { chatrooms } = this.state
		return (
			<div className='chatroom-container'>
				<h2 className='chatroom-title'>Pick a Chatroom</h2>
				<div>
					{chatrooms.map(x => {
						return (
							<div className='chatroom' key={x}>
								<p>{x.name}</p>
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}
export default ChatroomContainer
