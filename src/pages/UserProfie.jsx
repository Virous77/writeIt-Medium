import React from "react";
import { useParams, Link } from "react-router-dom";
import useUserFetch from "../hooks/useFetchUser";
import Loader from "../components/UI/Loader";
import userImage from "../images/user.svg";
import useFetchCollection from "../hooks/useFetchCollection";
import "../styles/UserProfile.css";

const UserProfie = () => {
  const { id } = useParams();
  const { userData, loading } = useUserFetch("users", id);
  const { data } = useFetchCollection("post");
  const userPost = data.filter((use) => use.uid === id);

  if (loading) return <Loader />;

  return (
    <section className="userProfileBar">
      <div className="userProfileCard">
        <div className="userProfileHead">
          <img src={userData.photoURL} alt={userData.name} />

          <div className="userNameInfo">
            <h1>{userData.name}</h1>
            <p>{userData.bio}</p>
          </div>
        </div>

        <div className="userMyPost">
          <h1>{userData.name} Post's</h1>
        </div>

        {userPost.length > 0 ? (
          <div className="userProfileA">
            <div className="homeContentBar">
              <div className="homeContentList">
                {userPost?.map((item) => (
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

                    <div className="postTagss">
                      <div className="postTagItem">
                        <p>{item.tags}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="noPostUsr">{userData.name} not write any post yet</p>
        )}
      </div>
    </section>
  );
};

export default UserProfie;
