import React, { Component } from 'react'
import './AddForm.css'

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
				{this.props.users.map(x => (
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

						<div onClick={e => this.addFriend(x.id, e)} className='contact-add'>
							<span className='contact-addition'></span>
						</div>
					</div>
				))}
			</div>
		)
	}
}
export default AddForm
