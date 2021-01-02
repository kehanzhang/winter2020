import React, { useEffect, useState } from "react";
import firebase from "../firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currUser, setCurrUser] = useState(null);
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
    <AuthContext.Provider value={{ currUser, setCurrUser }}>
      {children}
    </AuthContext.Provider>
  );
};
