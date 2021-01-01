import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../Auth";

export default function Home() {
  const { currUser } = useContext(AuthContext);

  if (currUser == null) return <Redirect to="/" />;

  return <div>HomePage</div>;
}
