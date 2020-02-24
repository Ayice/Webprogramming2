import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import LoginForm from './components/login-form/login-form'
import ChatroomContainer from './components/Chatrooms/Chatrooms'

function App() {
	return (
		<div className='App'>
			<Navbar />
			<LoginForm />
		</div>
	)
}

export default App
