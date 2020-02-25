import React, { Component } from 'react'

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
			list = [{ name: 'Home', path: '/' }, { name: 'Chatrooms' }, { name: 'Profile' }]

			button = <button onClick={this.handleLogout}>Log out</button>
		} else {
			list = [{ name: 'Home' }, { name: 'Sign Up' }]

			button = <button onClick={this.handleLogIn}>Log in</button>
		}

		return (
			<ul className='list'>
				{list.map((x, index) => {
					return (
						<li key={index}>
							<a href={x.name}>{x.name}</a>
						</li>
					)
				})}
				{button}
			</ul>
		)
	}
}

export default Navlist
