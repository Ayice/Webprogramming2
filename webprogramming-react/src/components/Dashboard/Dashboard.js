import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'
import DashboardTile from './Dashboard-tiles'
// import fire from '../../firebase'

class Dashboard extends Component {
	constructor(props) {
		super(props)

		this.state = {
			links: [
				{ name: 'Contacts', path: '/contacts' },
				{ name: 'Chatrooms', path: '/chatrooms' },
				{ name: 'Profile', path: '/profile' }
			],
			friends: []
		}
	}

	componentDidUpdate() {
		if (this.state.friends !== this.props.currentUser.friends) {
			this.setState({
				friends: this.props.currentUser.friends
			})
		}
	}

	render() {
		const { links } = this.state

		return (
			<div className='dashboard-container'>
				<div className='dashboard-list'>
					{links.map((link, index) => (
						<Link key={index} to={link.path} className='dashboard-list-items'>
							<DashboardTile title={link.name} />
						</Link>
					))}
				</div>
			</div>
		)
	}
}

export default Dashboard
