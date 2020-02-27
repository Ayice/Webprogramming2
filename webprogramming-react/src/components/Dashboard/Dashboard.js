import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'
import DashboardTile from './Dashboard-tiles'
import fire from '../../firebase'

class Dashboard extends Component {
	// We need this, so our component won't update the state when it's not mounted
	_isMounted = false
	constructor(props) {
		super(props)

		this.state = {
			links: [
				{ name: 'Contacts', path: '/contacts', prop: this.props.currentUser },
				{ name: 'Chatrooms', path: '/chatrooms', prop: [] },
				{ name: 'Profile', path: '/profile', prop: [] },
				{ name: 'Chat', path: '/chat', prop: [] }
			],
			friends: [],
			errorMsg: false
		}
	}
	componentDidMount() {
		this._isMounted = true

		if (this.props.currentUser.id) {
			this.fetchFriends()
		}
	}

	// componentDidUpdate() {
	// 	this.fetchFriends()
	// }

	componentWillUnmount() {
		this._isMounted = false
	}
	// TODO: Get this out to the app, so we can use it  everywhere
	fetchFriends() {
		let friendId = []
		fire
			.collection('user-user')
			.doc(this.props.currentUser.id)
			.get()
			.then(doc => {
				if (doc.data() === undefined) {
					throw Error
				}
				friendId = Object.keys(doc.data())
			})
			.then(() => {
				friendId.forEach(element => {
					fire
						.collection('users')
						.doc(element)
						.get()
						.then(friendData => {
							friendId = [friendData.data()]
						})

						.then(() => {
							if (this._isMounted) {
								this.setState({
									friends: friendId
								})
							}
						})
				})
			})
			.catch(err => {
				this.setState({
					errorMsg: true
				})
			})
	}

	render() {
		const { links, friends, errorMsg } = this.state

		return (
			<div className='dashboard-container'>
				<div className='dashboard-list'>
					{links.map((link, index) => (
						<Link key={index} to={link.path} className='dashboard-list-items'>
							<DashboardTile specialProp={link.prop} title={link.name} />
						</Link>
					))}
				</div>
			</div>
		)
	}
}

export default Dashboard
