import React, { Component } from 'react'
import './App.css'
import LoginForm from './components/login-form/login-form'

// import fire from './Firebase'

class App extends Component {
	// handleSubmit = todos => {
	// 	// Tilføjer dem todos til databasen
	// 	fire.collection('users').add({
	// 		username: users.username,
	// 		password: users.password
	// 	})
	// }

	render() {
		return (
			<div className=''>
				<LoginForm handleSubmit={this.handleSubmit} />
			</div>
		)
	}
}

export default App
