import React, { Component } from 'react'
import SignUpForm from '../Signup/SignUp'
import LoginForm from '../login-form/login-form'
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
			// <ul className='list'>
			// 	{list.map((x, index) => {
			// 		return (
			// 			<li key={index}>
			// 				<Link to="/path"></Link>
			// 			</li>
			// 		)
			// 	})}
			// 	{button}
			// </ul>

			<div>
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

				{/* A <Switch> looks through its children <Route>s and
						renders the first one that matches the current URL. */}
			</div>
		)
	}
}

export default Navlist
