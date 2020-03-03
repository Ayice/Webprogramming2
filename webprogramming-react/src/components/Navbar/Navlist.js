import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'

class Navlist extends Component {
	constructor(props) {
		super(props)

		this.state = {
			navList: []
		}
	}

	handleLogOut = () => {
		firebase
			.auth()
			.signOut()
			.then(
				this.setState({
					currentUser: { email: null }
				})
			)
	}

	render() {
		const isLoggedIn = this.props.isLoggedIn
		let list = this.state.navList
		let button
		if (isLoggedIn) {
			list = [
				{ name: 'Home', path: '/' },
				{ name: 'Chatrooms', path: '/chatrooms' },
				{ name: 'Profile', path: '/profile' },
				{ name: 'Dashboard', path: '/dashboard' }
			]
			button = <button onClick={this.handleLogOut}>Log Out</button>
		} else {
			list = [
				{ name: 'Home', path: '/' },
				{ name: 'Sign Up', path: '/signup' }
			]
			button = null
		}

		return (
			<ul>
				{list.map((x, index) => {
					return (
						<li key={index}>
							<Link to={x.path}>{x.name}</Link>
						</li>
					)
				})}
				{button}
			</ul>
		)
	}
}

export default Navlist
