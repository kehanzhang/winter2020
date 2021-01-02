import React, { Fragment, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../Auth";
import firebase, { db } from "../../firebase";
import Dashboard from "./Dashboard";

const ProfilePage = props => {
  const { currUser, setCurrUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [status, setStatus] = useState("green");

  const history = useHistory();

  const routeToDashboard = () => {
    history.push("/dashboard");
  };

  const onSubmit = async e => {
    e.preventDefault();

    try {
      const uid = firebase.auth().currentUser.uid;

      const query = await db
        .collection("profiles")
        .where("user", "==", uid)
        .get();

      const profileDoc = query.docs[0];

      console.log(name);
      console.log(status);

      await profileDoc.ref.update({ name, status });

      console.log("Profile updated");
      history.push("/dashboard");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Fragment>
      <h1>Profile Page</h1>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
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
        <input type="submit" className="btn btn-primary" value="Update" />
      </form>

      <button onClick={routeToDashboard}>Back</button>
    </Fragment>
  );
};

export default ProfilePage;
