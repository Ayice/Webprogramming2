import React, { Component } from 'react'
import Navlist from './Navlist'
import './Navbar.css'

class Navbar extends Component {
	render() {
		return (
			<nav className='navbar'>
				<Navlist />
			</nav>
		)
	}
}

export default Navbar
