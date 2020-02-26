import React, { Component } from 'react'
import fire from '../../firebase'
import firebase from 'firebase'
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
		this.getChatrooms(this.props)
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
			<div>
				<h2>Pick a Chatroom</h2>
				<div>
					{chatrooms.map(x => {
						return (
							<div key={x}>
								<p>{x.name}</p>
								<ul>
									<span>Members:</span>
								</ul>
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}
export default ChatroomContainer
