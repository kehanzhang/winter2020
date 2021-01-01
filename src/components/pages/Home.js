import React, { useContext } from "react";
import { AuthContext } from "../Auth";

export default function Home() {
  const { currUser } = useContext(AuthContext)

  return (
		<div>
			Home Page
		</div>
	);
}
