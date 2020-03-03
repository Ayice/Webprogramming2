import React, { Component } from 'react'
import { fire } from '../../firebase'
import firebase from 'firebase'
import 'firebase/auth'
import { Redirect } from 'react-router-dom'

import './Chat.css'

import AddForm from '../AddForm/AddForm'

class Chat extends Component {
	constructor(props) {
		super(props)

		this.state = {
			currentChatroom: { id: props.match.params.id },
			messages: [],
			text: '',
			toDashboard: false
		}
		this.sendMessage = this.sendMessage.bind(this)
	}

	scrollToBottom = () => {
		this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
	}

	componentDidMount() {
		// console.log(firebase.firestore.Timestamp.now().toMillis())
		// console.log(this.state)
		this.scrollToBottom()

		fire
			.collection('chatrooms')
			.doc(this.state.currentChatroom.id)
			.get()
			.then(doc => {
				this.setState({
					currentChatroom: { id: doc.id, ...doc.data() }
				})
			})
			.then(() => {
				fire
					.collection('messages')
					.doc(this.state.currentChatroom.id)
					.collection('messages')
					.orderBy('compareTimestamp')
					.onSnapshot(doc => {
						let fetchedMsgs = []
						doc.forEach(msg => {
							fetchedMsgs.push(msg.data())
							// fetchedMsgs.compareTimestamp.sort((a, b) => a - b)
							this.setState({
								messages: fetchedMsgs
							})
						})
						// console.log(this.state.messages)
					})
			})
	}

	componentDidUpdate() {
		this.scrollToBottom()
	}

	handleChange = event => {
		const { name, value } = event.target
		this.setState({
			[name]: value
		})
	}

	handleSubmit = friend => {
		this.props.addToChat(friend, this.state.currentChatroom.id)
	}

	sendMessage = event => {
		var today = new Date()
		var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
		var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
		var timestamp = date + ' ' + time

		fire
			.collection('messages')
			.doc(this.state.currentChatroom.id)
			.collection('messages')
			.add({
				/**
				 * TODO: Kan man compare firebase timestamps ?
				 * Det kan man
				 *
				 */
				text: this.state.text,
				sender: this.props.currentUser.username,
				timestamp: timestamp,
				compareTimestamp: firebase.firestore.Timestamp.now()
			})
			.then(function() {
				console.log('Message successfully sent!')
			})
			.catch(function(error) {
				console.error('Error sending message: ', error)
			})
		this.setState({
			text: ''
		})
	}

	removeFromChat = (userId, chatroomId) => {
		// console.log(userId)
		// console.log(chatroomId)
		fire
			.collection('user-rooms')
			.doc(userId)
			.update({
				[chatroomId]: firebase.firestore.FieldValue.delete()
			})
			.then(() => {
				console.log('You left the Chatroom.. what a sad day')
				this.props.history.push('/chatrooms')
			})
	}

	render() {
		const { messages, text, currentChatroom } = this.state

		// if (this.state.toDashboard)

		return (
			<div>
				<div id='chat-section'>
					<div className='chat-header'>
						<h2>{this.state.currentChatroom.name}</h2>
					</div>

					<div id='message-container'>
						{messages.map((message, index) => {
							return (
								<div className={'message ' + (this.props.currentUser.username === message.sender ? 'sent' : 'received')} key={index}>
									{message.sender}: {message.text}
								</div>
							)
						})}
						<div
							style={{ float: 'left', clear: 'both' }}
							ref={el => {
								this.messagesEnd = el
							}}
						></div>
					</div>

					<form
						onSubmit={e => {
							e.preventDefault()
							this.sendMessage(this.state)
						}}
					>
						<textarea name='text' value={text} placeholder='Write a message...' rows='5' onChange={this.handleChange}></textarea>
						<button type='submit' value='Send'>
							Send
						</button>
					</form>
				</div>
				´
				<div>
					<button
						onClick={e => {
							e.preventDefault()
							this.removeFromChat(this.props.currentUser.id, currentChatroom.id)
						}}
					>
						Leave this chat
					</button>
				</div>
				<AddForm handleSubmit={this.handleSubmit} users={this.props.allUsers} />
			</div>
		)
	}
}

export default Chat
