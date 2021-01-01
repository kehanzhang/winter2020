import React, {useContext } from "react";
import { AuthContext } from "../Auth";

export default function Home() {
  const { currUser } = useContext(AuthContext)
	
  return (
		<div>
			<h1>Welcome to Dott</h1>
			<p>Please Sign in</p>
		</div>
	);
}
