import React, { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, Checkbox, Heading } from "@chakra-ui/react";
import PropertyImgNotAvailable from "../../Images/PropertyImgNotAvailable.png";
import { AppContext } from "../../Context/AppContext";
import { checkDataExist } from "../../lib/utilityFunctions";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function PanelAmenitiesTable() {
  const { searchResults, setSearchResults, selectedProperty } = useContext(AppContext);
  const [maxAmenitiesRows, setMaxAmenitiesRows] = useState(5);
  const [tableMarker, setTableMarker] = useState(0);
  const [tableAmenities, setTableAmenities] = useState(TABLE_MOCK_DATA);
  const [safe, setSafe] = useState([]);

  const tableColumns = 4;
  const searchResultsOrigin = [...searchResults];
  useEffect(() => {
    setSafe(searchResults);
  }, [selectedProperty]);

  const handleMoreAmenities = () => {
    if (maxAmenitiesRows < 20) {
      maxAmenitiesRows * 2 < tableAmenities.length
        ? setMaxAmenitiesRows((prev) => prev * 2)
        : setMaxAmenitiesRows(tableAmenities.length);
    } else {
      maxAmenitiesRows + 20 < tableAmenities.length
        ? setMaxAmenitiesRows((prev) => prev + 20)
        : setMaxAmenitiesRows(tableAmenities.length);
    }
  };
  const handleTableLeft = () => {
    if (tableMarker > 0) setTableMarker((prev) => prev - 1);
  };
  const handleTableRight = () => {
    if (tableMarker + tableColumns < SIMILARITY_TABLE_DATA.length) setTableMarker((prev) => prev + 1);
  };
  const updateAmenityCheckbox = (index) => {
    let update = [...tableAmenities];
    update[index].show_on_map = !update[index].show_on_map;
    setTableAmenities([...update]);
    if (checkSwitches(update)) {
      //one of the checkbox is checked
      const filteredRes = filterMapByAmenities(update);
      setSearchResults(filteredRes);
      console.log(filteredRes);
    } else {
      //all false show all properties
      console.log("return original");
      console.log(safe);
      setSearchResults(safe);
    }
  };

  const checkSwitches = (updatedAmenities) => {
    let test = false;
    for (const amenity of updatedAmenities) {
      if (amenity.show_on_map === true) {
        test = true;
        break;
      }
    }
    return test;
  };
  const filterMapByAmenities = (updatedAmenities, fullSearchResults) => {
    let resUpdate = [...fullSearchResults];
    for (const amenity of updatedAmenities) {
      const name = amenity.name;
      if (amenity.show_on_map === true) {
        // AFTER ADDING THE PROPERTIES AMENITIES
        // const newArray = resUpdate.filter((property) => property[name] === true);
        // resUpdate = [newArray];
        for (let i = 0; i < resUpdate.length; i++) {
          if (resUpdate[i].year_built !== 2018) {
            resUpdate.splice(i, 1);
            i--;
          }
        }
      }
    }
    return resUpdate;
  };

  return (
    <>
      <div className="d-flex flex-column">
        <Heading size="md" className="my-3 align-self-start">
          Property amenities and recommendations
        </Heading>
        <Table variant="simple" id="amenitiesTable" className="">
          <Thead>
            <Tr id="columnsHeaders">
              <Th>Show on map</Th>
              <Th>Name</Th>
              <Th>Market Supply</Th>
              <Th>Is Included?</Th>
              <Th>Market Demand</Th>
              <Th>Charges fee</Th>
              <Th>Estimated rental contribution</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableAmenities.map((amenity, i) => {
              if (i < maxAmenitiesRows)
                return (
                  <Tr key={uuidv4()} className="tableRow">
                    <Td className="tableCheckbox centerIt">
                      <Checkbox
                        className="tableCheckboxBody centerIt"
                        colorScheme="purple"
                        isChecked={amenity.show_on_map}
                        onChange={() => {
                          updateAmenityCheckbox(i);
                        }}
                      />
                    </Td>
                    <Td className="centerIt">{amenity.name}</Td>
                    <Td className="centerIt">{amenity.market_supply}%</Td>
                    <Td>
                      <div className="yesOrNo mx-auto" id={amenity.is_included === "no" ? "no" : "yes"}>
                        {amenity.is_included === "yes" ? "Y" : "N"}
                      </div>
                    </Td>
                    <Td className="centerIt" id={amenity.market_demand > 19 ? "good" : "bad"}>
                      {amenity.market_demand}%
                    </Td>
                    <Td className="centerIt">{amenity.charges_fee}</Td>
                    <Td>
                      <div className="EsRentalCon" style={{ width: amenity.estimated_rental_contribution / 3 + 60 }}>
                        +${amenity.estimated_rental_contribution}/m
                      </div>
                    </Td>
                  </Tr>
                );
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Total({tableAmenities.length})</Th>
              <Th>
                {tableAmenities.length >= maxAmenitiesRows && (
                  <span id="showAllAmenities" className="link-primary pointy" onClick={() => handleMoreAmenities()}>
                    Show more ({tableAmenities.length - maxAmenitiesRows})
                  </span>
                )}
                {tableAmenities.length === maxAmenitiesRows && (
                  <span id="showAllAmenities" className="link-primary pointy" onClick={() => setMaxAmenitiesRows(5)}>
                    Show Less
                  </span>
                )}
              </Th>
            </Tr>
          </Tfoot>
        </Table>

        <Heading size="md" className="my-3 align-self-start">
          Similarity analytics
        </Heading>
        <Table variant="simple" id="similarityTable" size="sm">
          <Thead>
            <Tr>
              <Th className="leftCell"></Th>
              <Th>
                {selectedProperty && selectedProperty.img ? (
                  <img src={selectedProperty.img} width="100px" alt={"property"} className="" />
                ) : (
                  <img src={PropertyImgNotAvailable} width="100px" alt={"property"} className="" />
                )}
              </Th>
              {SIMILARITY_TABLE_DATA.map((property, i) => {
                if (i > tableMarker && i < tableMarker + tableColumns)
                  return (
                    <Th key={uuidv4()}>
                      <img src={PropertyImgNotAvailable} width="100px" alt={"property"} className="" />
                    </Th>
                  );
              })}
              <Th className="text-center purpleFont font-weight-bold">Comps only AVG.</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr className="tableRow">
              <Td className="leftCell">Units</Td>
              <Td>{selectedProperty && checkDataExist(selectedProperty.units)}</Td>
              {SIMILARITY_TABLE_DATA.map((property, i) => {
                if (i > tableMarker && i < tableMarker + tableColumns) return <Td key={uuidv4()}>{property.units}</Td>;
              })}
              <Td className="similarityTableTotal">TOTAL</Td>
            </Tr>
            <Tr className="tableRow">
              <Td className="leftCell">YearBuilt</Td>
              <Td>{selectedProperty && checkDataExist(selectedProperty.year_built)}</Td>
              {SIMILARITY_TABLE_DATA.map((property, i) => {
                if (i > tableMarker && i < tableMarker + tableColumns)
                  return <Td key={uuidv4()}>{property.yearBuilt}</Td>;
              })}
              <Td className="similarityTableTotal">TOTAL</Td>
            </Tr>
            <Tr className="tableRow">
              <Td className="leftCell">OCC</Td>
              <Td>{selectedProperty && checkDataExist(selectedProperty.OCC)}</Td>
              {SIMILARITY_TABLE_DATA.map((property, i) => {
                if (i > tableMarker && i < tableMarker + tableColumns) return <Td key={uuidv4()}>{property.occ}</Td>;
              })}
              <Td className="similarityTableTotal">TOTAL</Td>
            </Tr>
            <Tr className="tableRow">
              <Td className="leftCell">Unit size</Td>
              <Td>{selectedProperty && checkDataExist(selectedProperty.lot_size)}</Td>
              {SIMILARITY_TABLE_DATA.map((property, i) => {
                if (i > tableMarker && i < tableMarker + tableColumns) return <Td key={uuidv4()}>{property.sqft}</Td>;
              })}
              <Td className="similarityTableTotal">TOTAL</Td>
            </Tr>
            <Tr className="tableRow">
              <Td className="leftCell">Rent</Td>
              <Td>{selectedProperty && checkDataExist(selectedProperty.rent)}</Td>
              {SIMILARITY_TABLE_DATA.map((property, i) => {
                if (i > tableMarker && i < tableMarker + tableColumns) return <Td key={uuidv4()}>{property.rent}</Td>;
              })}
              <Td className="similarityTableTotal">TOTAL</Td>
            </Tr>
            <Tr className="tableRow">
              <Td className="leftCell">Rent/sqft</Td>
              <Td>
                {selectedProperty && selectedProperty.rent && selectedProperty.lot_size
                  ? (selectedProperty.rent / selectedProperty.sqft).toFixed(1)
                  : "N/A"}
              </Td>
              {SIMILARITY_TABLE_DATA.map((property, i) => {
                if (i > tableMarker && i < tableMarker + tableColumns)
                  return <Td key={uuidv4()}>{(property.rent / property.sqft).toFixed(1)}</Td>;
              })}
              <Td className="similarityTableTotal">TOTAL</Td>
            </Tr>
            <Tr className="tableRow">
              <Td className="leftCell">Distance from subject</Td>
              <Td>{selectedProperty && checkDataExist(selectedProperty.distance)}</Td>
              {SIMILARITY_TABLE_DATA.map((property, i) => {
                if (i > tableMarker && i < tableMarker + tableColumns)
                  return <Td key={uuidv4()}>{property.distance}</Td>;
              })}
              <Td className="similarityTableTotal">TOTAL</Td>
            </Tr>
            <Tr>
              <Td></Td>
              <Td></Td>
              <Td className="keyLeft">
                <KeyboardArrowLeftIcon onClick={() => handleTableLeft()} />
              </Td>
              <Td className="keyRight">
                <KeyboardArrowRightIcon onClick={() => handleTableRight()} />
              </Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
            <Tr>
              <Td className="leftCell">Int. amenities</Td>
              <Td>monthly contribution</Td>
              <Td>monthly contribution</Td>
              <Td>monthly contribution</Td>
              <Td>monthly contribution</Td>
              <Td></Td>
            </Tr>
            <Tr className="tableRow">
              <Td className="leftCell">Renovated</Td>
              <Td>{selectedProperty && checkDataExist(selectedProperty.renovated)}</Td>
              {SIMILARITY_TABLE_DATA.map((property, i) => {
                if (i > tableMarker && i < tableMarker + tableColumns)
                  return (
                    <Td key={uuidv4()}>
                      <div
                        className={property.renovated ? "batteryGood" : "batteryBad"}
                        style={{ width: property.renovated / 3 + 30 }}
                      >
                        +${property.renovated}
                      </div>
                    </Td>
                  );
              })}
              <Td className="similarityTableTotal">TOTAL</Td>
            </Tr>
            <Tr className="tableRow">
              <Td className="leftCell">Central Heat</Td>
              <Td>{selectedProperty && checkDataExist(selectedProperty.centralHeat)}</Td>
              {SIMILARITY_TABLE_DATA.map((property, i) => {
                if (i > tableMarker && i < tableMarker + tableColumns)
                  return (
                    <Td key={uuidv4()}>
                      <div
                        className={property.centralHeat ? "batteryGood" : "batteryBad"}
                        style={{ width: property.centralHeat / 3 + 30 }}
                      >
                        +${property.centralHeat}
                      </div>
                    </Td>
                  );
              })}
              <Td className="similarityTableTotal">TOTAL</Td>
            </Tr>
            <Tr className="tableRow">
              <Td className="leftCell">walking Closet</Td>
              <Td>{selectedProperty && checkDataExist(selectedProperty.walkingCloset)}</Td>
              {SIMILARITY_TABLE_DATA.map((property, i) => {
                if (i > tableMarker && i < tableMarker + tableColumns)
                  return (
                    <Td key={uuidv4()}>
                      <div
                        className={property.walkingCloset ? "batteryGood" : "batteryBad"}
                        style={{ width: property.walkingCloset / 3 + 30 }}
                      >
                        +${property.walkingCloset}
                      </div>
                    </Td>
                  );
              })}
              <Td className="similarityTableTotal">TOTAL</Td>
            </Tr>
            <Tr className="tableRow">
              <Td className="leftCell">Home Auto</Td>
              <Td>{selectedProperty && checkDataExist(selectedProperty.homeAuto)}</Td>
              {SIMILARITY_TABLE_DATA.map((property, i) => {
                if (i > tableMarker && i < tableMarker + tableColumns)
                  return (
                    <Td key={uuidv4()}>
                      <div
                        className={property.homeAuto ? "batteryGood" : "batteryBad"}
                        style={{ width: property.homeAuto / 3 + 30 }}
                      >
                        +${property.homeAuto}
                      </div>
                    </Td>
                  );
              })}
              <Td className="similarityTableTotal">TOTAL</Td>
            </Tr>
            <Tr className="tableRow">
              <Td className="leftCell">WiFi</Td>
              <Td>{selectedProperty && checkDataExist(selectedProperty.wifi)}</Td>
              {SIMILARITY_TABLE_DATA.map((property, i) => {
                if (i > tableMarker && i < tableMarker + tableColumns)
                  return (
                    <Td key={uuidv4()}>
                      <div
                        className={property.wifi ? "batteryGood" : "batteryBad"}
                        style={{ width: property.wifi / 3 + 30 }}
                      >
                        +${property.wifi}
                      </div>
                    </Td>
                  );
              })}
              <Td className="similarityTableTotal">TOTAL</Td>
            </Tr>
            <Tr>
              <Td></Td>
              <Td></Td>
              <Td className="keyLeft">
                <KeyboardArrowLeftIcon onClick={() => handleTableLeft()} />
              </Td>
              <Td className="keyRight">
                <KeyboardArrowRightIcon onClick={() => handleTableRight()} />
              </Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
          </Tbody>
        </Table>
      </div>
    </>
  );
}

const SIMILARITY_TABLE_DATA = [
  {
    id: 0,
    units: 15,
    yearBuilt: 2020,
    occ: 99,
    sqft: 600,
    rent: 4500,
    distance: 21.4,
    renovated: 250,
    centralHeat: 100,
    walkingCloset: 50,
    homeAuto: 10,
    wifi: 5,
  },
  {
    id: 1,
    units: 80,
    yearBuilt: 2020,
    occ: 80,
    sqft: 663,
    rent: 3704,
    distance: 31.4,
    renovated: 140,
    centralHeat: 0,
    walkingCloset: 70,
    homeAuto: 20,
    wifi: 5,
  },
  {
    id: 2,
    units: 85,
    yearBuilt: 2021,
    occ: 95,
    sqft: 680,
    rent: 4000,
    distance: 42,
    renovated: 140,
    centralHeat: 90,
    walkingCloset: 0,
    homeAuto: 20,
    wifi: 10,
  },
  {
    id: 3,
    units: 81,
    yearBuilt: 2015,
    occ: 90,
    sqft: 735,
    rent: 5900,
    distance: 2.6,
    renovated: 140,
    centralHeat: 60,
    walkingCloset: 50,
    homeAuto: 15,
    wifi: 5,
  },
  {
    id: 4,
    units: 105,
    yearBuilt: 2020,
    occ: 70,
    sqft: 601,
    rent: 3200,
    distance: 41.4,
    renovated: 0,
    centralHeat: 90,
    walkingCloset: 60,
    homeAuto: 15,
    wifi: 0,
  },
  {
    id: 5,
    units: 201,
    yearBuilt: 2022,
    occ: 80,
    sqft: 681,
    rent: 5700,
    distance: 10,
    renovated: 200,
    centralHeat: 120,
    walkingCloset: 90,
    homeAuto: 35,
    wifi: 10,
  },
];

const TABLE_MOCK_DATA = [
  {
    name: "Swimming pools",
    market_supply: 85,
    is_included: "yes",
    market_demand: 185,
    charges_fee: null,
    estimated_rental_contribution: 140,
    show_on_map: false,
  },
  {
    name: "Dog parks",
    market_supply: 30,
    is_included: "no",
    market_demand: 230,
    charges_fee: null,
    estimated_rental_contribution: 90,
    show_on_map: false,
  },
  {
    name: "Rooftop decks",
    market_supply: 20,
    is_included: "yes",
    market_demand: 20,
    charges_fee: null,
    estimated_rental_contribution: 70,
    show_on_map: false,
  },
  {
    name: "Gardens",
    market_supply: 19,
    is_included: "yes",
    market_demand: 19,
    charges_fee: null,
    estimated_rental_contribution: 20,
    show_on_map: false,
  },
];
