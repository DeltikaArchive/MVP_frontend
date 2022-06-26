import React, { useState } from "react";
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

function CompsRentTable({ SIMILARITY_TABLE_DATA }) {
  const [tableMarker, setTableMarker] = useState(0);
  const tableColumns = 5;
  const handleTableLeft = () => {
    if (tableMarker > 0) setTableMarker((prev) => prev - 1);
  };
  const handleTableRight = () => {
    if (tableMarker + tableColumns < SIMILARITY_TABLE_DATA.length)
      setTableMarker((prev) => prev + 1);
  };
  return (
    <Table variant="simple" id="similarityTable" size="sm">
      <Thead>
        <Tr>
          <Th
            className="leftCell"
            style={{ fontWeight: "900", color: "#6b46c1" }}
          >
            Comps Rent
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
              return (
                <Td key={uuidv4()}>
                  {Math.floor(property.similarity * 10) / 10}
                </Td>
              );
          })}
          <Td className="similarityTableTotal">TOTAL</Td>
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
          <Td className="similarityTableTotal">TOTAL</Td>
        </Tr>
        <Tr className="tableRow">
          <Td className="leftCell">Building size</Td>
          {/* <Td>{result && checkDataExist(result[0].building_size)}</Td> */}
          {SIMILARITY_TABLE_DATA.map((property, i) => {
            if (i >= tableMarker && i < tableMarker + tableColumns)
              return (
                <Td key={uuidv4()}>
                  {numberWithCommas(property.building_area)}
                </Td>
              );
          })}
          <Td className="similarityTableTotal">TOTAL</Td>
        </Tr>
        <Tr className="tableRow">
          <Td className="leftCell">Bedrooms</Td>
          {/* <Td>{result && checkDataExist(result[0].bedrooms)}</Td> */}
          {SIMILARITY_TABLE_DATA.map((property, i) => {
            if (i >= tableMarker && i < tableMarker + tableColumns)
              return <Td key={uuidv4()}>{property.bedrooms}</Td>;
          })}
          <Td className="similarityTableTotal">TOTAL</Td>
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
              return <Td key={uuidv4()}>{property.total_bathrooms_numeric}</Td>;
          })}
          <Td className="similarityTableTotal">TOTAL</Td>
        </Tr>
        <Tr className="tableRow">
          <Td className="leftCell">Floors</Td>
          {/* <Td>{result && checkDataExist(result[0].floor)}</Td> */}
          {SIMILARITY_TABLE_DATA.map((property, i) => {
            if (i >= tableMarker && i < tableMarker + tableColumns)
              return <Td key={uuidv4()}>{property.floors}</Td>;
          })}
          <Td className="similarityTableTotal">TOTAL</Td>
        </Tr>

        <Tr className="tableRow">
          <Td className="leftCell">Rental Price</Td>
          {/* <Td>
                  {result && result.rental_price
                    ? (result.rent / result.sqft).toFixed(1)
                    : "N/A"}
                </Td> */}
          {SIMILARITY_TABLE_DATA.map((property, i) => {
            if (i >= tableMarker && i < tableMarker + tableColumns)
              return (
                <Td key={uuidv4()}>
                  ${numberWithCommas(property.rental_price)}
                </Td>
              );
          })}
          <Td className="similarityTableTotal">TOTAL</Td>
        </Tr>

        <Tr className="tableRow">
          <Td className="leftCell">Rent/sqft</Td>
          {/* <Td>
                  {result && result[0].rent && result[0].lot_size
                    ? (result[0].rent / result[0].lot_size).toFixed(1)
                    : "N/A"}
                </Td> */}
          {SIMILARITY_TABLE_DATA.map((property, i) => {
            if (i >= tableMarker && i < tableMarker + tableColumns)
              return (
                <Td key={uuidv4()}>
                  {property.rental_price &&
                    property.lot_size !== "N/A" &&
                    `$${(property.rental_price / property.lot_size).toFixed(
                      1
                    )}`}
                </Td>
              );
          })}
          <Td className="similarityTableTotal">TOTAL</Td>
        </Tr>

        <Tr className="tableRow">
          <Td className="leftCell">Status</Td>
          {/* <Td>{result && checkDataExist(result[0].status)}</Td> */}
          {SIMILARITY_TABLE_DATA.map((property, i) => {
            if (i >= tableMarker && i < tableMarker + tableColumns)
              return <Td key={uuidv4()}>{property.status}</Td>;
          })}
          <Td className="similarityTableTotal">TOTAL</Td>
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
          <Td className="similarityTableTotal">TOTAL</Td>
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

export default CompsRentTable;