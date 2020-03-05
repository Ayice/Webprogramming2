import React, { Component } from 'react'
import './Contacts.css'
import AddForm from '../AddForm/AddForm'

class Contacts extends Component {
	constructor(props) {
		super(props)
		this.state = {
			addNewContact: false
		}
	}

	addNewContact = friend => {
		this.props.handleSubmit(friend)
	}

	removeFriend = friendId => {
		this.props.handleRemove(friendId)
	}

	render() {
		const { addNewContact } = this.state

		return (
			<div className='container'>
				<div className='contacts-div'>
					<div className='contacts-div_title'>
						<h1>Hi {this.props.currentUser.username}</h1>
						<p>In here u can see your contacts: </p>
					</div>

					{Array.isArray(this.props.currentUser.friends) && this.props.currentUser.friends.length > 0 ? <AddForm delete={true} removeUser={this.removeFriend} users={this.props.currentUser.friends} /> : <h2>Unfortunately you have no friends... YET!!! </h2>}
				</div>

				<div className='new-contact-div'>
					<div className='new-contact-title'>
						<h2>Want new friends ? </h2>
						<p>Click this button, and let the magic happen!</p>
						<button onClick={() => this.setState({ addNewContact: !addNewContact })}> Get friends</button>
					</div>

					{addNewContact ? <AddForm addUser={this.addNewContact} users={this.props.allUsers} delete={false} /> : ''}
				</div>
			</div>
		)
	}
}

export default Contacts
