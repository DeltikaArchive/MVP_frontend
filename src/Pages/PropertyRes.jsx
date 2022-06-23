import React, { useState, useContext, useEffect } from "react";
import { getPropertyById, getPropertyByOwner } from "../lib/propertiesDB";
import { AppContext } from "../Context/AppContext";
import { Heading, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import PropertyInfo from "../Components/PropertyRes/PropertyInfo";
import SpecialIndicators from "../Components/PropertyRes/SpecialIndicators";
import CompsSale from "../Components/PropertyRes/CompsSale";
import CompsRent from "../Components/PropertyRes/CompsRent";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PropertyImgNotAvailable from "../Images/PropertyImgNotAvailable.png";
import { countOwnersProperties } from "../lib/utilityFunctions";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { Spinner } from "@chakra-ui/react";

export default function PropertyRes() {
  let navigate = useNavigate();
  const {
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

  return (
    <div>
      {propertyLoader && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          className="loading pageLoader"
        />
      )}
      {selectedId && (
        <div
          className="d-flex flex-column "
          style={{ border: "1px solid red" }}
        >
          <div
            onClick={() => handleBack()}
            className="nav-link align-self-start"
            id="goBack"
          >
            <ArrowBackIcon /> Back
          </div>
          <div className=" d-flex flex-row mb-2 mt-0">
            <div className="d-flex flex-row border w-50 p-3  me-1">
              <img
                src={PropertyImgNotAvailable}
                width="140px"
                alt={"property"}
                className=""
              />
              <div className=" propertyResContainer mx-2 ">
                <div className="propertyResHeader">
                  {selectedProperty && selectedProperty.property_name}
                </div>
                <div className="propertyResAddress">
                  {selectedProperty && selectedProperty.address},
                </div>
                <div className="propertyResAddress">
                  {selectedProperty &&
                    selectedProperty.city + ", " + selectedProperty &&
                    selectedProperty.state + " " + selectedProperty &&
                    selectedProperty.zipcode}
                </div>
                <div className="container propertyResGrid">
                  <div className="row propertyResGridTop">
                    <div className="col">
                      {selectedProperty && selectedProperty.zoning}
                    </div>
                    <div className="col"></div>
                    <div className="col"></div>
                  </div>
                  <div className="row propertyResGridBottom">
                    <div className="col">Zoning</div>
                    <div className="col">APN</div>
                    <div className="col">Status</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column border w-50 p-3 ms-1">
              <Heading size="md" className="mb-1">
                Ownership information:
              </Heading>
              <div className="d-flex flex-row justify-content-between">
                <div>Entity Name:</div>
                <div>{}</div>
              </div>
              <div className="d-flex flex-row justify-content-between">
                <div>True Owner:</div>
                <div></div>
              </div>
              <div className="d-flex flex-row justify-content-between">
                <div>Number of properties:</div>
                {/* <div>{countOwnersProperties(selectedProperty.owner, keepOriginalResults)}</div> */}
              </div>
              {selectedProperty && selectedProperty.owner ? (
                <div
                  className="align-self-end nav-link pointy"
                  id="CheckOwner"
                  onClick={() => handleSeeOwner()}
                >
                  See owner's properties
                </div>
              ) : (
                <div className="align-self-end nav-link" id="CheckOwner">
                  {" "}
                </div>
              )}
            </div>
          </div>

          <Tabs
            index={propertyResTab}
            onChange={(index) => {
              setPropertyResTab(index);
            }}
          >
            <TabList className="d-flex justify-content-center">
              <Tab>Property Info</Tab>
              <Tab isDisabled>Comps Sale</Tab>
              <Tab>Comps Rent</Tab>
              <Tab>Special Indicators</Tab>
            </TabList>

            <TabPanels>
              <TabPanel className="tabPanel">
                <PropertyInfo />
              </TabPanel>
              <TabPanel className="tabPanel">
                <CompsSale />
              </TabPanel>
              <TabPanel className="tabPanel">
                <CompsRent />
              </TabPanel>
              <TabPanel className="tabPanel">
                <SpecialIndicators />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      )}
      {!selectedId && (
        <div className="fixWidth800">
          An error occurred, Please go back and try again
        </div>
      )}
    </div>
  );
}
