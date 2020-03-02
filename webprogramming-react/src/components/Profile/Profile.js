import React, { Component } from 'react'

class Profile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currentUser: props.currentUser
		}
	}

	componentDidMount() {
		setTimeout(() => {
			console.log(this.props.currentUser)
		}, 1000)
	}

	render() {
		return (
			<div>
				<h1>{this.props.currentUser.password}</h1>
				<form>
					<input value={this.props.currentUser.username} />
				</form>
			</div>
		)
	}
}
export default Profile
