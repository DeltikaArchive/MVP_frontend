import React, { useContext } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { FaDog, FaHome } from "react-icons/fa";
import { ImSearch } from "react-icons/im";
import { GiCat } from "react-icons/gi";
import { MdPets, MdLogout, MdOutlineDashboard } from "react-icons/md";
import { GoSignIn } from "react-icons/go";
import { BsPersonCircle } from "react-icons/bs";
import { AiFillStar, AiTwotoneHeart } from "react-icons/ai";
import { BiMessageSquareAdd } from "react-icons/bi";
import "./MainNavbar.css";
import LOGO from "../Images/LOGO.png";
import { AppContext } from "../Context/AppContext";
import { getAuth, signOut } from "firebase/auth";
import { MAP_VIEWPORT, STARTING_MAP_ZOOM } from "../Map/MapUtils";


function MainNavbar() {
  const { loggedInUser, setViewport, setMapZoom } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = async () => {
 const auth = getAuth();
    await signOut(auth);
    setViewport(MAP_VIEWPORT);
    setMapZoom(STARTING_MAP_ZOOM);
    navigate('/login-signup')
    // window.location.reload(false);
  };
  return (
    <Navbar
      className="navbar"
      collapseOnSelect
      expand="lg"
      bg="light"
      // variant="light"
    >
      <Container fluid>
        <Navbar.Brand href="/">
          <img width={100} src={LOGO} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-3">
            <Nav.Link as={NavLink} eventKey="1" to="/">
              <FaHome /> <span>&nbsp;Home</span>
            </Nav.Link>
            <Nav.Link as={NavLink} eventKey="2" to="/search">
              <ImSearch /> &nbsp; Search
            </Nav.Link>
            {/* {activeUser && activeUser.admin === 1 && (
              <>
                <Nav.Link as={NavLink} eventKey="3" to="/dashboard">
                  <MdOutlineDashboard /> &nbsp; Dashboard
                </Nav.Link>
                <Nav.Link as={NavLink} eventKey="4" to="/addPet">
                  <BiMessageSquareAdd /> &nbsp; Add Pet
                </Nav.Link>
              </>
            )} */}

            {/* {activeUser && (
              <>
                <Nav.Link as={NavLink} eventKey="5" to="/profile">
                  <BsPersonCircle /> &nbsp; My Profile
                </Nav.Link>
                <NavDropdown
                  title={
                    <>
                      <MdPets /> &nbsp; My Pets Page
                    </>
                  }
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item
                    className="navbar-dropdown-item"
                    as={NavLink}
                    eventKey="6"
                    to="/myPets"
                  >
                    <AiTwotoneHeart />
                    &nbsp; My pets
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    className="navbar-dropdown-item"
                    as={NavLink}
                    eventKey="7"
                    to="/savedPets"
                  >
                    <AiFillStar /> &nbsp; Saved pets
                  </NavDropdown.Item>
                </NavDropdown>{" "}
              </>
            )} */}
          </Nav>
          <Nav>
            {Object.keys(loggedInUser).length === 0 ? (
              <Nav.Link
                as={NavLink}
                eventKey="9"
                to="/login-signup"
                onClick={() => navigate("../login-signup", { replace: true })}
              >
                Login &nbsp;
                <GoSignIn />
              </Nav.Link>
            ) : (
              <Nav.Link as={NavLink} eventKey="8" to="/" onClick={logout}>
                Log out &nbsp; <MdLogout />
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
