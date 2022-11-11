import React, { useState } from "react";
import "../styles/ProfileAction.css";
import { db } from "../firebase/firebase.config";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { BsCamera } from "react-icons/bs";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import useUserFetch from "../hooks/useFetchUser";
import user from "../images/user.svg";
import SubLoader from "./UI/SubLoader";
import useUploadImge from "../hooks/useUploadImge";

const ProfileAbout = ({ uid, name }) => {
  const { userData, getProductById, loading } = useUserFetch("aboutWrite", uid);
  const { imageAsset, isLoading, uploadImage, deleteImage } = useUploadImge();

  const initialState = {
    about: "",
  };

  const [aboutData, setAboutData] = useState(initialState);
  const [SubmitLoading, setSubmitLoading] = useState(false);
  const [aboutDone, setAboutDone] = useState(true);

  //HandleImage
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAboutData({ ...aboutData, [name]: value });
  };

  //Submit form
  const handleSubmit = async () => {
    setSubmitLoading(true);

    const Aboutdata = {
      about: aboutData.about || userData.about,
      imageAbout: imageAsset || userData.imageAbout,
      createdAt: serverTimestamp(),
      uid: uid,
    };

    try {
      await setDoc(doc(db, "aboutWrite", uid), Aboutdata);
      setSubmitLoading(false);
      setAboutDone(true);
      getProductById();
    } catch (error) {
      toast.error("Something went wrong, Try again!");
    }
  };

  if (loading) return <SubLoader />;

  return (
    <section className="profileAboutBar">
      <div className="profileAboutSection">
        <div className="aboutSectionAction">
          {!aboutDone && (
            <div className="wrapAbout">
              <button
                className="aboutCancel"
                onClick={() => setAboutDone(true)}
              >
                Cancel
              </button>
              <button
                className="aboutSave"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                {SubmitLoading ? "Submitting" : "Save"}
              </button>
            </div>
          )}

          {aboutDone && (
            <button className="aboutCancel" onClick={() => setAboutDone(false)}>
              Edit
            </button>
          )}
        </div>

        <div className="aboutWrite">
          {!aboutDone ? (
            <div className="aboutImageConta">
              {imageAsset ? (
                <div className="imgAsset">
                  <img src={imageAsset} alt="about" />
                  <div className="deleteImage">
                    <FaTrash onClick={deleteImage} className="trash" />
                  </div>
                </div>
              ) : (
                <input type="file" onChange={uploadImage} />
              )}
              {!imageAsset && <BsCamera className="cameraIcon" />}
              {isLoading && <p>Loading..</p>}
            </div>
          ) : (
            <img
              className="userNotImage"
              src={userData?.imageAbout || user}
              alt={name || "user"}
            />
          )}

          {!aboutDone ? (
            <input
              type="text"
              value={aboutData.about}
              name="about"
              onChange={handleChange}
              className="nameInput"
              placeholder="Write"
            />
          ) : (
            <p className="userAboutMsg">
              {userData?.about || "Write about you"}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileAbout;
