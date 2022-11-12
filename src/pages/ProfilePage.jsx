import React, { useState } from "react";
import { useUserAuthContext } from "../store/authContext";
import "../styles/Profile.css";
import { BsThreeDots } from "react-icons/bs";
import useUserFetch from "../hooks/useFetchUser";
import Loader from "../components/UI/Loader";
import { useActionContext } from "../store/actionContext";
import ProfileAbout from "../components/ProfileAbout";
import ProfilePost from "../components/ProfilePost";
import MainProfile from "../components/MainProfile";

const ProfilePage = () => {
  const { user } = useUserAuthContext();
  const { userData, loading, getProductById } = useUserFetch("users", user.uid);
  const { name, uid } = userData;
  const { showAction, setShowAction, spanActive, setSpanActive } =
    useActionContext();

  const [showProfile, setShowProfile] = useState(false);

  if (loading) return <Loader />;

  return (
    <section className="profileBar">
      <div className="profileWrap">
        <div className="mainProfile">
          <div className="profileHead">
            <h1>{name}</h1>

            <BsThreeDots
              className="threeDot"
              onClick={() =>
                setShowAction({ ...showAction, copyPop: !showAction.copyPop })
              }
            />

            {showAction.copyPop && (
              <div className="copyPop">
                <p
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setShowAction({ ...showAction, copyPop: false });
                    setShowAction({ ...setShowAction, copyLink: true });
                    setTimeout(() => {
                      setShowAction({ ...setShowAction, copyLink: false });
                    }, 2000);
                  }}
                >
                  copy link to profile
                </p>
              </div>
            )}

            {showAction.copyLink && (
              <div className="linkCopy ">link copied</div>
            )}
          </div>

          <div className="profileActions">
            <div className="profileActionLink">
              <span
                className={spanActive ? "spanActive" : "spanNotActive"}
                onClick={() => setSpanActive(true)}
              >
                Home
              </span>
              {!showProfile && (
                <span
                  className={spanActive ? "spanNotActive" : "spanActive"}
                  onClick={() => {
                    setSpanActive(false);
                    {
                      userData &&
                        setShowAction({ ...showAction, showAboutEdit: true });
                    }
                  }}
                >
                  About
                </span>
              )}

              <span
                className={`profileIt ${
                  showProfile ? "profileItActive" : "profileItNotActive"
                }`}
                onClick={() => setShowProfile(!showProfile)}
              >
                Profile
              </span>
            </div>
            <hr />
          </div>

          {spanActive ? (
            <ProfilePost />
          ) : (
            <ProfileAbout uid={uid} name={name} />
          )}
        </div>
        <div
          className={`sideProfile ${
            showProfile ? "showprofile " : "showprofileNot "
          }`}
        >
          <MainProfile
            userData={userData}
            loading={loading}
            getProductById={getProductById}
          />
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
