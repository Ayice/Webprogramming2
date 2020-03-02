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

	handleSubmit = friend => {
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

					<div className='contacts-div_contacts'>
						{this.props.currentUser.friends ? (
							this.props.currentUser.friends.map(x => (
								<div className='contact' key={x.username}>
									<div className='contact-avatar'>
										<span></span>
									</div>

									<div className='contact-info'>
										<p>{x.name} </p>

										<div className='contact-info_hide'>
											<p>{x.username} </p>
											<p>{x.address} </p>
											<p>{x.email} </p>
										</div>
									</div>

									<div onClick={() => this.removeFriend(x.id)} className='contact-delete'>
										<span className='contact-cross'></span>
									</div>
								</div>
							))
						) : (
							<h2>Unfortunately you have no friends... YET!!! </h2>
						)}
					</div>
				</div>

				<div className='new-contact-div'>
					<div className='new-contact-title'>
						<h2>Want new friends ? </h2>
						<p>Click this button, and let the magic happen!</p>
						<button onClick={() => this.setState({ addNewContact: !addNewContact })}> Get friends</button>
					</div>

					{addNewContact ? <AddForm handleSubmit={this.handleSubmit} users={this.props.allUsers} /> : ''}
				</div>
			</div>
		)
	}
}

export default Contacts
