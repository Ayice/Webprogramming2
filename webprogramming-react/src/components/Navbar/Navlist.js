import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

class Navlist extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isLoggedIn: false,
			navList: []
		}
	}

	handleLogout = () => {
		this.setState({
			isLoggedIn: false
		})
	}

	handleLogIn = () => {
		this.setState({
			isLoggedIn: true
		})
	}

	render() {
		const isLoggedIn = this.state.isLoggedIn
		let list = this.state.navList
		let button
		if (isLoggedIn) {
			list = [
				{ name: 'Home', path: '/' },
				{ name: 'Chatrooms', path: '/chat' },
				{ name: 'Profile', path: '/profile' }
			]

			button = <button onClick={this.handleLogout}>Log out</button>
		} else {
			list = [
				{ name: 'Home', path: '/' },
				{ name: 'Sign Up', path: '/signup' }
			]

			button = <button onClick={this.handleLogIn}>Log in</button>
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
				{button}
			</nav>
		)
	}
}

export default Navlist
