import React from 'react'
import './App.css'
import './components/Signup/SignUp.css'
import Navbar from './components/Navbar/Navbar'
import LoginForm from './components/login-form/login-form'
import SignUpForm from './components/Signup/SignUp'

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
