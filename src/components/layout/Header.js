import React from 'react'
import {Link} from 'react-router-dom'
import AuthOptions from '../auth/AuthOptions.js'

export default function Header() {
	return (
		<div id = "header">
			<Link className = 'header'>Dott</Link>
			<AuthOptions/>
		</div>
	)
}
