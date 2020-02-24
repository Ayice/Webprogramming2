import React, { Component } from 'react'

class ChatroomContainer extends Component {
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
