import React, { Component } from 'react'
import Navlist from './Navlist'
import './Navbar.css'

class Navbar extends Component {
	constructor(props) {
		super(props)

		this.initialState = {
			isLoggedIn: false
		}

		console.log(props)
	}

	render() {
		let isLoggedIn
		if (this.props.currentUser.email) {
			isLoggedIn = true
		} else {
			isLoggedIn = false
		}

		return (
			<nav className='navbar'>
				<Navlist isLoggedIn={isLoggedIn} />
			</nav>
		)
	}
}

export default Navbar
