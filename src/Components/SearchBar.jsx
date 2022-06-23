import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, Heading } from "@chakra-ui/react";
import SearchIcon from "@mui/icons-material/Search";
import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined";
import ShowerOutlinedIcon from "@mui/icons-material/ShowerOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { getAllProperties } from "../lib/propertiesDB";
import { numberWithCommas } from "../lib/utilityFunctions";
import { FaRegClosedCaptioning } from "react-icons/fa";
import { MAP_VIEWPORT, STARTING_MAP_ZOOM } from "../Map/MapUtils";

const SearchBar = () => {
  let navigate = useNavigate();
  const {
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

  const [minPriceThumb, setMinPriceThumb] = useState(2500000);
  const [maxPriceThumb, setMaxPriceThumb] = useState(7500000);
  const [minSqftThumb, setMinSqftThumb] = useState(0);
  const [maxSqftThumb, setMaxSqftThumb] = useState(10000);
  const [bedroomsFilter, setBedroomsFilter] = useState(0);
  const [bathroomsFilter, setBathroomsFilter] = useState(0);
  const [homeTypeFilter, setHomeTypeFilter] = useState("%");
  const [ search, setSearch ] = useState(false);
  const [ addressSearch, setAddressSearch ] = useState(true);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (Object.keys(loggedInUser).length === 0) {
      navigate(`/login-signup`);
    } else {
      setLoading(true);
      setSearchResults([]);
      setPropertyResTab(0);
      setSpecialIndicatorsTab(0);
      navigate(`/search`);
      setViewport(MAP_VIEWPORT);
      setMapZoom(STARTING_MAP_ZOOM);

      const res = await getAllProperties(
        search,
        bedroomsFilter,
        bathroomsFilter,
        homeTypeFilter,
        minSqftThumb,
        maxSqftThumb,
        minPriceThumb,
        maxPriceThumb
      );
      console.log(res);
      setLoading(false);
      setSearchResults(res);
    }
  };

  const handleBedroomsFilterChange = (e) => setBedroomsFilter(e.target.value);
  const handleBathroomsFilterChange = (e) => setBathroomsFilter(e.target.value);
  const handleHomeTypeFilterChange = (e) => setHomeTypeFilter(e.target.value);
  const handlePriceThumbsChange = (valArray) => {
    setMinPriceThumb(valArray[0]);
    setMaxPriceThumb(valArray[1]);
  };

  const handleSqftThumbsChange = (valArray) => {
    setMinSqftThumb(valArray[0]);
    setMaxSqftThumb(valArray[1]);
  };

  // useEffect(()=> {

  // }, [openMoreFilters])


  return (
    <div className="searchBar" style={{ height: "20vh"}}>
      <Row>
        <Col  lg={10} >
          <Form >
            {/* <div id="inputAndButtons"> */}
            {/* <div id="searchInputDiv"> */}
            <Row>
              <Col>
                <InputGroup className="mb-3" id="searchInput">
                  <Form.Control
                    type="text"
                    placeholder="Enter an address, zip code, city."
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  <InputGroup.Text id="searchIcon" onClick={handleSearch}>
                    <SearchIcon />
                  </InputGroup.Text>
                </InputGroup>
              </Col>
            </Row>
            {/* </div> */}
            {/* <div id="searchbarButtons">
            {!openMoreFilters ? (
              <Link to="/filters/0">
                <Button
                  variant="outline-secondary"
                  onClick={() => setOpenMoreFilters(true)}
                  aria-controls="example-collapse-text"
                  aria-expanded={!openMoreFilters}
                >
                  Show filters
                </Button>
              </Link>
            ) : (
              <Link to={-1}>
                <Button
                  variant="outline-secondary"
                  onClick={() => setOpenMoreFilters(false)}
                  aria-controls="example-collapse-text"
                  aria-expanded={openMoreFilters}
                >
                  Hide filters
                </Button>
              </Link>
            )}{" "}
            <Button
              type="submit"
              onClick={(e) => handleSearch(e)}
              id="searchButton"
            >
              {loading && (
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              {!loading && <span>Search</span>}
            </Button>
          </div> */}
            {/* <Heading size="md" className="ms-auto">
            <span className="purpleFont">
              {searchResults ? searchResults.length : 0}
            </span>{" "}
            Results
          </Heading> */}
            {/* </div> */}
            {/* <div id="searchbarFilters"> */}
            {/* <div id="searchbarDropdowns"> */}
            <Row>
              <Col>
                <div id="specificDropdown">
                  <KingBedOutlinedIcon id="dropdownIcon" />

                  <Form.Select
                    size="sm"
                    value={bedroomsFilter}
                    onChange={(e) => handleBedroomsFilterChange(e)}
                  >
                    <option id="optionName" disabled>
                      Bedrooms
                    </option>

                    <option value={1}>1+ Bd</option>
                    <option value={2}>2+ Bd</option>
                    <option value={3}>3+ Bd</option>
                    <option value={4}>4+ Bd</option>
                    <option value={5}>5+ Bd</option>
                    <option value={0}>Any</option>
                  </Form.Select>
                </div>
              </Col>
              <Col>
                <div id="specificDropdown">
                  <ShowerOutlinedIcon id="dropdownIcon" />
                  <Form.Select
                    id="specificDropdown"
                    value={bathroomsFilter}
                    size="sm"
                    onChange={(e) => handleBathroomsFilterChange(e)}
                  >
                    <option id="optionName" disabled>
                      Bathrooms
                    </option>

                    <option value={1}>1+ Ba</option>
                    <option value={1.5}>1.5+ Ba</option>
                    <option value={2}>2+ Ba</option>
                    <option value={3}>3+ Ba</option>
                    <option value={4}>4+ Ba</option>
                    <option value={0}>Any</option>
                  </Form.Select>
                </div>
              </Col>
              <Col>
                <div id="specificDropdown">
                  <HomeOutlinedIcon id="dropdownIcon" />
                  <Form.Select
                    id="specificDropdown"
                    size="sm"
                    value={homeTypeFilter}
                    onChange={(e) => handleHomeTypeFilterChange(e)}
                  >
                    <option id="optionName" value="%">
                      All Home Type
                    </option>
                    <option value="Houses/Single Family">
                      Houses/Single Family
                    </option>
                    <option value="Townhomes">Townhomes</option>
                    <option value="'Multifamily'">Multi-family</option>
                    <option value="Condo/Co-ops">Condo/Co-ops</option>
                    <option value="Apartments">Apartments</option>
                  </Form.Select>
                </div>
              </Col>
              {/* </div> */}
              {/* <div id="searchbarSliders"> */}
              {/* <div id="specificSlider"> */}
              {/* <Form.Label column sm="4" id="sliderLabel">
                Square feet:
              </Form.Label>
              <RangeSlider
                aria-label={["min", "max"]}
                colorScheme="purple"
                defaultValue={[minSqftThumb, maxSqftThumb]}
                onChange={(val) => handleSqftThumbsChange(val)}
                min={0}
                max={10000}
                step={10}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} className="rangeSliderThumb" />
                <RangeSliderThumb index={1} className="rangeSliderThumb" />
              </RangeSlider>
              <span id="slidersValues">
                {numberWithCommas(minSqftThumb)} -{" "}
                {numberWithCommas(maxSqftThumb)}
              </span> */}
              {/* </div> */}

              {/* <div id="specificSlider"> */}
              {/* <Form.Label column sm="4" id="sliderLabel">
              Price:
            </Form.Label>
            <RangeSlider
              aria-label={["min", "max"]}
              colorScheme="purple"
              defaultValue={[2500000, 7500000]}
              onChange={(val) => handlePriceThumbsChange(val)}
              min={10000}
              max={10000000}
              step={10000}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
            <span id="slidersValues">
              ${numberWithCommas(minPriceThumb)} - $
              {numberWithCommas(maxPriceThumb)}
            </span> */}
              {/* </div> */}
            </Row>
            {/* </div> */}
            {/* </div> */}
          </Form>
        </Col>
        <Col lg={2}>
        <div className=" text-end h5" >
          {/* <strong> */}
          {/* <Heading size="md" className="ms-auto"> */}
          <span className="purpleFont me-1">
            {searchResults ? searchResults.length : 0}
          </span>
          Results
          {/* </strong> */}
          {/* </Heading> */}
        </div>
        
        </Col>
      </Row>
    </div>
  );
};

export default SearchBar;
