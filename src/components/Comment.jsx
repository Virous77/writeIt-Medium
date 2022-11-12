import React, { useState } from "react";
import "../styles/Comment.css";
import { IoCloseOutline } from "react-icons/io5";
import { useUserAuthContext } from "../store/authContext";
import useUserFetch from "../hooks/useFetchUser";
import userImage from "../images/user.svg";
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import useFetchCollection from "../hooks/useFetchCollection";
import { useNavigate } from "react-router-dom";

const Comment = ({ setShowComment, setShowCommentBar, showCommentBar, id }) => {
  const { user } = useUserAuthContext();
  const { userData } = useUserFetch("users", user.uid);
  const { data: commentData } = useFetchCollection("comment");
  const currentComment = commentData.filter((coom) => coom.pid === id);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!user.isLoggedIn) {
      navigate("/login");
      return;
    }

    if (!comment) {
      toast.error("Add a comment please");
      return;
    }

    const tempdata = {
      uid: user.uid,
      comment: comment,
      createdAt: serverTimestamp(),
      pid: id,
      commentUser: userData.name,
      commentPhoto: userData.photoURL || null,
    };

    try {
      await addDoc(collection(db, "comment"), tempdata);
      setComment("");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="commentBar">
      <div className="commentHead">
        <h1>Comments</h1>
        <IoCloseOutline
          className="closeIcon"
          onClick={() => setShowComment(false)}
        />
      </div>

      {showCommentBar && (
        <div className="commentUserCard">
          <div className="activeCommentUser">
            <img src={userData.photoURL || userImage} alt="" />
            <p>{userData.name}</p>
          </div>

          <div className="commentInput">
            <input
              type="text"
              placeholder="Whats are your thoughts?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className="cancelComment">
            <button
              className="commentCancel"
              onClick={() => setShowCommentBar(false)}
            >
              Cancel
            </button>
            <button className="commentSave" onClick={handleSubmit}>
              Respond
            </button>
          </div>
        </div>
      )}

      {!showCommentBar && (
        <div className="thoughts">
          <p onClick={() => setShowCommentBar(true)}>
            Whats are your thoughts?
          </p>
        </div>
      )}

      <div className="commentPostList">
        {currentComment.map((curr) => (
          <div className="commentList" key={curr.id}>
            <img src={curr.commentPhoto} alt="" />

            <div className="commUser">
              <span>{curr.commentUser}</span>
              <p>{curr.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
