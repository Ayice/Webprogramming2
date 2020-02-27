import React , {Component} from 'react'
import fire from '../../firebase'
import firebase from 'firebase'
import 'firebase/auth'
import './Chat.css'

class Chat extends Component {
    constructor(props) {
		super(props)

		this.state = {
            currentUser: {},
            currentChatroom: { id: props.match.params.id },
            messages: []
        }
    }
    
    componentDidMount(){
        console.log(this.state)
        fire.collection('chatrooms').doc(this.state.currentChatroom.id).get()
        .then(doc => {
            console.log(doc.data());
            this.setState({
                currentChatroom: {id: doc.id, ...doc.data() }
            })
        })
        .then(test => {fire.collection('messages').doc(this.state.currentChatroom.id).collection('messages').onSnapshot(doc => {
            let fetchedMsgs = []
            fetchedMsgs = []
            doc.forEach(msg => {
                fetchedMsgs.push(msg.data())
                this.setState({
                    messages: fetchedMsgs
                })
            })
        })})
    }
    


    sendMessage = event => {
		event.preventDefault()
		
	}

    render() {
        const {messages} = this.state
        return (
            <div id="chat-section">
                <div className="chat-header"><h2>{this.state.currentChatroom.name}</h2></div>
                <div className="message-container">
                {messages.map((element, index) => {
							return (
                            <div className={'message ' + (this.props.currentUser.username === element.sender ?  'sent' : 'received')} key={index}>{element.sender}: {element.text}
								</div>
							)
						})}
                    <div className="message sent">Sent message example</div>
                    <div className="message received">Received message example</div>

                </div>
                <form onSubmit={this.sendMessage}>
                    <textarea name="message" placeholder="Write a message..." rows="5"></textarea>
                    <button type='submit' value='Send'>
							Send
						</button>
                </form>
            </div>
        )
    }
}

export default Chat
