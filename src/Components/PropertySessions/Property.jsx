import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ARV from "./ARV/ARV";
import { AppContext } from "../../Context/AppContext";
import { auth } from "../../firebase-config";
import { getPropertyById, getPropertyByOwner } from "../../lib/propertiesDB";
import { Link } from "react-scroll";
import "./Property.css";
import Overview from "./Overview/Overview";
import Amenity from "./Amenity/Amenity";
import Environment from "./Environment/Environment";
import LongTermRental from "./LongTermRental/LongTermRental";
import ShortTermRental from "./ShortTermRental/ShortTermRental";

function Property() {
  const {
    showCompsSale,
    showCompsRent,
    showCompsSTR,
    setShowCompsSale,
    setShowCompsRent,
    setShowCompsSTR,
  } = useContext(AppContext);
  let navigate = useNavigate();
  const {
    viewport,
    setViewport,
    loading,
    setCompsPins,
    result,
    selectedId,
    setSelectedId,
    selectedProperty,
    setSelectedProperty,
    propertyResTab,
    setPropertyResTab,
    setSpecialIndicatorsTab,
    searchResults,
    setSearchResults,
    keepOriginalResults,
    setLoggedInUser,
    propertyLoader,
    setPropertyLoader,
  } = useContext(AppContext);
  const [KeepResults, setKeepResults] = useState([]);
  const [ownerClicked, setOwnerClicked] = useState(false);

  const handleBack = () => {
    if (ownerClicked) {
      setSearchResults(KeepResults);
      setOwnerClicked(false);
    }
    navigate(`/search`);
    setPropertyResTab(0);
    setSpecialIndicatorsTab(0);
  };

  const handleSeeOwner = () => {
    setOwnerClicked(true);
    setKeepResults(searchResults);
    getPropertyByOwner(selectedProperty.owner).then((res) => {
      setSearchResults(res);
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser(user);
      } else {
        navigate(`/`);
      }
    });
  }, [selectedId]);

  useEffect(() => {
    setPropertyLoader(true);
    const reloadedID = localStorage.getItem("propId");
    setSelectedId(reloadedID);
    getPropertyById(reloadedID).then((res) => {
      setSelectedProperty(res);
      console.log(res);
      setPropertyLoader(false);
    });
  }, [selectedId, setSelectedProperty]);

  function handleClickCompsSale() {
    setCompsPins(result.sales_comps);
    setShowCompsSale(!showCompsSale);
    setShowCompsRent(false);
    setShowCompsSTR(false);
  }

  function handleClickCompsRent() {
    setCompsPins(result.rent_comps);
    setShowCompsSale(false);
    setShowCompsRent(!showCompsRent);
    setShowCompsSTR(false);
  }

  function handleClickCompsSTR() {
    setCompsPins(result.st_comps);
    setShowCompsSale(false);
    setShowCompsRent(false);
    setShowCompsSTR(!showCompsSTR);
  }

  function handleClickSTRCount(source_ids) {
    const newIdsArray = source_ids.split(", ").map((e) => e.slice(1, -1));
    // console.log(newIdsArray);
    const properties = result.st_comps.filter((property) =>
      newIdsArray.includes(property.source_id)
    );
    // console.log(properties);
    setViewport({
      ...viewport,
      latitude: properties[0].latitude,
      longitude: properties[0].longitude,
    });
    setCompsPins(properties);
    setShowCompsSale(false);
    setShowCompsRent(false);
    setShowCompsSTR(false);
  }

  return (
    <div>
      {loading && (
        <Spinner
          animation="border"
          style={{ position: "relative", right: "-50%" }}
        />
      )}

      {!loading && result && (
        <div className="propertyPage">
          <header className="nav">
            <nav className="nav__container__actions">
              <ul>
                <li>
                  <Link
                    activeClass="active"
                    smooth
                    spy
                    offset={-70}
                    duration={150}
                    to="overview"
                  >
                    Overview
                  </Link>
                </li>
                <li>
                  <Link
                    activeClass="active"
                    smooth
                    spy
                    duration={150}
                    offset={-70}
                    to="amenities"
                  >
                    Amenities
                  </Link>
                </li>
                <li>
                  <Link
                    activeClass="active"
                    smooth
                    spy
                    duration={150}
                    offset={-70}
                    to="environment"
                  >
                    Environment
                  </Link>
                </li>
                <li>
                  <Link
                    activeClass="active"
                    smooth
                    spy
                    offset={-70}
                    duration={150}
                    to="arv"
                  >
                    ARV
                  </Link>
                </li>
                <li>
                  <Link
                    activeClass="active"
                    smooth
                    spy
                    offset={-70}
                    duration={150}
                    to="long-term-rental"
                  >
                    Long term rental
                  </Link>
                </li>
                <li>
                  <Link
                    activeClass="active"
                    smooth
                    spy
                    duration={150}
                    offset={-70}
                    to="short-term-rental"
                  >
                    Short term rental
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <section id="overview">
            <Overview />
          </section>
          <section id="amenities">
            <Amenity />
          </section>
          <section id="environment">
            <Environment />
          </section>
          <section id="arv">
            <ARV
              onClickCompsSale={handleClickCompsSale}
              showCompsSale={showCompsSale}
            />
          </section>
          <section id="long-term-rental">
            <LongTermRental
              onClickCompsRent={handleClickCompsRent}
              showCompsRent={showCompsRent}
            />
          </section>
          <section id="short-term-rental">
            <ShortTermRental
              onClickCompsSTR={handleClickCompsSTR}
              onClickSTRCount={handleClickSTRCount}
              showCompsSTR={showCompsSTR}
            />
          </section>
        </div>
      )}
    </div>
  );
}

export default Property;
