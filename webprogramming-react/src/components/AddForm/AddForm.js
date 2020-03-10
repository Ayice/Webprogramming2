import React, { Component } from 'react'
import '../Contacts/Contacts.css'
import { Link } from 'react-router-dom'
import './AddForm.css'

class AddForm extends Component {
	constructor(props) {
		super(props)

		this.addFriend = this.addFriend.bind(this)
	}

	addFriend(id) {
		this.props.addUser(id)
	}

	removeFriend(id) {
		this.props.removeUser(id)
	}

	showHiddenInfo(username, e) {
		e.target.classList.toggle('clicked')
	}

	render() {
		return (
			<div className='new-contact-div-contact'>
				<div className='contact-scroll-div'>
					{Array.isArray(this.props.users) && this.props.users.length > 0 ? (
						this.props.users.map(user => (
							<div onClick={e => this.showHiddenInfo(user.username, e)} className='contact' key={user.email}>
								<div className='contact-avatar'>
									<span>
										<img src={user.avatar} alt={user.name} />
									</span>
								</div>

								<div className='contact-info'>
									<p>{user.name} </p>

									<div className='contact-info_hide'>
										<p>{user.username} </p>
										<p>{user.address} </p>
										<p>{user.email} </p>
									</div>
								</div>

								<div
									onClick={e => {
										this.props.delete ? this.removeFriend(user.id) : this.addFriend(user.id)
									}}
									className={this.props.delete ? 'contact-delete' : 'contact-add'}
								>
									<span className={this.props.delete ? 'contact-cross' : 'contact-addition'}></span>
								</div>
							</div>
						))
					) : (
						<div>
							<h2>to Add someone to this chat you need friends...</h2>
							<Link to='/contacts'> Add friends here</Link>
						</div>
					)}
				</div>
			</div>
		)
	}
}
export default AddForm
