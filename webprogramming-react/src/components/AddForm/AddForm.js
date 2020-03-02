import React, { Component } from 'react'
import '../Contacts/Contacts.css'

class AddForm extends Component {
	constructor(props) {
		super(props)

		this.addFriend = this.addFriend.bind(this)
	}

	addFriend(id) {
		this.props.handleSubmit(id)
	}

	render() {
		return (
			<div className='new-contact-div-contact'>
				{this.props.users.map(user => (
					<div className='contact' key={user.username}>
						<div className='contact-avatar'>
							<span></span>
						</div>

						<div className='contact-info'>
							<p>{user.name} </p>

							<div className='contact-info_hide'>
								<p>{user.username} </p>
								<p>{user.address} </p>
								<p>{user.email} </p>
							</div>
						</div>

						<div onClick={e => this.addFriend(user.id)} className='contact-add'>
							<span className='contact-addition'></span>
						</div>
					</div>
				))}
			</div>
		)
	}
}
export default AddForm
