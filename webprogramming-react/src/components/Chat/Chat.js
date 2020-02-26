import React , {Component} from 'react'
import fire from '../../firebase'
import firebase from 'firebase'
import 'firebase/auth'
import './Chat.css'

class Chat extends Component {
    constructor(props) {
		super(props)

		this.initialState = {
			email: '',
			password: ''
		}

		this.state = {
			currentUser: {}
		}
    }
    
    sendMessage = event => {
		event.preventDefault()
		
	}

    render() {
        return (
            <div id="chat-section">
                <div className="chat-header"><h2>Chat with USERNAMES or CHATROOM</h2></div>
                <div className="message-container">
                    <div className="message sent">Sent message</div>
                    <div className="message received">Received message</div>
                </div>
                <form onSubmit={this.sendMessage}>
                    <input type="text" name="message" placeholder="Write a message..." />
                    <button type='submit' value='Send'>
							Send
						</button>
                </form>
            </div>
        )
    }
}

export default Chat
