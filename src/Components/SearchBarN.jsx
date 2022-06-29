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
import { Slider } from "@mui/material";
// import {
//   Slider,
//   SliderFilledTrack,
//   SliderTrack,
//   SliderThumb,
// } from "@chakra-ui/react";

function SearchBarN() {
  let navigate = useNavigate();
  const {
    setResult,
    setPopupId,
    setCompsPins,
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

  const [validated, setValidated] = useState(false);
  const [address, setAddress] = useState("");
  const [bedroomsFilter, setBedroomsFilter] = useState("");
  const [bathroomsFilter, setBathroomsFilter] = useState("");
  const [homeTypeFilter, setHomeTypeFilter] = useState("%");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [MLS, setMLS] = useState("");
  const [range, setRange] = useState(30);
  const [addressSearch, setAddressSearch] = useState(false);
  const [mlsError, setMlsError] = useState(false);
  const [emptyField, setEmptyField] = useState(false);

  async function handleAddressSearch(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      setValidated(true);
      if (Object.keys(loggedInUser).length === 0) {
        navigate(`/login-signup`);
      } else {
        setLoading(true);
        setResult("");
        setPopupId(null);
        setCompsPins();
        setEmptyField(false);
        setMlsError(false);
        setSearchResults([]);
        setPropertyResTab(0);
        setSpecialIndicatorsTab(0);
        navigate(`/search`);
        setViewport(MAP_VIEWPORT);
        setMapZoom(STARTING_MAP_ZOOM);
        try {
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
          setLoading(false);
        }
      }
    }
  }
  
  async function handleMLSSearch (e) {
     e.preventDefault();
    if (Object.keys(loggedInUser).length === 0) {
      navigate(`/login-signup`);
    } else {
      setLoading(true);
      setResult("");
      setPopupId(null);
      setCompsPins();
      setEmptyField(false);
      setMlsError(false);
      setSearchResults([]);
      setPropertyResTab(0);
      setSpecialIndicatorsTab(0);
      navigate(`/search`);
      setViewport(MAP_VIEWPORT);
      setMapZoom(STARTING_MAP_ZOOM);

      if (!MLS) {
        setResult("");
        setEmptyField(true);
        setLoading(false);
      } else {
        try {
          setLoading(true);
          const res = await getAllPropertiesByMLS(MLS);
          if (res) {
            console.log(res);
            res[0].source_id = res[0].MLS_Number;
            zoomToResult(res[0].latitude, res[0].longitude);
            setLoading(false);
            setResult(res);
          } else {
            setMlsError(true);
            setResult("");
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    }
  };

  function zoomToResult(lat, long) {
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
      selectedBackgroundColor: "#6b46c1",
    },
    {
      label: "Address",
      value: true,
      selectedBackgroundColor: "#6b46c1",
    },
  ];

  function handleSwitch(value) {
    setMlsError(false);
    setEmptyField(false)
    setAddressSearch(value);
    setValidated(false);
  }

  return (
    <div
      className="searchBar"
      //   style={{ height: "20vh" }}
    >
      <Row>
        <Col className="d-flex align-items-center ">
          <span className="me-2" style={{ fontSize: "18px" }}>
            Search by :{" "}
          </span>
          <div style={{ width: 250, height: 38 }}>
            <SwitchSelector
              onChange={handleSwitch}
              options={options}
              initialSelectedIndex={0}
              fontColor={"#6b46c1"}
              fontSize={14}
              selectionIndicatorMargin={4}
              backgroundColor={"#f8f9fa"}
            />
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
            <InputGroup
              className=" d-flex align-items-center"
              style={{ width: "360px" }}
            >
              <NumbersIcon id="dropdownIcon" />
              <Form.Control
                value={MLS}
                type="text"
                placeholder="Enter a MLS number"
                onChange={(e) => {
                  setMlsError(false);
                  setEmptyField(false);
                  setMLS(e.target.value);
                }}
              />
              <Button
                // variant="outline-secondary"
                id="button-addon2"
                onClick={handleMLSSearch}
              >
                <SearchIcon />
              </Button>
            </InputGroup>
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
          <Form noValidate validated={validated}>
            <Row className="mb-3 w-75">
              <Col xs={5}>
                <InputGroup className=" d-flex align-items-center">
                  <MapIcon id="dropdownIcon" />
                  <Form.Control
                    required
                    min={0}
                    max={100}
                    step={1}
                    value={address}
                    type="text"
                    placeholder="Enter an address"
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />{" "}
                  <Button
                    // type="submit"
                    // variant="outline-secondary"
                    id="button-addon2"
                    onClick={handleAddressSearch}
                  >
                    <SearchIcon />
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    {/* Please provide a valid address. */}
                  </Form.Control.Feedback>
                </InputGroup>
              </Col>
              <Col xs={5}>
                <div id="specificDropdown">
                  <Form.Label className="mb-0" sm="4" id="sliderLabel">
                    Range:
                  </Form.Label>
                  <Slider
                    aria-label="Temperature"
                    defaultValue={200}
                    value={range}
                    // getAriaValueText={valuetext}
                    style={{ color: "#6b47c1" }}
                    onChange={(e) => setRange(e.target.value)}
                  />
                  {/* <Slider
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
                  </Slider> */}
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
                    required
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
                    required
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
                <Form.Control.Feedback type="invalid">
                  Please enter a bedroom number.
                </Form.Control.Feedback>
              </Col>
              <Col>
                <div id="specificDropdown">
                  <ShowerOutlinedIcon id="dropdownIcon" />
                  <Form.Control
                    required
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
                <Form.Control.Feedback type="invalid">
                  Please enter a bathroom number.
                </Form.Control.Feedback>
              </Col>

              <Col>
                <div id="specificDropdown">
                  <SquareFootIcon id="dropdownIcon" />
                  <Form.Control
                    required
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
                <Form.Control.Feedback type="invalid">
                  Please enter a valid number.
                </Form.Control.Feedback>
              </Col>
              <Col>
                <div id="specificDropdown">
                  <AttachMoneyIcon id="dropdownIcon" />
                  <Form.Control
                    required
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
                <Form.Control.Feedback type="invalid">
                  Please enter the price.
                </Form.Control.Feedback>
              </Col>
              <Col>
                <div id="specificDropdown">
                  <DateRangeIcon id="dropdownIcon" />
                  <Form.Control
                    required
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
                <Form.Control.Feedback type="invalid">
                  Please enter a valid year.
                </Form.Control.Feedback>
              </Col>
            </Row>
          </Form>
        </>
      )}
    </div>
  );
}

export default SearchBarN;
