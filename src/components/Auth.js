import React, { useEffect, useState } from "react";
import firebase from "../firebase";


export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
	const [currUser, setCurrUser] = useState(null);
	const [profiles, setProfiles] = useState({});

	useEffect(() => {
		const unsubscribe = firebase
			.firestore()
			.collection('profiles')
			.onSnapshot(snapshot => {
				let users = snapshot.docs
					.map(doc => doc.data());
				
				let dataDict = users.reduce((a,x) => ({...a, [x.user]: x}), {})
				setProfiles(dataDict);
			})
		return unsubscribe;
	}, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setCurrUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
		<AuthContext.Provider value=
			{{
				currUser, 
				profiles,
				setCurrUser,
				setProfiles,
			}}>
      {children}
    </AuthContext.Provider>
  );
};
