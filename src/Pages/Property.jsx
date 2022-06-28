import { Divider } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AddressInfo from "../Components/PropertySessions/AddressInfo";
import Amenities from "../Components/PropertySessions/Amenities";
import ARV from "../Components/PropertySessions/ARV";
import HomeFacts from "../Components/PropertySessions/HomeFacts";
import OwnershipInfo from "../Components/PropertySessions/OwnershipInfo";
import RentalEstimate from "../Components/PropertySessions/RentalEstimate";
import Risks from "../Components/PropertySessions/Risks";
import ShortTermRental from "../Components/PropertySessions/ShortTermRental";
import Similarity from "../Components/PropertySessions/Similarity";
import SearchBarN from "../Components/SearchBarN";
import { AppContext } from "../Context/AppContext";
import { auth } from "../firebase-config";
import { getPropertyById, getPropertyByOwner } from "../lib/propertiesDB";
import "./Property.css";

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
    viewport, setViewport,
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
    setCompsPins(result[7]);
    setShowCompsSale(true);
    setShowCompsRent(false);
    setShowCompsSTR(false);
  }

  function handleClickCompsRent() {
    setCompsPins(result[8]);
    setShowCompsSale(false);
    setShowCompsRent(true);
    setShowCompsSTR(false);
  }

  function handleClickCompsSTR() {
    setCompsPins(result[9]);
    setShowCompsSale(false);
    setShowCompsRent(false);
    setShowCompsSTR(true);
  }


  function handleClickSTRCount(source_ids) {
    const newIdsArray = source_ids.split(", ").map((e) => e.slice(1, -1));
    console.log(newIdsArray);
    const properties = result[9].filter((property) =>
    newIdsArray.includes(property.source_id)
    );
    console.log(properties);
    setViewport({ ...viewport, latitude: properties[0].latitude, longitude: properties[0].longitude });
    setCompsPins(properties);
     setShowCompsSale(false);
     setShowCompsRent(false);
     setShowCompsSTR(false);
  }

  return (
    <div>
      {loading && <Spinner animation="border" />}
      {!loading && result && (
        <div className="propertyPage">
          {/* {propertyLoader && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            className="loading pageLoader"
          />
            )} */}
          <Row>
            <Col className="propertySession-1 ">
              <AddressInfo />
            </Col>
            <Col className="propertySession-1 ">
              <OwnershipInfo />
            </Col>
          </Row>
          <Row>
            <Col className="propertySession-1 ">
              <HomeFacts />
            </Col>
            <Col className="propertySession-1-2">
              <Row className="propertySession-2">
                <Amenities />
              </Row>
              <Row className="propertySession-2-2">
                <Risks />
              </Row>
            </Col>
          </Row>
          <Row>
            <Col
              className="propertySession-1"
              style={{ backgroundColor: "#df6fbe15" }}
            >
              <ARV onClickCompsSale={handleClickCompsSale} />
            </Col>
            <Col
              className="propertySession-1"
              style={{ backgroundColor: "#f1fe0015" }}
            >
              <RentalEstimate onClickCompsRent={handleClickCompsRent} />
            </Col>
          </Row>
          <Row>
            <Col
              className="propertySession-1"
              style={{ backgroundColor: "#00fedc19" }}
            >
              <ShortTermRental onClickCompsSTR={handleClickCompsSTR} onClickSTRCount={handleClickSTRCount} />
            </Col>
          </Row>
          {(showCompsSale || showCompsRent || showCompsSTR) && (
            <Row>
              <Similarity
                compsSale={showCompsSale}
                compsRent={showCompsRent}
                compsSTR={showCompsSTR}
              />
            </Row>
          )}
        </div>
      )}
    </div>
  );
}

export default Property;
