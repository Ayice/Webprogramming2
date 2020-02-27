import React, { Component } from 'react'
import './Contacts.css'

const Contacts = props => {
	// TODO: Get all users
	// Save them in state
	// Give them an easy accessible id
	// OnClick that adds them to your contacts
	// AND adds you to their contacts !
	return (
		<div className='contacts-div'>
			<div className='contacts-div_title'>
				<h1>Hi {props.currentUser.username}</h1>
				<p>In here u can see your contacts: </p>
			</div>
			<div className='contacts-div_contacts'>
				{props.currentUser.friends
					? props.currentUser.friends.map(x => (
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
							</div>
					  ))
					: ''}
			</div>
		</div>
	)
}

export default Contacts
