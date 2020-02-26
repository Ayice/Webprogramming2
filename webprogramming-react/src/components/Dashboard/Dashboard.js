import React, { Component } from 'react'
import firebase from 'firebase'
import fire from '../../firebase'
import { BrowserRouter as Router, Link } from 'react-router-dom'

import React, { Component } from 'react'

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <ul className="dashboard-list">

                    <li className="dashboard-list-item">
                        <a><Link to='/profile'>Profile</Link>Profile</a>
                    </li>

                    <li className="dashboard-list-item">
                        <a><Link to='/chatrooms'>Chatrooms</Link></a>
                    </li>

                    <li className="dashboard-list-item">
                        <a><Link to='/contacts'>Contacts</Link></a>
                    </li>

                    <li className="dashboard-list-item">
                        <a><Link to='/chatrooms'>Most recent chatroom</Link></a> //plus path til seneste chatroom. Ikke sikkert vi kan få det til at virke
                    </li>
                    <Link to='/signup'>here</Link>
                </ul>
            </div>
        )
    }
}

export default Dashboard
