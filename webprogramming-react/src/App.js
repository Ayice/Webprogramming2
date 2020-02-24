import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import ChatroomContainer from './components/Chatrooms/Chatrooms'
import LoginForm from './components/login-form/login-form'
import SignUpForm from './components/signUpForm/signUpForm'

function App() {
	return (
		<div className='App'>
			<Navbar />
			<LoginForm />
		</div>
	)
}

export default App
