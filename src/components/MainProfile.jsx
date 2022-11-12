import React, { useState } from "react";
import users from "../images/user.svg";
import SubLoader from "./UI/SubLoader";
import "../styles/MainProfile.css";
import useUploadImge from "../hooks/useUploadImge";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { BsCamera } from "react-icons/bs";

const MainProfile = ({ loading, userData, getProductById }) => {
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
  });
  const [edit, setEdit] = useState(false);
  const { imageAsset, isLoading, uploadImage, deleteImage } = useUploadImge();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const profileSubmit = async () => {
    const tempdata = {
      name: profile.name || userData.name,
      bio: profile.bio || userData.bio,
      email: userData.email || userData.email,
      photoURL: imageAsset || null || userData.photoURL,
      editedAt: serverTimestamp(),
      uid: userData.uid,
      createdAt: userData.createdAt,
    };

    try {
      await setDoc(doc(db, "users", userData.uid), tempdata);
      toast.success("Profile Updated");
      getProductById();
      setEdit(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <SubLoader />;

  return (
    <div className="profileCard">
      {edit ? (
        <div className="mainProfileImage">
          {imageAsset ? (
            <div style={{ position: "relative", width: "100%" }}>
              <img src={imageAsset} alt="profile" />
              <div className="maindeleteImage">
                <FaTrash onClick={deleteImage} className="maintrash" />
              </div>
            </div>
          ) : (
            <div className="mainInputBar">
              {!isLoading ? (
                <div>
                  <input
                    className="mainCameraInput"
                    type="file"
                    onChange={(e) => uploadImage(e)}
                  />
                  <BsCamera className="mainCamera" />
                </div>
              ) : (
                <p> Loading...</p>
              )}
            </div>
          )}
        </div>
      ) : (
        <img
          className="mainProfileImageTwo"
          src={userData.photoURL || users}
          alt={userData?.name}
        />
      )}

      {!edit ? (
        <h2>{userData.name || "John Max"}</h2>
      ) : (
        <input
          type="text"
          className="mainInput"
          placeholder="Name"
          value={profile.name}
          name="name"
          onChange={handleChange}
        />
      )}

      {!edit ? (
        <p className="bio">{userData.bio || ""}</p>
      ) : (
        <input
          className="mainInput"
          type="text"
          placeholder="bio"
          value={profile.bio}
          name="bio"
          onChange={handleChange}
        />
      )}

      {!edit ? (
        <button onClick={() => setEdit(true)} className="aboutCancel">
          Edit
        </button>
      ) : (
        <div className="mainProfileAction">
          <button onClick={() => setEdit(false)} className="aboutCancel">
            Cancel
          </button>

          <button onClick={profileSubmit} className="aboutSave ">
            {loading ? "Saving.." : "Save"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MainProfile;
