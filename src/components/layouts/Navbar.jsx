import React from "react";
import { Link } from "react-router-dom";
import { CgMenuRight } from "react-icons/cg";
import { MdClear } from "react-icons/md";
import "../../styles/Navbar.css";
import { useUserAuthContext } from "../../store/authContext";
import users from "../../images/user.svg";
import { useActionContext } from "../../store/actionContext";
import useFetchUser from "../../hooks/useFetchUser";

const Navbar = () => {
  const { user, logout } = useUserAuthContext();
  const { isLoggedIn, uid } = user;
  const { userData, loading } = useFetchUser("users", uid);

  const { name, photoURL, email } = userData;
  const { showAction, setShowAction, handlePropfilePop, setShowLatest } =
    useActionContext();
  const { profilePop } = showAction;

  const cancel = () => {
    setShowAction({ ...setShowAction, mobileMenu: false });
  };

  const cancelPop = () => {
    setShowAction({ ...showAction, profilePop: false });
  };

  const pathname = window.location.pathname;

  return (
    <nav className="navbar">
      <div className="nav">
        <div className="logo">
          <Link to="/">
            <h1>
              Write<span>It</span>
            </h1>
          </Link>
        </div>

        <div className="navbarAuth">
          {pathname === "/" && (
            <button className="showLat" onClick={() => setShowLatest(true)}>
              Latest
            </button>
          )}

          {isLoggedIn ? (
            <Link to="/bookmark">
              <button>Bookmark</button>
            </Link>
          ) : (
            <Link to="/our-story">
              <button>Our Story</button>
            </Link>
          )}

          <Link to="/write">
            <button>Write</button>
          </Link>

          {isLoggedIn ? (
            <div className="profileLogo">
              {!loading ? (
                <img
                  src={photoURL ? photoURL : users}
                  referrerpolicy="no-referrer"
                  onClick={handlePropfilePop}
                  alt={name || "profileImage"}
                />
              ) : (
                <img src={users} alt="profile" />
              )}
            </div>
          ) : (
            <Link to="/login">
              <button>Sign In</button>
            </Link>
          )}
        </div>

        <div className="mobileMenu">
          <CgMenuRight
            className="menuIcon"
            onClick={() =>
              setShowAction({ ...setShowAction, mobileMenu: true })
            }
          />
        </div>
      </div>

      {profilePop && (
        <div className="profilePop">
          <div className="popCard">
            <div className="popName">
              <p>{name || "John Max"}</p>
              <span>{email}</span>
            </div>

            <div className="popPro">
              <Link to={`/profile/${name}`}>
                <button onClick={cancelPop}>View Profile</button>
              </Link>
            </div>

            <div className="popLogout">
              <button
                onClick={() => {
                  cancelPop();
                  logout();
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {showAction.mobileMenu && (
        <div className="mobileNavBar">
          <div className="mobileProfile">
            <Link to="/">
              <h1 onClick={cancel}>
                Write<span>It</span>
              </h1>
            </Link>

            <Link to="/">
              <button onClick={cancel}>Home</button>
            </Link>

            <div className="mobileLinks">
              <Link to="/write">
                <button onClick={cancel}>Write</button>
              </Link>

              {!isLoggedIn && (
                <Link to="/our-story">
                  <button onClick={cancel}>Our Story</button>
                </Link>
              )}

              {isLoggedIn && (
                <Link to="/bookmark">
                  <button onClick={cancel}>Bookmark</button>
                </Link>
              )}

              <div className="mobileAction">
                {isLoggedIn && (
                  <Link to={`/profile/${name}`}>
                    <button onClick={cancel}>Profile</button>
                  </Link>
                )}

                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      cancel();
                      logout();
                    }}
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="/login">
                    <button onClick={cancel}>Sign In</button>
                  </Link>
                )}
              </div>

              <div className="cancel">
                <MdClear className="cancelIcon" onClick={cancel} />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
