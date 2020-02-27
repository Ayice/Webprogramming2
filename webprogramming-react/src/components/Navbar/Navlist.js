import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navlist extends Component {
	constructor(props) {
		super(props)

		this.state = {
			navList: []
		}
	}

	render() {
		const isLoggedIn = this.props.isLoggedIn
		let list = this.state.navList
		if (isLoggedIn) {
			list = [
				{ name: 'Home', path: '/' },
				{ name: 'Dashboard', path: '/dashboard' },
				{ name: 'Chatrooms', path: '/chat' },
				{ name: 'Profile', path: '/profile' }
			]
		} else {
			list = [
				{ name: 'Home', path: '/' },
				{ name: 'Sign Up', path: '/signup' }
			]
		}

		return (
			<nav>
				<ul>
					{list.map((x, index) => {
						return (
							<li key={index}>
								<Link to={x.path}>{x.name}</Link>
							</li>
						)
					})}
				</ul>
			</nav>
		)
	}
}

export default Navlist
