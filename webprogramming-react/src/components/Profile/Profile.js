import React, { Component } from 'react'

class Profile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currentUser: props.currentUser
		}
		console.log(props)
	}

	componentDidMount() {
		console.log(this.props.currentUser)
	}

	render() {
		return <h1>{this.props.currentUser.password}</h1>
	}
}
export default Profile
