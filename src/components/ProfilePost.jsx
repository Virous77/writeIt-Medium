import React from "react";
import { useUserAuthContext } from "../store/authContext";
import useFetchCollection from "../hooks/useFetchCollection";
import { Link } from "react-router-dom";
import userImage from "../images/user.svg";
import SubLoader from "./UI/SubLoader";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

const ProfilePost = () => {
  const { user } = useUserAuthContext();

  const { data, loading } = useFetchCollection("post");
  const activeUserPost = data?.filter((post) => post.uid === user.uid);

  const deletePost = async (e) => {
    try {
      const res = window.confirm("Do You wanna delete?");

      if (res === true) {
        await deleteDoc(doc(db, "post", e));
        toast.success("Post deleted successfully!");
      } else {
        return;
      }
    } catch (error) {
      toast.error("Something went error!");
    }
  };

  if (loading) return <SubLoader />;

  return (
    <section className="homeBa">
      <div className="homeContentBa">
        {activeUserPost.length > 0 ? (
          <div className="homeContentList">
            {activeUserPost?.map((item) => (
              <div className="contentList" key={item.id}>
                <div className="author">
                  <img src={item.photoURL || userImage} alt={item.name} />
                  <p>{item.name || "John Max"}</p>
                  <span>
                    {new Date(item.createdAt.toDate()).toDateString()}
                  </span>
                </div>

                <Link to={`/post-details/${item.name}/${item.id}`}>
                  <div className="authorPostBar">
                    <div className="authorPost">
                      <h1>{item.title}</h1>
                      <p>{item.post.substring(0, 250)}...</p>
                    </div>

                    <img src={item.postImage} alt="post" />
                  </div>
                </Link>

                <div className="postTags">
                  <div className="postTagItem">
                    <p>{item.tags}</p>
                  </div>
                  <div>
                    <FaTrash
                      className="postDelete"
                      onClick={() => deletePost(item.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="emptyPost">No Post</p>
        )}
      </div>
    </section>
  );
};

export default ProfilePost;
