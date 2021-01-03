import React, { Fragment, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../Auth";
import firebase, { db, storage } from "../../firebase";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("green");
  const [file, setFile] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  if (firebase.auth().currentUser === null) history.push("/");

  useEffect(() => {
    const prefillData = async () => {
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
        setPhotoURL(profileDoc.data().photoURL);
      } catch (err) {
        console.log(err.message);
      }

      setLoading(false);
    };

    prefillData();
  }, []);

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleUpload(e) {
    e.preventDefault();

    return new Promise((resolve, reject) => {
      const uploadTask = storage.ref(`/images/${file.name}`).put(file);
      uploadTask.on("state_changed", console.log, console.error, () => {
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then(url => {
            setFile(null);
            // console.log(url);
            setPhotoURL(url);
            resolve(url);
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

      let url = photoURL;
      if (file !== null) url = await handleUpload(e);

      await profileDoc.ref.update({
        name: name,
        status: status,
        photoURL: url
      });

      console.log(profileDoc.data());
    } catch (err) {
      console.log(err);
    }

    history.push("/dashboard");
  };

  if (firebase.auth().currentUser == null) {
    history.push("/");
  }

  if (loading) return <div>Loading...</div>;

  return (
    <Fragment>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="profileLeft">
          <div className="form-group">
            <div className="circle" align="center">
              <img className="mask" src={photoURL}></img>
            </div>
            <div className="profileTxtLight">
              <label htmlFor="name">What're You Up To?</label>
            </div>
            <input
              type="text"
              className="profileInput"
              placeholder="Activity"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div className="profileTxtLight">
            <label htmlFor="status">Status</label>
          </div>
          <select
            name="status"
            id="status"
            className="profileInput"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="available">available</option>
            <option value="anonymous">anonymous</option>
            <option value="unavailable">unavailable</option>
            <option value="dnd">dnd</option>
            <option value="eager">eager</option>
          </select>
          <div className="profileTxtLight">
            <label htmlFor="file">Profile Pic</label>
          </div>
          <input
            type="file"
            className="profileTxtLight2"
            onChange={handleChange}
          />
          <button className="backSubmitBtn" onClick={routeToDashboard}>
            Back
          </button>
          <input type="submit" className="backSubmitBtn" value="Update" />
        </div>
      </form>
      <div className="profileRight">
        <h2>hello world</h2>
      </div>
    </Fragment>
  );
};

export default ProfilePage;
