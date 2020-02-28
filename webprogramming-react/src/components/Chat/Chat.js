import React , {Component} from 'react'
import fire from '../../firebase'
import firebase from 'firebase'
import 'firebase/auth'
import './Chat.css'
import { useParams } from 'react-router-dom'

class Chat extends Component {
    constructor(props) {
		super(props)

		this.state = {
            currentUser: {},
            currentChatroom: { id: props.match.params.id },
            messages: [],
            text: ''
        }

        this.sendMessage = this.sendMessage.bind(this)
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
        .then(() => {fire.collection('messages').doc(this.state.currentChatroom.id).collection('messages').onSnapshot(doc => {
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
    
    handleChange = event => {
		const { name, value } = event.target
		this.setState({
			[name]: value
		})
	}

    sendMessage = event => {
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var timestamp = date +' '+ time;

        fire.collection('messages').doc(this.state.currentChatroom.id).collection('messages').add({
            text: this.state.text,
            sender: this.props.currentUser.username,
            timestamp: timestamp
        })
        .then(function() {
            console.log("Message successfully sent!");
        })
        .catch(function(error) {
            console.error("Error sending message: ", error);
        });
        console.log(this.state.text, this.state.currentUser.username, timestamp );
        this.setState({
            text: ''
        })
	}

    render() {
        const { messages, text } = this.state
        return (
            <div id="chat-section">
                <div className="chat-header"><h2>{this.state.currentChatroom.name}</h2></div>
                <div className="message-container">
                {messages
                // should sort the messages so last sent shows up first (from the bottom) use .sort()
                // fix that message-container shows bottom first, so you don't have to scroll down to see latest message
                .map((element, index) => {
							return (
                            <div className={'message ' + (this.props.currentUser.username === element.sender ?  'sent' : 'received')} key={index}>{element.sender}: {element.text}
								</div>
							)
						})}
                    <div className="message sent">Sent message example</div>
                    <div className="message received">Received message example</div>

                </div>
                <form onSubmit={e => {
						e.preventDefault()
						this.sendMessage(this.state)
					}}
                    >
                    <textarea name="text" value={text} placeholder="Write a message..." rows="5" onChange={this.handleChange}></textarea>
                    <button type='submit' value='Send'>
						Send
					</button>
                </form>
            </div>
        )
    }
}

export default Chat
