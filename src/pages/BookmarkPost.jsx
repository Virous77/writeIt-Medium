import React from "react";
import { useUserAuthContext } from "../store/authContext";
import useFetchCollectionById from "../hooks/useFetchCollectionById";
import { Link } from "react-router-dom";
import userImage from "../images/user.svg";
import Loader from "../components/UI/Loader";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

const BookmarkPost = () => {
  const { user } = useUserAuthContext();
  const { data, loading } = useFetchCollectionById(user.uid, "bookmark");

  const deleteBookMark = async (e) => {
    try {
      await deleteDoc(doc(db, "bookmark", e));
    } catch (error) {
      toast.error("Something went wrong, Try again!");
    }
  };

  if (loading) return <Loader />;

  return (
    <section className="homeBar">
      {data.length > 0 ? (
        <div className="homeContentBar">
          <div className="homeContentList">
            {data?.map((item) => (
              <div className="contentList" key={item.id}>
                <div className="author">
                  <img src={item.photoURL || userImage} alt={item.name} />
                  <p>{item.name || "John Max"}</p>
                  <span>
                    {new Date(item.createdAt.toDate()).toDateString()}
                  </span>
                </div>

                <Link to={`/post-details/${item.name}/${item.bid}`}>
                  <div className="authorPostBar">
                    <div className="authorPost">
                      <h1>{item.title}</h1>
                      <p>{item.post.substring(0, 250)}...</p>
                    </div>

                    <img src={item.postImage} alt="post" />
                  </div>
                </Link>

                <div className="postTagss">
                  <div className="postTagItem">
                    <p>{item.tags}</p>
                  </div>
                  <div>
                    <p
                      className="remove"
                      onClick={() => deleteBookMark(item.id)}
                    >
                      Remove
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="noBookmark">No Bookmark Found</p>
      )}
    </section>
  );
};

export default BookmarkPost;
