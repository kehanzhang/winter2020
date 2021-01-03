import React, { Fragment, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../Auth";
import firebase, { db, storage } from "../../firebase";

const ProfilePage = () => {

  const [name, setName] = useState("");
  const [status, setStatus] = useState("green");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
	const history = useHistory();


	if (firebase.auth().currentUser === null) history.push("/");

  useEffect(async () => {
    try {
      const uid = firebase.auth().currentUser.uid;

      const query = await db
        .collection("profiles")
        .where("user", "==", uid)
        .get();

      const profileDoc = query.docs[0];

      console.log(profileDoc.data());
      setName(profileDoc.data().name);
      setStatus(profileDoc.data().status);
    } catch (err) {
      console.log(err.message);
    }

    setLoading(false);
  }, []);

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleUpload(e) {
    e.preventDefault();
    const uploadTask = storage.ref(`/images/${file.name}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then(url => {
          setFile(null);
          console.log(url);
          firebase.auth().currentUser.updateProfile({
            photoURL: url
          });
        });
    });
  }

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

    handleUpload(e);
  };

  if (firebase.auth().currentUser == null) {
    history.push("/");
  }

  if (loading) return <div>Loading...</div>;

  return (
    <Fragment>
      <h1>Profile Page</h1>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <select
          name="status"
          id="status"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
        </select>
        <input type="file" onChange={handleChange} />
        <input type="submit" className="btn btn-primary" value="Update" />
        <img src={firebase.auth().currentUser.photoURL}></img>
      </form>

      <button onClick={routeToDashboard}>Back</button>
    </Fragment>
  );
};

export default ProfilePage;
