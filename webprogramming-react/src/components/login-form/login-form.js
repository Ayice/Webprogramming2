import React, { Component } from 'react';
import './login-form.css';

class LoginForm extends Component {
    constructor(props) {
		super(props)

		this.initialState = {
			username: '',
			password: ''
        }
        this.state = this.initialState;

        // this.handleChange = this.handleChange.bind(this)
    }    

    handleChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		})
    }
    
    submitForm = event => {
		event.preventDefault()

		// Tjekker om vores inputs er tomme
		if (this.state.password === '' || this.state.username === '') {
			// Hvis de er sender vi en alert om at der skal være noget data, og returner, så vi ikke "kører" videre
			return alert('You need to enter something')
		} else {
			// Hvis vi har data kalder vi vores props, som vi har fået fra App component, med den sender vi this.state
			// Her er vores inputs forskellige data.
			this.props.handleSubmit(this.state)
			// Her bruger vi initialState til at "tømme" de forskellige inputs.
			this.setState(this.initialState)
		}
	}


    render() {
		return (
            <div id="login-section">
                <form onSubmit={this.submitForm}>
                        <div>
                            <input type='text' name='username' id='username'  placeholder='Username' onChange={this.handleChange} />
                        </div>
                        
                        <div>
                            <input type='text' name='password' id='password' placeholder='Password' onChange={this.handleChange} />
                        </div>
                        
                        <button type='submit' value='Submit'>
                            Login
                        </button>
                </form>
                <h5>Not a user? Sign up <a href="{signup}">here</a></h5>
            </div>
		)
    }
  }

export default LoginForm;
