import React, { useContext, useEffect, useRef, useState } from "react";

import { AuthContext } from "../Auth";
import { useHistory } from "react-router-dom";

// import MainContainer from "../layout/MainContainer";
import Logout from "../layout/Logout";

export default function Dashboard() {
  const { currUser } = useContext(AuthContext);
  const history = useHistory();

  if (currUser === null) history.push("/");

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Hello {currUser === null ? "hi" : currUser.email}</h2>
      <MainContainer />
      <Logout />
    </div>
  );
}
