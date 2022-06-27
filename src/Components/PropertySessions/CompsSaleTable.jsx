import React, { useState, useContext } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import PropertyImgNotAvailable from "../../Images/PropertyImgNotAvailable.png";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { numberWithCommas } from "../../lib/utilityFunctions";
import { AppContext } from "../../Context/AppContext";


function CompsSaleTable({ SIMILARITY_TABLE_DATA }) {
  const { popupId, setPopupId, viewport, setViewport, result } = useContext(AppContext);
  const compsAvg = result[10][0]
  const [tableMarker, setTableMarker] = useState(0);
  const tableColumns = 5;
  const handleTableLeft = () => {
    if (tableMarker > 0) setTableMarker((prev) => prev - 1);
  };
  const handleTableRight = () => {
    if (tableMarker + tableColumns < SIMILARITY_TABLE_DATA.length)
      setTableMarker((prev) => prev + 1);
  };

  function handleShowCard(id, lat, long) {
    setPopupId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  }

  function dateFormat(dateString) { 
    const dateNew = new Date(dateString);
    return new Date(
      dateNew.getFullYear(),
      dateNew.getMonth(),
      dateNew.getDate()
    );

  }
  return (
    <Table variant="simple" id="similarityTable" size="sm">
      <Thead>
        <Tr>
          <Th
            className="leftCell"
            style={{ fontWeight: "900", color: "#6b46c1", fontSize: "15px" }}
          >
            Comps Sale
          </Th>

          {SIMILARITY_TABLE_DATA.map((property, i) => {
            if (i >= tableMarker && i < tableMarker + tableColumns)
              return (
                <Th key={uuidv4()}>
                  <img
                    src={PropertyImgNotAvailable}
                    width="100px"
                    alt={"property"}
                    className=""
                  />
                </Th>
              );
          })}
          <Th className="text-center purpleFont font-weight-bold">
            Comps only AVG.
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr className="tableRow">
          <Td className="leftCell">Similarity</Td>
          {/* <Td>{result && checkDataExist(result[0].similarity)}</Td> */}
          {SIMILARITY_TABLE_DATA.map((property, i) => {
            if (i >= tableMarker && i < tableMarker + tableColumns)
              return <Td key={uuidv4()}></Td>;
          })}
          <Td className="similarityTableTotal">TOTAL</Td>
        </Tr>
        <Tr className="tableRow">
          <Td className="leftCell">Address</Td>
          {SIMILARITY_TABLE_DATA.map((property, i) => {
            if (i >= tableMarker && i < tableMarker + tableColumns)
              return (
                <Td
                  id="addressCell"
                  style={{
                    cursor: "pointer",
                    fontSize: "12px",
                    textAlign: "left",
                  }}
                  key={uuidv4()}
                  onClick={() =>
                    handleShowCard(
                      property.source_id,
                      property.latitude,
                      property.longitude
                    )
                  }
                >
                  {property.address}
                </Td>
              );
          })}
          <Td className="similarityTableTotal"></Td>
        </Tr>
        <Tr className="tableRow">
          <Td className="leftCell">Lot size (sqft)</Td>
          {/* <Td>{result && checkDataExist(result[0].lot_size)}</Td> */}
          {SIMILARITY_TABLE_DATA.map((property, i) => {
            if (i >= tableMarker && i < tableMarker + tableColumns)
              return (
                <Td key={uuidv4()}>{numberWithCommas(property.lot_size)}</Td>
              );
          })}
          <Td className="similarityTableTotal">
            {numberWithCommas(compsAvg.lot_size)}
          </Td>
        </Tr>
        <Tr className="tableRow">
          <Td className="leftCell">Building size</Td>
          {/* <Td>{result && checkDataExist(result[0].building_size)}</Td> */}
          {SIMILARITY_TABLE_DATA.map((property, i) => {
            if (i >= tableMarker && i < tableMarker + tableColumns)
              return <Td key={uuidv4()}>{numberWithCommas()}</Td>;
          })}
          <Td className="similarityTableTotal">TOTAL</Td>
        </Tr>
        <Tr className="tableRow">
          <Td className="leftCell">Bedrooms</Td>
          {/* <Td>{result && checkDataExist(result[0].bedrooms)}</Td> */}
          {SIMILARITY_TABLE_DATA.map((property, i) => {
            if (i >= tableMarker && i < tableMarker + tableColumns)
              return <Td key={uuidv4()}></Td>;
          })}
          <Td className="similarityTableTotal">{compsAvg.bedrooms}</Td>
        </Tr>
        <Tr className="tableRow">
          <Td className="leftCell">Bathrooms</Td>
          {/* <Td>
                {result &&
                  checkDataExist(
                    result[0].full_bathrooms + result[0].half_bathrooms
                  )}
              </Td> */}
          {SIMILARITY_TABLE_DATA.map((property, i) => {
            if (i >= tableMarker && i < tableMarker + tableColumns)
              return (
                <Td key={uuidv4()}>
                  {property.full_bathrooms + property.half_bathrooms * 0.5}
                </Td>
              );
          })}
          <Td className="similarityTableTotal">
            {Math.floor(
              (compsAvg.full_bathrooms + compsAvg.half_bathrooms * 0.5) * 100
            ) / 100}
          </Td>
        </Tr>
        <Tr className="tableRow">
          <Td className="leftCell">Floors</Td>
          {/* <Td>{result && checkDataExist(result[0].floor)}</Td> */}
          {SIMILARITY_TABLE_DATA.map((property, i) => {
            if (i >= tableMarker && i < tableMarker + tableColumns)
              return <Td key={uuidv4()}>{property.floors}</Td>;
          })}
          <Td className="similarityTableTotal">
            {Math.floor(compsAvg.floors * 100) / 100}
          </Td>
        </Tr>

        <Tr className="tableRow">
          <Td className="leftCell">Listing Price</Td>
          {/* <Td>
                  {result && checkDataExist(result[0].listing_price / 1000)}k
                </Td> */}
          {SIMILARITY_TABLE_DATA.map((property, i) => {
            if (i >= tableMarker && i < tableMarker + tableColumns)
              return (
                <Td key={uuidv4()}>
                  ${numberWithCommas(property.sale_listing_price)}
                </Td>
              );
          })}
          <Td className="similarityTableTotal">
            ${numberWithCommas(compsAvg.sale_listing_price)}
          </Td>
        </Tr>

        <Tr className="tableRow">
          <Td className="leftCell">Closing Price</Td>
          {/* <Td>{result && checkDataExist(result[0].rent)}</Td> */}
          {SIMILARITY_TABLE_DATA.map((property, i) => {
            if (i >= tableMarker && i < tableMarker + tableColumns)
              return (
                <Td key={uuidv4()}>
                  ${numberWithCommas(property.sale_closing_price)}
                </Td>
              );
          })}
          <Td className="similarityTableTotal">
            ${numberWithCommas(compsAvg.sale_closing_price)}
          </Td>
        </Tr>

        <Tr className="tableRow">
          <Td className="leftCell">Closing date</Td>
          {/* <Td>{result && checkDataExist(result[0].rent)}</Td> */}
          {SIMILARITY_TABLE_DATA.map((property, i) => {
            if (i >= tableMarker && i < tableMarker + tableColumns)
              return <Td key={uuidv4()}>{property.date.slice(0, 10)}</Td>;
          })}
          <Td className="similarityTableTotal"></Td>
        </Tr>

        <Tr className="tableRow">
          <Td className="leftCell">Distance from subject</Td>
          {/* <Td>{result && checkDataExist(result.distance)}</Td> */}
          {SIMILARITY_TABLE_DATA.map((property, i) => {
            if (i >= tableMarker && i < tableMarker + tableColumns)
              return (
                <Td key={uuidv4()}>
                  {Math.floor(property.distance * 100) / 100}
                </Td>
              );
          })}
          <Td className="similarityTableTotal">
            {Math.floor(compsAvg.distance * 100) / 100}
          </Td>
        </Tr>
        <Tr>
          <Td></Td>
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
  );
}

export default CompsSaleTable;
