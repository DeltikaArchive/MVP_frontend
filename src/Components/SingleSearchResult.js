import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Heading } from "@chakra-ui/react";

const SingleSearchResult = (props) => {
  let navigate = useNavigate();
  const { singleSearchResult } = props;
  const { setSelectedId, setViewport, setMapZoom } = useContext(AppContext);
  
  
  const handleSelectedProperty = (e) => {
    setSelectedId(singleSearchResult.prop_id);
    console.log("SET SELECTED", singleSearchResult.prop_id);
    localStorage.setItem("propId", singleSearchResult.prop_id);
    navigate(`/property`);
  };

  const zoomToMarker = () => {
    const ZOOM = 14;
    setSelectedId(singleSearchResult.prop_id);
    if (singleSearchResult.latitude !== undefined && singleSearchResult.longitude !== undefined) {
      setMapZoom(ZOOM);
      setViewport({
        latitude: singleSearchResult.latitude,
        longitude: singleSearchResult.longitude,
        zoom: ZOOM,
      });
    }
  };

  const MATCHRATE = singleSearchResult.lot_size / 10 + 80;

  return (
    <div id="listOfSearchResults" onClick={() => zoomToMarker()} className="fixWidth800">
      <div className="wrapper">
        <ul className="card-grid">
          <div id="singleMockResult" className="mb-2 p-2">
            <div id="singleMockResultBody">
              <div id="singleResultTextLeft">
                <div id="singleResultAddress">
                  <div>{singleSearchResult && singleSearchResult.property_name},</div>
                  <div className="singleResultAddress">
                    {singleSearchResult.address},{singleSearchResult.city}, {singleSearchResult.state}{" "}
                    {singleSearchResult.zipcode}
                  </div>
                </div>
              </div>

              <div className="">
                <Heading size="sm" className="my-1">
                  Match Rate: {Math.round(MATCHRATE > 100 ? 100 : MATCHRATE, 0)}%
                </Heading>
                <div id="propertyAvailability" className="singleResultAddress">
                  <span onClick={(e) => handleSelectedProperty(e)}>
                    See more info <PlayArrowIcon style={{ margin: 0, padding: 0 }} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default SingleSearchResult;
