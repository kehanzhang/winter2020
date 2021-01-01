import React, { Component } from 'react'

export class Chatbox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chats: []
		}
	}

	componentDidMount() {
		console.log('Chatbox was mounted')
	}
	render() {
		return (
			<div>
				<ul>
					<li>Here Are Chat messages</li>
				</ul>
			</div>
		)
	}
}

export default Chatbox
