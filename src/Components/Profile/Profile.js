import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSession } from "../../firebase/UserProvider";
import { firestore } from "../../firebase/config";

const Profile = () => {
  const { user } = useSession();
  const params = useParams();
  const { register, setValue } = useForm();
  const [userDocument, setUserDocument] = useState(null);

  useEffect(() => {
    const docRef = firestore.collection("users").doc(params.id);
    const unsubscribe = docRef.onSnapshot((doc) => {
      if (doc.exists) {
        const documentData = doc.data();
        setUserDocument(documentData);
        const formData = Object.entries(documentData).map((entry) => ({
          [entry[0]]: entry[1],
        }));

        setValue(formData);
      }
    });
    return unsubscribe;
  }, [user.uid, setValue]);

  if (!userDocument) {
    return null;
  }

  return (
    <div>
      <form method="post" className="profile-form">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter full name"
            ref={register}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            name="email"
            ref={register}
          />
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col">
              <label>Nationality</label>
              <input
                type="text"
                className="form-control"
                id="country"
                placeholder="Country"
                name="country"
                ref={register}
              />
            </div>
            <div className="col">
              <label htmlFor="inputEmail">Place of Birth</label>
              <input
                type="text"
                className="form-control"
                placeholder="City"
                name="city"
                ref={register}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col">
              <label htmlFor="inputEmail">Date of Birth</label>
              <input
                type="text"
                className="form-control"
                placeholder="DD / MM / YYYY"
                name="dob"
                ref={register}
              />
            </div>
            <div className="col">
              <label htmlFor="inputState">Position</label>
              <select className="form-control" name="position" ref={register}>
                <option>...</option>
                <option>Manager</option>
                <option>Forward</option>
                <option>Midfielder</option>
                <option>Defender</option>
                <option>Goalkeeper</option>
                <option>Coach</option>
                <option>Physio</option>
              </select>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col">
              <label>Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Player number"
                name="number"
                ref={register}
              />
            </div>
            <div className="col">
              <label htmlFor="inputEmail">Height</label>
              <input
                type="text"
                className="form-control"
                placeholder="Height in cms"
                name="height"
                ref={register}
              />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Data
        </button>
      </form>
    </div>
  );
};

export default Profile;
