import React, { useContext, useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  InputGroup,
  ButtonGroup,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { getAllProperties, getAllPropertiesByMLS } from "../lib/propertiesDB";
import { MAP_VIEWPORT, STARTING_MAP_ZOOM } from "../Map/MapUtils";
import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined";
import SearchIcon from "@mui/icons-material/Search";
import MapIcon from "@mui/icons-material/Map";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShowerOutlinedIcon from "@mui/icons-material/ShowerOutlined";
import NumbersIcon from "@mui/icons-material/Numbers";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DateRangeIcon from "@mui/icons-material/DateRange";
import SwitchSelector from "react-switch-selector";
import { numberWithCommas } from "../lib/utilityFunctions";
import {
  Slider,
  SliderFilledTrack,
  SliderTrack,
  SliderThumb,
} from "@chakra-ui/react";

function SearchBarN() {
  let navigate = useNavigate();
  const {
    setResult,
    openMoreFilters,
    setOpenMoreFilters,
    searchResults,
    setSearchResults,
    loading,
    setLoading,
    setPropertyResTab,
    setSpecialIndicatorsTab,
    loggedInUser,
    setViewport,
    setMapZoom,
  } = useContext(AppContext);

  const [address, setAddress] = useState("");
  const [bedroomsFilter, setBedroomsFilter] = useState("");
  const [bathroomsFilter, setBathroomsFilter] = useState("");
  const [homeTypeFilter, setHomeTypeFilter] = useState("%");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [MLS, setMLS] = useState("");
  const [range, setRange] = useState(500);
  const [addressSearch, setAddressSearch] = useState(false);
  const [mlsError, setMlsError] = useState(false);
  const [emptyField, setEmptyField] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (Object.keys(loggedInUser).length === 0) {
      navigate(`/login-signup`);
    } else {
      setEmptyField(false);
      setMlsError(false);
      setSearchResults([]);
      setPropertyResTab(0);
      setSpecialIndicatorsTab(0);
      navigate(`/search`);
      setViewport(MAP_VIEWPORT);
      setMapZoom(STARTING_MAP_ZOOM);
      if (addressSearch) {
        try {
          setLoading(true);
          const res = await getAllProperties(
            address,
            bedroomsFilter,
            bathroomsFilter,
            homeTypeFilter,
            area,
            price,
            year,
            range
          );
          console.log(res);
          setLoading(false);
          setSearchResults(res);
        } catch (error) {
          console.log(error);
        }
      } else {
        if (!MLS) {
          setEmptyField(true);
        } else {
          try {
            setLoading(true);
            const res = await getAllPropertiesByMLS(MLS);
            if (res) {
              console.log(res);
              res[ 0 ].source_id = 123456789;
              res[0].latitude = 29.63930300768748;
              res[0].longitude = -95.2304783311589;
              zoomToResult(res[0].latitude, res[0].longitude);
              setLoading(false);
              setResult(res);
              // setSearchResults(res);
            } else {
              setMlsError(true);
              setLoading(false);
              // setSearchResults([]);
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
  };

  function zoomToResult(lat,long) {
    const ZOOM = 12;
    setMapZoom(ZOOM);
    setViewport({
      latitude: lat,
      longitude: long,
      zoom: ZOOM,
    });
  }


  const options = [
    {
      label: "MLS Number",
      value: false,
      selectedBackgroundColor: "#6b46c1d2",
    },
    {
      label: "Address",
      value: true,
      selectedBackgroundColor: "#6b46c1d2",
    },
  ];

  function handleSwitch(value) {
    console.log(value);
    setMlsError(false);
    setAddressSearch(value);

  }

  return (
    <div
      className="searchBar"
      //   style={{ height: "20vh" }}
    >
      <Row>
        <Col className="d-flex align-items-center ">
          <span className="me-2" style={{fontSize:"18px"}}>Search by : </span>
          <div style={{ width: 300, height: 35 }}>
            <SwitchSelector
              onChange={handleSwitch}
              options={options}
              initialSelectedIndex={0}
              backgroundColor={"white"}
              fontColor={"#6b46c1"}
              fontSize={"12px"}
              border={"2px solid #6b46c1"}
            />
          </div>
          <div className="ms-2" style={{ textAlign: "left" }}>
            <Button
              className="py-1"
              onClick={handleSearch}
            >
              <SearchIcon />
              Search
            </Button>
          </div>
        </Col>
        {/* <Col xs={2}>
          <div className="text-end h5">
            <strong>
              <span className="purpleFont me-1">
                {searchResults ? searchResults.length : 0}
              </span>
            </strong>
            Results
          </div>
        </Col> */}
      </Row>
     
      {!addressSearch && (
        <Row style={{ textAlign: "left" }}>
          <div className="d-flex align-items-center mt-3">
            <NumbersIcon id="dropdownIcon" />
            <Form.Control
              style={{ width: "25%" }}
              type="text"
              placeholder="Enter a MLS number"
              onChange={(e) => {
                setMLS(e.target.value);
              }}
            />
            {mlsError && (
              <Alert
                variant="danger"
                className="py-1 ps-3 ms-3 mb-0 text-start"
              >
                Please try to search by address!
              </Alert>
            )}
            {emptyField && (
              <Alert
                variant="danger"
                className="py-1 ps-3 ms-3 mb-0 text-start"
              >
                Please enter a valid input!
              </Alert>
            )}
          </div>
        </Row>
      )}
      {addressSearch && (
        <>
          <Row>
            <Col className="text-start my-2 ms-1 p">
              Please fill up property information:
            </Col>
          </Row>
          <Row className="mb-3 w-75">
            <Col xs={5}>
              <div id="specificDropdown">
                <MapIcon id="dropdownIcon" />
                <Form.Control
                  value={address}
                  type="text"
                  placeholder="Enter an address"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>
            </Col>
            <Col xs={5}>
              <div id="specificDropdown">
                <Form.Label className="mb-0" sm="4" id="sliderLabel">
                  Range:
                </Form.Label>
                <Slider
                  defaultValue={range}
                  colorScheme="purple"
                  onChange={(val) => setRange(val)}
                  max={500}
                  step={1}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb index={0} className="rangeSliderThumb" />
                </Slider>
                <Form.Label className="ms-3 mb-0" sm="4" id="sliderLabel">
                  {numberWithCommas(range)} Miles
                </Form.Label>
              </div>
            </Col>
          </Row>
          <Row className="w-75">
            <Col>
              <div id="specificDropdown">
                <HomeOutlinedIcon id="dropdownIcon" />
                <Form.Select
                  size="sm"
                  value={homeTypeFilter}
                  onChange={(e) => setHomeTypeFilter(e.target.value)}
                  style={{
                    paddingTop: "6px",
                    paddingBottom: "6px",
                    fontSize: "12px",
                  }}
                >
                  <option id="optionName" value="%">
                    Home Type
                  </option>
                  <option value={"Houses/Single Family"}>
                    Houses/Single Family
                  </option>
                  <option value="Townhomes" disabled>
                    Townhomes
                  </option>
                  <option value="Multifamily" disabled>
                    Multi-family
                  </option>
                  <option value="Condo/Co-ops" disabled>
                    Condo/Co-ops
                  </option>
                  <option value="Apartments" disabled>
                    Apartments
                  </option>
                </Form.Select>
              </div>
            </Col>
            <Col>
              <div id="specificDropdown">
                <KingBedOutlinedIcon id="dropdownIcon" />
                <Form.Control
                  style={{
                    fontSize: "12px",
                  }}
                  value={bedroomsFilter}
                  type="number"
                  placeholder="Bedroom"
                  onChange={(e) => {
                    setBedroomsFilter(e.target.value);
                  }}
                />
              </div>
            </Col>
            <Col>
              <div id="specificDropdown">
                <ShowerOutlinedIcon id="dropdownIcon" />
                <Form.Control
                  style={{
                    fontSize: "12px",
                  }}
                  value={bathroomsFilter}
                  type="number"
                  placeholder="Bathroom"
                  onChange={(e) => {
                    setBathroomsFilter(e.target.value);
                  }}
                />
              </div>
            </Col>

            <Col>
              <div id="specificDropdown">
                <SquareFootIcon id="dropdownIcon" />
                <Form.Control
                  style={{
                    fontSize: "12px",
                  }}
                  value={area}
                  type="number"
                  placeholder="Square foot"
                  onChange={(e) => {
                    setArea(e.target.value);
                  }}
                />
              </div>
            </Col>
            <Col>
              <div id="specificDropdown">
                <AttachMoneyIcon id="dropdownIcon" />
                <Form.Control
                  style={{
                    fontSize: "12px",
                  }}
                  value={price}
                  type="number"
                  placeholder="Listing price"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
            </Col>
            <Col>
              <div id="specificDropdown">
                <DateRangeIcon id="dropdownIcon" />
                <Form.Control
                  style={{
                    fontSize: "12px",
                  }}
                  value={year}
                  type="number"
                  placeholder="Year built"
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                />
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default SearchBarN;