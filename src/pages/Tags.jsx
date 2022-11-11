import React from "react";
import "../styles/Tag.css";
import { useParams, Link } from "react-router-dom";
import { AiFillTag } from "react-icons/ai";
import useFetchCollectionByTag from "../hooks/useFetchCollectionByTag";
import Loader from "../components/UI/Loader";
import userImage from "../images/user.svg";
import useFetchCollectionByLimit from "../hooks/useFetchCollectionByLimit";
import useFetchUserByLimit from "../hooks/useFetchUserByLimit";

const Tags = () => {
  const { name: tagName } = useParams();
  const { data, loading } = useFetchCollectionByTag(tagName, "post");
  const { data: userPic } = useFetchCollectionByLimit(tagName, "post");
  const { data: latestUser } = useFetchUserByLimit("users");
  const tempUniqueWriter = data.map((writer) => writer.uid);
  const uniqueWriter = [...new Set(tempUniqueWriter)];
  const uniqueImageTemp = userPic?.map((image) => image.photoURL);
  const uniqueImage = [...new Set(uniqueImageTemp)];

  if (loading) return <Loader />;

  return (
    <section className="tagBar">
      <div>
        <div className="tagHead">
          <div className="tagIconBar">
            <AiFillTag className="tagIcon" />
          </div>
          <h1>{tagName}</h1>
        </div>

        <div className="tagLatest">
          <span>Latest</span>
        </div>
        <div className="tagsLine"></div>

        <div className="homeBa">
          {data.length > 0 ? (
            <div className="homeContentBa">
              <div className="homeContentList">
                {data?.map((item) => (
                  <div className="contentList" key={item.id}>
                    <div className="author">
                      <img
                        src={item.photoURL || userImage}
                        alt={item.name}
                        referrerpolicy="no-referrer"
                      />
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

                        <img
                          src={item?.postImage}
                          alt="post"
                          referrerpolicy="no-referrer"
                        />
                      </div>
                    </Link>

                    <div className="postTag">
                      <div className="postTagItem">
                        <p>{item.tags}</p>
                      </div>
                      <div></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="noBookmark">No {tagName} related Post found</p>
          )}
        </div>
      </div>
      <div className="tagSideBar">
        <div className="tagSideBarCard">
          <div className="tagCard">
            <div className="story">
              <h1>{data.length}</h1>
              <p>Stories</p>
            </div>

            <div className="story">
              <h1>{uniqueWriter.length}</h1>

              <p>Writers</p>
            </div>
          </div>

          <div className="tagUser">
            {uniqueImage.map((usePic) => (
              <img
                src={usePic || userImage}
                alt=""
                referrerpolicy="no-referrer"
              />
            ))}
          </div>
        </div>

        <div className="tagSideUserCard">
          <h1>Latest Users</h1>
          <div className="uniqueUserList">
            {latestUser.map((uUser) => (
              <div className="tagUserWrap">
                <img src={uUser.photoURL || userImage} alt="" />
                <div className="wrapTag">
                  <h5>{uUser.name}</h5>
                  <p>{uUser.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tags;
