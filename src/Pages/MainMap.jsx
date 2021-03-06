import React, { useState, useEffect, useContext, useCallback } from "react";
import Map, {
  Marker,
  Source,
  Layer,
  Popup,
  NavigationControl,
} from "react-map-gl";
import {
  createPolygonsCollection,
  createClusters,
  checkExist,
} from "../Map/MapUtils";
import RoomIcon from "@mui/icons-material/Room";
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "../Map/layers";
import { dataLayer } from "../Map/map-styles.ts";
import { AppContext } from "../Context/AppContext";
import { getPolygons } from "../lib/propertiesDB";
import PopupCard from "../Map/PopupCard";
import Pin from "../Images/pin.png";
import Heat from "../Images/heat.png";
import PinSelected from "../Images/pinSelected.png";
import FiltersDrawer from "../Map/FiltersDrawer";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ParkIcon from "@mui/icons-material/Park";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import TocIcon from "@mui/icons-material/Toc";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import PushPinIcon from "@mui/icons-material/PushPin";
import {
  Bars,
  Malls,
  Museums,
  Parks,
  Restaurants,
  SuperMarkets,
} from "../Map/YelpData";
import mapboxgl from "mapbox-gl";
import PopupCardN from "../Map/PopupCardN";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass =  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

export default function MainMap() {
  const ShiftViewClusterMarkers = 12;
  //   const [selectedPin, setSelectedPin] = useState();
  const [clusters, setClusters] = useState([]);
  const [polygons, setPolygons] = useState([]);
  const [showBars, setShowBars] = useState(false);
  const [showMalls, setShowMalls] = useState(false);
  const [showMuseums, setShowMuseums] = useState(false);
  const [showParks, setShowParks] = useState(false);
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [showSuperMarkets, setShowSuperMarkets] = useState(false);
  const [showMapDrawer, setShowMapDrawer] = useState(false);

  const {
    result,
    popupId,setPopupId,
    compsPins,
    showCompsSale,
    showCompsRent,
    showCompsSTR,
    viewport,
    setViewport,
    searchResults,
    selectedId,
    setSelectedId,
    showPolygons,
    mapZoom,
    setMapZoom,
  } = useContext(AppContext);

  const [hoverInfo, setHoverInfo] = useState(null);
  

  let pinStyle = {
    fontSize: viewport.zoom * 1.5,
    cursor: "pointer",
  };

  if (showCompsSale) {
    pinStyle.color = "#df6fbe";
  } else if (showCompsRent) {
    pinStyle.color = "#fea900f8";
  } else {
    pinStyle.color = "#0fa893";
  }

  useEffect(() => {
    getPolygons().then((res) => {
      const collection = createPolygonsCollection(res);
      setPolygons(collection);
      console.log(collection);
    });
  }, []);

  useEffect(() => {
    createClusters(searchResults).then((res) => setClusters(res));
  }, [searchResults]);

  const onHover = useCallback((event) => {
    const {
      features,
      point: { x, y },
    } = event;
    const hoveredFeature = features && features[0];
    setHoverInfo(hoveredFeature && { feature: hoveredFeature, x, y });
    // console.log(hoveredFeature && { feature: hoveredFeature, x, y });
  }, []);

  function handleMarkerClick(id) {
    setPopupId(id);
    
    // setViewport({ ...viewport, latitude: lat, longitude: long });
  }

  return (
    <>
      <div id="mainMap">
        <Map
          {...viewport}
          onMove={(evt) => {
            setViewport(evt.viewState);
            //to check errors in map movement
            //   console.log(evt.viewState);
          }}
          onZoom={(e) => {
            setMapZoom(e.viewState.zoom);
          }}
          mapStyle="mapbox://styles/mapbox/streets-v8"
          style={{ width: "100%", height: "500px" }}
          mapboxAccessToken={
            "pk.eyJ1IjoiYW1pcmI0IiwiYSI6ImNremU2aTNoYjJnMTAyb245dmFuOXd5c3gifQ.Glo-CqkxReedraWEdN-W3g"
          }
          interactiveLayerIds={showPolygons ? ["data"] : null}
          onMouseMove={showPolygons ? onHover : null}
          onMouseLeave={(e) => setHoverInfo(null)}
          transitionDuration="1000"
        >
          {mapZoom && result && (
            <>
              <Marker
                longitude={checkExist(result.info.longitude)}
                latitude={checkExist(result.info.latitude)}
                // clickTolerance={1}
              >
                <RoomIcon
                  style={{
                    fontSize: viewport.zoom * 3,
                    color: "red",
                    cursor: "pointer",
                  }}
                  onClick={() => handleMarkerClick(result.info.source_id)}
                />
              </Marker>
              {result.info.source_id === popupId && (
                <Popup
                  longitude={result.info.longitude}
                  latitude={result.info.latitude}
                  tipSize={30}
                  anchor="left"
                  closeButton={true}
                  closeOnClick={true}
                  offset={10}
                  onClose={() => {
                    setPopupId(null);
                  }}
                >
                  {/* <PopupCard pin={pin} /> */}
                  <PopupCardN pin={result.info} />
                </Popup>
              )}
            </>
          )}
          {mapZoom && compsPins && (
            <div>
              {compsPins.map((pin) => {
                return (
                  <div key={pin.source_id}>
                    <Marker
                      longitude={checkExist(pin.longitude)}
                      latitude={checkExist(pin.latitude)}
                      // clickTolerance={1}
                    >
                      <CircleTwoToneIcon
                        style={pinStyle}
                        onClick={() => {
                          handleMarkerClick(pin.source_id);
                        }}
                      />
                    </Marker>

                    {pin.source_id === popupId && (
                      <Popup
                        longitude={checkExist(pin.longitude)}
                        latitude={checkExist(pin.latitude)}
                        tipSize={30}
                        anchor="left"
                        closeButton={true}
                        closeOnClick={true}
                        offset={10}
                        onClose={() => {
                          setPopupId(null);
                        }}
                      >
                        {/* <PopupCard pin={pin} /> */}
                        <PopupCardN pin={pin} />
                      </Popup>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          {showPolygons && (
            <Source type="geojson" data={polygons}>
              <Layer {...dataLayer} />
            </Source>
          )}
          {mapZoom <= ShiftViewClusterMarkers && (
            <Source
              id="apartments"
              type="geojson"
              data={clusters}
              cluster={true}
              // clusterMaxZoom={ShiftViewClusterMarkers}
              clusterRadius={50}
            >
              <Layer {...clusterLayer} />
              <Layer {...clusterCountLayer} />
              <Layer {...unclusteredPointLayer} />
            </Source>
          )}

          {/* {hoverInfo && (
          <div className="" style={{ left: hoverInfo.x, top: hoverInfo.y }}>
            <div>{hoverInfo.feature.properties.snbname} </div>
          </div>
        )} */}
          {showBars &&
            Bars.map((pin, i) => {
              return (
                <Marker
                  key={i}
                  longitude={checkExist(pin.longitudes)}
                  latitude={checkExist(pin.latitudes)}
                  clickTolerance={1}
                >
                  <LocalBarIcon
                    alt="Bars"
                    style={{ height: viewport.zoom * 2 }}
                  />
                </Marker>
              );
            })}
          {showMalls &&
            Malls.map((pin, i) => {
              return (
                <Marker
                  key={i}
                  longitude={checkExist(pin.longitudes)}
                  latitude={checkExist(pin.latitudes)}
                  clickTolerance={1}
                >
                  <LocalMallIcon
                    alt="Malls"
                    style={{ height: viewport.zoom * 2 }}
                  />
                </Marker>
              );
            })}
          {showMuseums &&
            Museums.map((pin, i) => {
              return (
                <Marker
                  key={i}
                  longitude={checkExist(pin.longitudes)}
                  latitude={checkExist(pin.latitudes)}
                  clickTolerance={1}
                >
                  <AccountBalanceIcon
                    alt="Museums"
                    style={{ height: viewport.zoom * 2 }}
                  />
                </Marker>
              );
            })}
          {showParks &&
            Parks.map((pin, i) => {
              return (
                <Marker
                  key={i}
                  longitude={checkExist(pin.longitudes)}
                  latitude={checkExist(pin.latitudes)}
                  clickTolerance={1}
                >
                  <ParkIcon
                    alt="Parks"
                    style={{ height: viewport.zoom * 2, color: "green" }}
                  />
                </Marker>
              );
            })}
          {showRestaurants &&
            Restaurants.map((pin, i) => {
              return (
                <Marker
                  key={i}
                  longitude={checkExist(pin.longitudes)}
                  latitude={checkExist(pin.latitudes)}
                  clickTolerance={1}
                >
                  <RestaurantMenuIcon
                    alt="Restaurant"
                    style={{ height: viewport.zoom * 2 }}
                  />
                </Marker>
              );
            })}
          {showSuperMarkets &&
            SuperMarkets.map((pin, i) => {
              return (
                <Marker
                  key={i}
                  longitude={checkExist(pin.longitudes)}
                  latitude={checkExist(pin.latitudes)}
                  clickTolerance={1}
                >
                  <LocalGroceryStoreIcon
                    alt="SuperMarkets"
                    style={{ height: viewport.zoom * 2 }}
                  />
                </Marker>
              );
            })}
          <NavigationControl />
        </Map>
        {/* <div className="d-flex justify-content-between">
          <div onClick={(e) => setShowMapDrawer(true)}>
            <TocIcon id="filterIcon" fontSize="inherit" />
            <span>Filters</span>
          </div>
          {hoverInfo && showPolygons && (
            <div className="" style={{ left: hoverInfo.x, top: hoverInfo.y }}>
              <div>{hoverInfo.feature.properties.snbname} </div>
            </div>
          )}
          <div>
            {showPolygons && (
              <span className="d-flex flex-row align-items-center">
                Less <img src={Heat} alt="heatmap colors" className="mapHeat" />{" "}
                More
              </span>
            )}
          </div>
        </div>
        <FiltersDrawer
          showMapDrawer={showMapDrawer}
          setShowMapDrawer={setShowMapDrawer}
          showBars={showBars}
          setShowBars={setShowBars}
          showMalls={showMalls}
          setShowMalls={setShowMalls}
          showMuseums={showMuseums}
          setShowMuseums={setShowMuseums}
          showParks={showParks}
          setShowParks={setShowParks}
          showRestaurants={showRestaurants}
          setShowRestaurants={setShowRestaurants}
          showSuperMarkets={showSuperMarkets}
          setShowSuperMarkets={setShowSuperMarkets}
        />*/}
      </div>
    </>
  );
}
