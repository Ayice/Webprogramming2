import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import ChatroomContainer from './components/Chatrooms/Chatrooms'

function App() {
	return (
		<div className='App'>
			<Navbar />
			<ChatroomContainer />
		</div>
	)
}

export default App
