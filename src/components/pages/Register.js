import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import firebaseConfig from '../../firebase';

export default function Register() {
	const [currUser, setCurrUser] = useState(null);
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		let {disp_name, email, password, password_conf} = e.target.elements;

		//verify
		if(password !== password_conf) {
			console.log("passwords dont match")
			return
		}

		try {
			firebaseConfig.auth().createUserWithEmailAndPassword(email.value, password.value);
			setCurrUser(true);
		} catch (err) {
			console.log(err.message);
		}
		if (currUser) {
			history.push('/');
		}
	}

	return (
		<>
			<h2>Register</h2>
			<form onSubmit = {handleSubmit}>
				<label htmlFor = 'reg-name'>Name</label>
				<input id = 'reg-name' type = "text" placeholder = "Display Name"/>

				<label htmlFor = 'reg-email'>Email</label>
				<input id = 'reg-email' type = "email" placeholder = "email"/>

				<label htmlFor = 'reg-pass'>Password</label>
				<input id = 'reg-pass-conf' type = "password" placeholder = "Password"/>

				<label htmlFor = 'reg-pass_conf'>Password Confirmation</label>
				<input id = 'reg-pass-conf' type = "password" placeholder = "Confirm Password"/>
			
				<button type = 'submit'>Register</button>
			</form>
		</>
	)
}
