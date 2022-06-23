import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppContext } from "./Context/AppContext";
import { ChakraProvider } from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./Pages/Home";
import "mapbox-gl/dist/mapbox-gl.css";
import PropertyRes from "./Pages/PropertyRes";
import SearchResults from "./Components/SearchResults";
import MapPage from "./Pages/MapPage";
import Welcome from "./Components/LoginAndSignup/Welcome";
import ForgotPassword from "./Components/LoginAndSignup/ForgotPassword";
import Filters from "./Components/Filters";
import SavedFiltersList from "./Components/SavedFiltersList";
import { getAllProperties } from "./lib/propertiesDB";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import { v4 as uuidv4 } from "uuid";
import { MAP_VIEWPORT, STARTING_MAP_ZOOM } from "./Map/MapUtils";
import Macro from "./Pages/Macro";
import axios from "axios";
import { URLrequests } from "./config";
import Property from "./Pages/Property";
import MainNavbar from "./Components/MainNavbar";

function App() {
   const [showCompsSale, setShowCompsSale] = useState(false);
   const [showCompsRent, setShowCompsRent] = useState(false);
   const [showCompsSTR, setShowCompsSTR] = useState(false);
  const [compsPins, setCompsPins ] = useState();
  const [result, setResult] = useState('')
  const [loggedInUser, setLoggedInUser] = useState({});
  const [checkedFilters, setCheckedFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [propertyLoader, setPropertyLoader] = useState(false);
  const [openMoreFilters, setOpenMoreFilters] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [keepOriginalResults, setKeepOriginalResults] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [selectedProperty, setSelectedProperty] = useState({});
  const [showPolygons, setShowPolygons] = useState(false);
  const [showCrimes, setShowCrimes] = useState(false);
  const [mapZoom, setMapZoom] = useState(STARTING_MAP_ZOOM);
  const [viewport, setViewport] = useState(MAP_VIEWPORT);

  const [propertyResTab, setPropertyResTab] = useState(0);
  const [specialIndicatorsTab, setSpecialIndicatorsTab] = useState(0);
  const [loansExtraData, setLoansExtraData] = useState([]);
  const [arrayOfFilters, setArrayOfFilters] = useState([
    {
      route: 0,
      title: "CLEARED FORM",
      violations: false,
      codeEnforcement: false,
      failedInspections: false,
      mandatoryRepairs: false,
      liens: false,
      vacant: false,
      watchlist: false,
      nod: false,
      highLeverage: false,
      highRate: false,
      debtForeclosure: false,
      maturityInTime: false,
      reo: false,
      secondOrThird: false,
      sixtyDaysDQ: false,
      extensionOrModified: false,
      prePenalty: false,
      bmrUnits: false,
      mixUse: false,
      condoMap: false,
      shortTermAllowed: false,
      acceptSec8: false,
      rentControlExempted: false,
      affordabilityRest: false,
      thirdPartyAgreements: false,
      listingChangePending: false,
      listingPriceChange: false,
      listingChangeExpired: false,
      listingChangeActive: false,
      listingWithdraw: false,
      timeInMarket: false,
      transactions: false,
      exchange1031: false,
      pastSalesInfoforeclosure: false,
      noiDrop: false,
      review: false,
      shortTermRentalArbitrage: false,
      otherIncomeCharges: false,
      ratioUtilityBilling: false,
      concession: false,
      eviction: false,
      highestTurnOver: false,
      propertyManagementPopularity: false,
      devUnderReview: false,
      devPermitExpired: false,
      devNotStarted: false,
      devOnMarket: false,
      devLoanExp: false,
      underCons: false,
      underDev: false,
      highLikelihoodToBeSold: false,
    },
  ]);

  //loads starting search results - if removed search by owner won't work!
  useEffect(() => {
    getAllProperties().then((res) => {
      setSearchResults(res);
      setKeepOriginalResults(res);
      setLoading(false);
    });
  }, []);

  //reconnect user in case refresh
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoggedInUser(user);
        handleFiltersGET(user);
      }
    });
  }, []);

  const handleFiltersGET = async (user) => {
    console.log("HOORAY! WE GOT TO handleFiltersGET");
    console.log(user.uid);
    await axios({
      method: "get",
      url: `${URLrequests}/users/filters_saves/${user.uid}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      mode: "no-cors",
    })
      .then((response) => {
        console.log("Status: ", response.status);
        console.log("Data: ", JSON.parse(response.data[0]["filters_saves"]));
        let currentUsersFilters = JSON.parse(response.data[0]["filters_saves"]);
        if (response.data[0]["filters_saves"] !== null) {
          for (let i = 0; i < currentUsersFilters.length; i++) {
            setArrayOfFilters([...arrayOfFilters, currentUsersFilters[i]]);
          }
        }
        console.log(arrayOfFilters);
      })
      .catch((error) => {
        console.error("Oh no!", error);
      });
  };

  return (
    <AppContext.Provider
      value={{
        result, setResult,
        loggedInUser,
        setLoggedInUser,
        openMoreFilters,
        setOpenMoreFilters,
        compsPins,
        setCompsPins,
        showCompsSale,
        setShowCompsSale,
        showCompsRent,
        setShowCompsRent,
        showCompsSTR,
        setShowCompsSTR,
        searchResults,
        setSearchResults,
        selectedId,
        setSelectedId,
        selectedProperty,
        setSelectedProperty,
        showPolygons,
        setShowPolygons,
        showCrimes,
        setShowCrimes,
        loading,
        setLoading,
        propertyResTab,
        setPropertyResTab,
        specialIndicatorsTab,
        setSpecialIndicatorsTab,
        keepOriginalResults,
        setKeepOriginalResults,
        arrayOfFilters,
        setArrayOfFilters,
        viewport,
        setViewport,
        mapZoom,
        setMapZoom,
        loansExtraData,
        setLoansExtraData,
        handleFiltersGET,
        propertyLoader,
        setPropertyLoader,
        setCheckedFilters,
        checkedFilters,
      }}
    >
      <ChakraProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/login-signup" element={<Welcome />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/" element={<Home />}>
                <Route
                  key={uuidv4()}
                  path={`/filters/0`}
                  element={<Filters filters={arrayOfFilters[0]} />}
                />
                {arrayOfFilters.map((element) => {
                  return (
                    <Route
                      key={uuidv4()}
                      path={`/filters/${element.route}`}
                      element={<Filters filters={element} />}
                    />
                  );
                })}
                <Route path="/" element={<SavedFiltersList />} />
                <Route path="/search" element={<Property />} />
                {/* <Route path="/property" element={<PropertyRes />} /> */}
                {/* <Route path="/property" element={<Property />} /> */}
              </Route>
              <Route path="/macro" element={<Macro />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ChakraProvider>
    </AppContext.Provider>
  );
}

export default App;
