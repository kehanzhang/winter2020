import React, {useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import firebaseApp from '../../firebase';
import {AuthContext} from '../Auth'

export default function Register() {
	const [currUser, setCurrUser] = useState(null);
	const history = useHistory();

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault();

		try {
			firebaseApp.auth().signInWithWithEmailAndPassword(email, password);
		} catch (err) {
			console.log(err.message);
		}
		const {currUser} = useContext(AuthContext)
		if (currUser) {
			history.push('/');
		}
	}

	return (
		<>
			<h2>Register</h2>
			<form onSubmit = {handleSubmit}>
				<label htmlFor = 'reg-email'>Email</label>
				<input id = 'reg-email' type = "email" placeholder = "email" onChange = {(e) => setEmail(e.target.value)}/>

				<label htmlFor = 'reg-pass'>Password</label>
				<input id = 'reg-pass' type = "password" placeholder = "Password" onChange = {(e) => setPassword(e.target.value)}/>

				<button type = 'submit'>Log In</button>
			</form>
		</>
	)
}
