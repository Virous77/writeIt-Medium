import React from "react";
import useFetchCollection from "../hooks/useFetchCollection";
import Loader from "../components/UI/Loader";
import "../styles/Home.css";
import userImage from "../images/user.svg";
import { BsBookmarkPlus, BsBookmarkCheckFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import useFetchCollectionById from "../hooks/useFetchCollectionById";
import { useUserAuthContext } from "../store/authContext";
import { Link, useNavigate } from "react-router-dom";
import useFetchUserByLimit from "../hooks/useFetchUserByLimit";
import { useActionContext } from "../store/actionContext";
import { AiOutlineClose } from "react-icons/ai";

const HomePage = () => {
  const { data, loading } = useFetchCollection("post");
  const { data: userBook } = useFetchCollection("bookmark");
  const { user } = useUserAuthContext();
  const { data: bookdata } = useFetchCollectionById(user.uid, "bookmark");
  const { data: latestUser } = useFetchUserByLimit("post");
  const { showLatest, setShowLatest } = useActionContext();

  const navigate = useNavigate();

  const tagsList = data?.map((item) => item?.tags.toLowerCase());
  const uniqueTags = [...new Set(tagsList)];

  const bookMarkIt = async (e) => {
    const tempdata = {
      bid: e.id,
      uid: user.uid,
      createdAt: e.createdAt,
      name: e.name,
      post: e.post,
      postImage: e.postImage,
      tags: e.tags,
      title: e.title,
    };

    try {
      if (!user.isLoggedIn) {
        navigate("/login");
        return;
      }

      const uniqueBookMark = bookdata.find((book) => book.bid === e.id);
      if (uniqueBookMark) {
        const dele = userBook.filter((de) => de.bid === e.id);
        await deleteDoc(doc(db, "bookmark", dele[0].id));
        return;
      }
      await addDoc(collection(db, "bookmark"), tempdata);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <Loader />;
  return (
    <section className="homeBar">
      <div className="homeContentBar">
        <div className="tagWrapIt">
          <div className="tagsBarst">
            <span>For You</span>
            {uniqueTags?.map((unique, idx) => (
              <span key={idx}>
                <Link to={`/tags/${unique}`}>{unique}</Link>
              </span>
            ))}
          </div>
        </div>

        <div className="tagLine"></div>

        <button className="showHomeLat" onClick={() => setShowLatest(true)}>
          Latest
        </button>

        <div className="homeContentList">
          {data?.map((item) => (
            <div className="contentList" key={item.id}>
              <div className="author">
                <Link to={`/user-profile/${item.uid}`}>
                  <img src={item.photoURL || userImage} alt={item.name} />
                </Link>

                <p>{item.name || "John Max"}</p>
                <span>{new Date(item.createdAt?.toDate()).toDateString()}</span>
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

              <div className="postTag">
                <div className="postTagItem">
                  <Link to={`/tags/${item.tags}`}>
                    <p>{item.tags}</p>
                  </Link>

                  {bookdata?.find((book) => book.bid === item.id) ? (
                    <BsBookmarkCheckFill
                      className={`bookmarkIcon $`}
                      onClick={() => bookMarkIt(item)}
                    />
                  ) : (
                    <BsBookmarkPlus
                      className={`bookmarkIcon $`}
                      onClick={() => bookMarkIt(item)}
                    />
                  )}
                </div>
                <div></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`latest ${showLatest ? "showLatest" : "showNotLatest"}`}>
        <div>
          <AiOutlineClose
            className="homeCloseIcon"
            onClick={() => setShowLatest(false)}
          />
        </div>

        <h1>Latest</h1>

        {latestUser?.map((item) => (
          <div className="latestList" key={item.id}>
            <div className="author">
              <Link to={`/user-profile/${item.uid}`}>
                <img src={item.photoURL || userImage} alt={item.name} />
              </Link>

              <p>{item.name || "John Max"}</p>
            </div>
            <Link to={`/post-details/${item.name}/${item.id}`}>
              <h4>{item.title}</h4>
            </Link>
          </div>
        ))}

        <h2 className="trend">Trending Tags </h2>

        <div className="recomendedTopics">
          {uniqueTags?.map((tag, idx) => (
            <div className="sideTagList" key={idx}>
              <Link to={`/tags/${tag}`}>
                <p>{tag}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
