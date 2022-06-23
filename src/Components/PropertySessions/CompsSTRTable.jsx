import React, { useContext, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import PropertyImgNotAvailable from "../../Images/PropertyImgNotAvailable.png";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { numberWithCommas } from "../../lib/utilityFunctions";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function CompsSTRTable({ SIMILARITY_TABLE_DATA }) {
  const [tableMarker, setTableMarker] = useState(0);
  const tableColumns = 5;
  const handleTableLeft = () => {
    if (tableMarker > 0) setTableMarker((prev) => prev - 1);
  };
  const handleTableRight = () => {
    if (tableMarker + tableColumns < SIMILARITY_TABLE_DATA.length)
      setTableMarker((prev) => prev + 1);
  };

  const ADRTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      .
    </Tooltip>
  );
  const ADR_PARTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      .
    </Tooltip>
  );
  const REV_PARTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
     .
    </Tooltip>
  );
  const expected_PAR_revTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
     .
    </Tooltip>
  );
  return (
    <Table variant="simple" id="similarityTable" size="sm">
      <Thead>
        <Tr>
          <Th
            className="leftCell"
            style={{ fontWeight: "900", color: "#6b46c1" }}
          >
            Comps STR
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

        {/* <Tr className="tableRow">
          <Td className="leftCell">Lot size (sqft)</Td>
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
          {SIMILARITY_TABLE_DATA.map((property, i) => {
            if (i >= tableMarker && i < tableMarker + tableColumns)
              return (
                <Td key={uuidv4()}>
                  {numberWithCommas(property.building_area)}
                </Td>
              );
          })}
          <Td className="similarityTableTotal">TOTAL</Td>
        </Tr> */}
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
        {/* <Tr className="tableRow">
          <Td className="leftCell">Floors</Td>
          {SIMILARITY_TABLE_DATA.map((property, i) => {
            if (i >= tableMarker && i < tableMarker + tableColumns)
              return <Td key={uuidv4()}>{property.floors}</Td>;
          })}
          <Td className="similarityTableTotal">TOTAL</Td>
        </Tr> */}

        <Tr className="tableRow">
          <Td className="leftCell">
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={ADRTooltip}
            >
              <span
                style={{
                  textDecorationLine: "underline",
                  textDecorationStyle: "dashed",
                }}
              >
                ADR
              </span>
            </OverlayTrigger>
          </Td>

          {/* <Td>{result && checkDataExist(result[0].ADR)}</Td> */}
          {SIMILARITY_TABLE_DATA.map((property, i) => {
            if (i >= tableMarker && i < tableMarker + tableColumns)
              return <Td key={uuidv4()}>${numberWithCommas(property.ADR)}</Td>;
          })}
          <Td className="similarityTableTotal">TOTAL</Td>
        </Tr>
        <Tr className="tableRow">
          <Td className="leftCell">
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={ADR_PARTooltip}
            >
              <span
                style={{
                  textDecorationLine: "underline",
                  textDecorationStyle: "dashed",
                }}
              >
                ADR_PAR
              </span>
            </OverlayTrigger>
          </Td>

          {SIMILARITY_TABLE_DATA.map((property, i) => {
            if (i >= tableMarker && i < tableMarker + tableColumns)
              return (
                <Td key={uuidv4()}>${numberWithCommas(property.ADR_PAR)}</Td>
              );
          })}
          <Td className="similarityTableTotal">TOTAL</Td>
        </Tr>
        <Tr className="tableRow">
          <Td className="leftCell">
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={REV_PARTooltip}
            >
              <span
                style={{
                  textDecorationLine: "underline",
                  textDecorationStyle: "dashed",
                }}
              >
                REV_PAR
              </span>
            </OverlayTrigger>
          </Td>

          {SIMILARITY_TABLE_DATA.map((property, i) => {
            if (i >= tableMarker && i < tableMarker + tableColumns)
              return (
                <Td key={uuidv4()}>${numberWithCommas(property.REV_PAR)}</Td>
              );
          })}
          <Td className="similarityTableTotal">TOTAL</Td>
        </Tr>
        <Tr className="tableRow">
          <Td className="leftCell">
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={expected_PAR_revTooltip}
            >
              <span
                style={{
                  textDecorationLine: "underline",
                  textDecorationStyle: "dashed",
                }}
              >
                Expected PAR_rev
              </span>
            </OverlayTrigger>
          </Td>
          {/* <Td>
                    {result && checkDataExist(result[0].expected_PAR_rev)}
                  </Td> */}
          {SIMILARITY_TABLE_DATA.map((property, i) => {
            if (i >= tableMarker && i < tableMarker + tableColumns)
              return (
                <Td key={uuidv4()}>
                  ${numberWithCommas(property.expected_PAR_rev)}
                </Td>
              );
          })}
          <Td className="similarityTableTotal">TOTAL</Td>
        </Tr>
        <Tr className="tableRow">
          <Td className="leftCell">Available days</Td>
          {/* <Td>{result && checkDataExist(result[0].available_days)}</Td> */}
          {SIMILARITY_TABLE_DATA.map((property, i) => {
            if (i >= tableMarker && i < tableMarker + tableColumns)
              return (
                <Td key={uuidv4()}>{Math.floor(property.available_days)}</Td>
              );
          })}
          <Td className="similarityTableTotal">TOTAL</Td>
        </Tr>
        <Tr className="tableRow">
          <Td className="leftCell">Booked nights</Td>
          {/* <Td>{result && checkDataExist(result[0].booked_nights)}</Td> */}
          {SIMILARITY_TABLE_DATA.map((property, i) => {
            if (i >= tableMarker && i < tableMarker + tableColumns)
              return (
                <Td key={uuidv4()}>{Math.floor(property.booked_nights)}</Td>
              );
          })}
          <Td className="similarityTableTotal">TOTAL</Td>
        </Tr>
        <Tr className="tableRow">
          <Td className="leftCell">OCC</Td>
          {/* <Td>{result && checkDataExist(result[0].occ)}</Td> */}
          {SIMILARITY_TABLE_DATA.map((property, i) => {
            if (i >= tableMarker && i < tableMarker + tableColumns)
              return (
                <Td key={uuidv4()}>
                  {Math.floor(property.occ * 10000) / 100}%
                </Td>
              );
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

export default CompsSTRTable;
