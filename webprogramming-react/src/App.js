import React from 'react'
import './App.css'
import './components/SignUpForm/signUpStyles.css'
import Navbar from './components/Navbar/Navbar'
import LoginForm from './components/login-form/login-form'
import SignUpForm from './components/SignUpForm/signUpForm'

function App() {
	return (
		<div className='App'>
			<Navbar />
			<LoginForm />
			<SignUpForm />
		</div>
	)
}

export default App
