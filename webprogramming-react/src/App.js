import React from 'react'
import './App.css'
import './components/Signup/SignUp.css'
import Navbar from './components/Navbar/Navbar'
import LoginForm from './components/login-form/login-form'
import SignUpForm from './components/Signup/SignUp'
import ChatroomContainer from './components/Chatrooms/Chatrooms'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";

function App() {
	return (
		<div className='App'>
		

        <Router>
        <Navbar />
        <Switch>

          <Route path="/chat">
            <ChatroomContainer />
          </Route>

          <Route path="/signup">
            <SignUpForm />
          </Route>

          <Route path="/">
            <LoginForm />
          </Route>

        </Switch>
        </Router>
		</div>
	)
}

export default App
