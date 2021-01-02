import React, { Fragment, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../Auth";
import firebase, { db } from "../../firebase";
import Dashboard from "./Dashboard";

const ProfilePage = props => {
  const { currUser, setCurrUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const history = useHistory();

  const routeToDashboard = () => {
    history.push("/dashboard");
  };

  const onSubmit = async e => {
    e.preventDefault();

    try {
      const query = await db
        .collection("profiles")
        .where("user", "==", currUser.uid)
        .get();

      query.forEach(doc => {
        console.log(doc.data());
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Fragment>
      <h1>Profile Page</h1>
      <form class="form" onSubmit={e => onSubmit(e)}>
        <div class="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <select
          name="status"
          id="status"
          onChange={e => setStatus(e.target.value)}
        >
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
        </select>
        <input type="submit" class="btn btn-primary" value="Update" />
      </form>

      <button onClick={routeToDashboard}>Back</button>
    </Fragment>
  );
};

export default ProfilePage;
