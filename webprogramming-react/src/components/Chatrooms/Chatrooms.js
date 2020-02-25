import React, { Component } from 'react'
import fire from '../../firebase'
import firebase from 'firebase'
class ChatroomContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			chatrooms: []
		}

		this.chatroomsRef = fire
			.database()
			.ref()
			.child('chatrooms')
	}

	// componentDidMount() {
	// 	this.chatroomsRef.onSna
	// }

	render() {
		const chatrooms = [
			{ name: 'Chatroom 1', members: [{ name: 'Sebastian' }, { name: 'Izabella' }, { name: 'Anders' }] },
			{ name: 'Chatroom 2', members: [{ name: 'Sebastian' }, { name: 'Izabella' }, { name: 'Anders' }] }
		]
		return (
			<div>
				<h2>Pick a Chatroom</h2>
				<div>
					{chatrooms.map(x => {
						return (
							<div>
								<p>{x.name}</p>
								<ul>
									<span>Members:</span>
									{x.members.map(member => {
										return <li>{member.name}</li>
									})}
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
