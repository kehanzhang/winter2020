import React, { useState, useContext, Fragment } from "react";
import { AuthContext } from "../Auth";
import firebase, { db } from "../../firebase";
import defaultIco from "../assets/logo.png";
import { useHistory } from "react-router-dom";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const Marker = props => {
  const { color, name, id, url, callBack } = props;
  const recipient = id;
  const history = useHistory();

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const { currUser, profiles } = useContext(AuthContext);
  const [firstText, setFirstText] = useState("");

	const checkIfExist = () => {
		if (profiles[currUser.uid].chats.includes(recipient)){
			console.log('chat already exists')
			const index = profiles[currUser.uid].chats.indexOf(recipient)
			
			db.collection('chat-groups').doc(profiles[currUser.uid].chatids[index]).get()
				.then((query) => {
					callBack(query.data())
				})
			
		}
		else {
			onOpenModal()
		}
	}

  const createChat = (e) => {
		e.preventDefault();

		console.log("createChat");
		if (firstText !== "") {
			let id = null;
			db.collection("chat-groups")
				.add({})
				.then(docRef => {
					let groupDocRef = db.collection("chat-groups").doc(docRef.id);
					id = docRef.id;
					const newChat = {
						chatName: `${profiles[recipient].name}-${profiles[currUser.uid].name}`,
						createdAt: firebase.firestore.FieldValue.serverTimestamp(),
						createdBy: currUser.uid,
						id: docRef.id,
						members: [currUser.uid, recipient]
					};
					groupDocRef.set(newChat);
					callBack(newChat);
					
					//query and change profiles
					db
						.collection("profiles")
						.where("user", "==", currUser.uid)
						.get()
						.then((query) => {
							const profileRef = query.docs[0]
							profileRef.ref.update({
								chats: [...profiles[currUser.uid].chats, recipient],
								chatids: [...profiles[currUser.uid].chatids, id]
							})
							.then(() => {
								console.log('doc updated self')
							})
						})

					db
						.collection("profiles")
						.where("user", "==", recipient)
						.get()
						.then((query) => {
							const profileRef = query.docs[0]
							profileRef.ref.update({
								chats: [...profiles[recipient].chats, currUser.uid],
								chatids: [...profiles[currUser.uid].chatids, id]
							})
							.then(() => {
								console.log('doc updated other')
							})
						})

					db.collection("chat-messages")
						.doc(id)
						.collection("messages")
						.add({})
						.then(docRef => {
							let messageDocRef = db
								.collection("chat-messages")
								.doc(id)
								.collection("messages")
								.doc(docRef.id);

							const newMessage = {
								sentAt: firebase.firestore.FieldValue.serverTimestamp(),
								sentBy: currUser.uid,
								text: firstText,
								id: docRef.id
							};

							messageDocRef.set(newMessage);
						});
				});
		}  
    
  };

  return (
    <Fragment>
      <a className="marker-button" onClick={checkIfExist}>
        <div
          className="pin bounce"
          style={{
            backgroundColor: color,
            cursor: "pointer",
            borderStyle: "dotted"
          }}
          title={name}
        >
          <img src={url == "" ? defaultIco : url} className="marker-img"></img>
        </div>

        <div className="pulse" />
      </a>

      <Modal open={open} onClose={onCloseModal} center>
        <h6>Send this person a message</h6>
        <textarea
          type="text"
          value={firstText}
          onChange={e => setFirstText(e.target.value)}
        ></textarea>
        <button onClick={createChat}>Send</button>
      </Modal>
    </Fragment>
  );
};

export default Marker;
