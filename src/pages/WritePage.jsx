import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useUserAuthContext } from "../store/authContext";
import { FaTrash } from "react-icons/fa";
import { BsCamera } from "react-icons/bs";
import useUploadImge from "../hooks/useUploadImge";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../styles/Write.css";
import useUserFetch from "../hooks/useFetchUser";

const WritePage = () => {
  const { uploadImage, imageAsset, isLoading, deleteImage } = useUploadImge();

  const [post, setPost] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const { user } = useUserAuthContext();
  const navigate = useNavigate();
  const { isLoggedIn } = user;
  const naviagte = useNavigate();

  const { userData } = useUserFetch("users", user.uid);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const field = document.querySelector('[name="tags"]');

  field?.addEventListener("keypress", function (event) {
    const key = event.keyCode;
    if (key === 32) {
      event.preventDefault();
    }
  });

  const submit = async () => {
    const { title, content, tags } = post;
    setLoading(true);

    if (!isLoggedIn) {
      naviagte("/login");
      return;
    }

    if (!title || !content || !tags) {
      setLoading(false);
      toast.error("Please fill all fields..");
      return;
    }
    const tempdata = {
      uid: user.uid,
      name: userData.name,
      photoURL: userData.photoURL || null,
      post: content,
      title: title,
      tags: tags,
      postImage: imageAsset,
      createdAt: serverTimestamp(),
      likes: Number(0),
    };
    try {
      await addDoc(collection(db, "post"), tempdata);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong, Try again");
    }
  };

  return (
    <section className="writeBar">
      <div className="writePostbar">
        <div className="postInput">
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={post.title}
            onChange={handleChange}
          />
        </div>

        <div className="postInputImage">
          {!imageAsset ? (
            <div className="writeImage">
              {!isLoading ? (
                <div className="writeImagebar">
                  <input type="file" onChange={uploadImage} />
                  <BsCamera className="writeCamera" />
                  <p>Title Image</p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          ) : (
            <div>
              <img src={imageAsset} alt="hero" />
              <FaTrash className="writeTrash" onClick={deleteImage} />
            </div>
          )}
        </div>

        <div className="postInput">
          <textarea
            name="content"
            cols="70"
            rows="20"
            placeholder="Write a Post"
            value={post.content}
            onChange={handleChange}
          />
        </div>

        <div className="postInput">
          <input
            type="text"
            placeholder="Tags"
            name="tags"
            value={post.tags}
            onFocus={() => setAlert(true)}
            onBlur={() => setAlert(false)}
            onChange={handleChange}
          />

          {alert && <p>Tag must be one liner.</p>}
        </div>

        <button onClick={submit}>{loading ? "Submitting" : "Submit"}</button>
      </div>
    </section>
  );
};

export default WritePage;
