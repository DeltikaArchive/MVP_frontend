import React, { useContext, useEffect } from "react";
// import anonyProfile from "../Images/anonyProfile.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LOGO from "../Images/LOGO.png";
import Button from "react-bootstrap/Button";
import { AppContext } from "../Context/AppContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { MAP_VIEWPORT, STARTING_MAP_ZOOM } from "../Map/MapUtils";
import { Nav } from "react-bootstrap";

const Sidebar = () => {
  const { loggedInUser, setViewport, setMapZoom } = useContext(AppContext);
  const navigate = useNavigate();

  const toCleanMain = () => {
    navigate(`/`);
    setViewport(MAP_VIEWPORT);
    setMapZoom(STARTING_MAP_ZOOM);
  };

  const logout = async () => {
    await signOut(auth);
    toCleanMain();
    console.log(loggedInUser);
    window.location.reload(false);
  };

  return (
    <div id="Sidebar">
      <div id="sidebarContent">
        <img
          width={150}
          src={LOGO}
          alt="logo"
          onClick={() => toCleanMain()}
          className="nav-link pointy mt-3"
        />
        <img
          src="/anonyProfile.png"
          alt="profilepic"
          className="my-4"
          width={60}
        
        />
        {Object.keys(loggedInUser).length === 0 ? (
          <Button
            id="homePageLoginSignupButton"
            className="mb-3"
            onClick={() => navigate("../login-signup", { replace: true })}
          >
            <FaSignInAlt />
            &nbsp;&nbsp;Sign In
          </Button>
        ) : (
          <div className="loggedInButtonInfo">
            <div id="helloUser" className="mb-2">
              Hello, {loggedInUser.displayName}!
              </div>
              <div className="mx-2">
            <Button onClick={logout} id="homePageLoginSignupButton">
              <FaSignOutAlt />
              &nbsp;&nbsp; Log out
            </Button>

              </div>
          </div>
        )}
        <div id="sidebarItems">
          <Nav.Link as={NavLink} to="/" id="sidebaritem">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/search" id="sidebaritem">
            Search
          </Nav.Link>
          {/* <Nav.Link as={NavLink} to="/macro" id="sidebaritem">
            Neighborhood
          </Nav.Link>
          <Nav.Link as={NavLink} to="/city" id="sidebaritem">
            City
          </Nav.Link> */}
        </div>
        {/* <a id="sidebaritem" href="#property">
          Property
        </a> */}
      </div>
    </div>
  );
};

export default Sidebar;
