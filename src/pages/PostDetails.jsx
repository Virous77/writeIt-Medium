import React, { useState } from "react";
import "../styles/PostDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import useUserFetch from "../hooks/useFetchUser";
import Loader from "../components/UI/Loader";
import { FaRegCommentAlt, FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useUserAuthContext } from "../store/authContext";
import useFetchCollectionById from "../hooks/useFetchCollectionById";
import useFetchCollection from "../hooks/useFetchCollection";
import Comment from "../components/Comment";

const PostDetails = () => {
  const { user } = useUserAuthContext();
  const { id } = useParams();
  const { userData, loading } = useUserFetch("post", id);
  const { data: bookdata, getCollection } = useFetchCollectionById(
    user.uid,
    "like"
  );
  const { data: userBook, getCollection: getCollections } =
    useFetchCollection("like");
  const likedNumber = userBook?.filter((fi) => fi.lid === id);
  const navigate = useNavigate();

  const [showComment, setShowComment] = useState(false);
  const [showCommentBar, setShowCommentBar] = useState(true);

  const handleAddLike = async (id) => {
    const tempdata = {
      lid: id,
      uid: user.uid,
      createdAt: userData.createdAt,
      likes: Number(1),
    };
    getCollection();
    getCollections();

    try {
      if (!user.isLoggedIn) {
        navigate("/login");
        return;
      }
      const uniqueBookMark = bookdata?.find((book) => book?.lid === id);
      if (uniqueBookMark) {
        const dele = bookdata?.filter((de) => de?.lid === id);
        await deleteDoc(doc(db, "like", dele[0].id));
        return;
      }
      await addDoc(collection(db, "like"), tempdata);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <Loader />;

  return (
    <section className="postDetailsBar">
      <div className="postDetailsCard">
        <div className="detailsAuthor">
          <img src={userData?.photoURL} alt={userData?.name} />
          <div className="authName">
            <p>{userData?.name}</p>
            <span>
              {new Date(userData?.createdAt?.toDate()).toDateString()}
            </span>
          </div>
        </div>

        <div className="detailsHead">
          <h1>{userData?.title}</h1>
        </div>

        <div className="detailsImage">
          <img src={userData?.postImage} alt="post" />
        </div>

        <div className="detailsPost">
          <p>{userData?.post?.substring(0, 600)}</p>
          <p>{userData?.post?.substring(600, 1200)}</p>
          <p>{userData?.post?.substring(1200, 1400)}</p>
          <p>{userData?.post?.substring(1400, 2200)}</p>
          <p>{userData?.post?.substring(2200, 3000)}</p>
          <p>{userData?.post?.substring(3000, 4000)}</p>
          <p>{userData?.post?.substring(4000, 5000)}</p>
          <p>{userData?.post?.substring(5000, 5400)}</p>
          <p>{userData?.post?.substring(5400, 6400)}</p>
          <p>{userData?.post?.substring(6400, 6800)}</p>
          <p>{userData?.post?.substring(6800, 7500)}</p>
          <p>{userData?.post?.substring(7500, 8500)}</p>
          <p>{userData?.post?.substring(8500, 9000)}</p>
          <p>{userData?.post?.substring(9000, 9700)}</p>
          <p>{userData?.post?.substring(9700, 10000)}</p>
        </div>

        <div className="deatilsComment">
          <div className="likeBar">
            {bookdata?.find((book) => book?.lid === id) ? (
              <FaHeart
                className="detailsIcon"
                onClick={() => handleAddLike(id)}
              />
            ) : (
              <FaRegHeart
                className="detailsIcon"
                onClick={() => handleAddLike(id)}
              />
            )}

            {likedNumber.length > 0 && (
              <p>
                {likedNumber.length > 0 ? likedNumber.length : ""}{" "}
                {likedNumber.length > 1 ? "Likes" : "Like"}{" "}
              </p>
            )}
          </div>

          <FaRegCommentAlt
            className="detailsIcon"
            onClick={() => setShowComment(true)}
          />
        </div>
      </div>

      {showComment && (
        <div className="detailsSidebar">
          <Comment
            setShowComment={setShowComment}
            showCommentBar={showCommentBar}
            setShowCommentBar={setShowCommentBar}
            data={userData}
            id={id}
          />
        </div>
      )}
    </section>
  );
};

export default PostDetails;
