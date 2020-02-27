import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            links: [
                { name: 'Contacts', path: '/contacts' },
				{ name: 'Chatrooms', path: '/chatrooms' },
                { name: 'Profile', path: '/profile' },
                { name: 'Chat', path: '/chat'}
            ]
        }
    }

    render() {
        let links = this.state.links

        return (
            <div className="dashboard-container">
                <ul className="dashboard-list">
					{links.map((x, index) => {
						return (
							<li key={index} className="dashboard-list-items">
								<Link to={x.path}>{x.name}</Link>
							</li>
						)
					})}
				</ul>
            </div>
        )
    }
}

export default Dashboard
