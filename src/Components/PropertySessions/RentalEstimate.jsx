import React, { useContext } from 'react';
import { Button, Col, Row, Tooltip, OverlayTrigger } from "react-bootstrap";
import InfoIcon from "@mui/icons-material/Info";
import Table from "react-bootstrap/Table";
import { AppContext } from '../../Context/AppContext';
import { numberWithCommas } from '../../lib/utilityFunctions';

function RentalEstimate({ onClickCompsRent }) {
    const { result } = useContext(AppContext);
  const rentalEstimate = result[ 4 ];
   const renderTooltip = (props) => (
     <Tooltip id="button-tooltip" {...props}>
       Comps Price/Sqft X Building Size
     </Tooltip>
   );
    return (
      <div>
        <div className="d-flex">
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <InfoIcon fontSize="" style={{ color: "#6b46c18c" }} />
          </OverlayTrigger>
          <h6 className="mb-2" style={{ fontWeight: "600" }}>
            &nbsp;Long Term Rental Estimate
          </h6>
        </div>
        <div style={{ fontSize: "12px", textAlign: "left" }}>
          <Row className="mb-3">
            <Col
              style={{ fontWeight: "600", fontSize: "15px", color: "#6b46c1" }}
            >
              ${numberWithCommas(Math.floor(rentalEstimate["expected rental"]))}
            </Col>
          </Row>
          <div>
            {/* <Row>
              <Col></Col>
              <Col style={{ fontWeight: "600", color: "#6b46c1" }}>
                Property
              </Col>
              <Col
                style={{
                  fontWeight: "600",
                  color: "#6b46c1",
                  textAlign: "right",
                }}
              >
                Comps
              </Col>
            </Row>
            <Row>
              <Col style={{ fontWeight: "600" }}>Price/Sqft:</Col>
              <Col>$1.9</Col>
              <Col style={{ textAlign: "right" }}>$2.2</Col>
            </Row>
            <Row>
              <Col style={{ fontWeight: "600" }}>Count:</Col>
              <Col></Col>
              <Col style={{ textAlign: "right" }}>17</Col>
            </Row> */}
            <Table size="sm" responsive>
              <thead>
                <tr style={{ color: "#6b46c1" }}>
                  <th></th>
                  <th>Property</th>
                  <th>Comps</th>
                </tr>
              </thead>
              <tbody>
                <tr className="tableRow">
                  <td>Price/Sqft:</td>
                  <td>$1.9</td>
                  <td>$2.2</td>
                </tr>
                <tr className="tableRow">
                  <td>Count:</td>
                  <td></td>
                  <td>{rentalEstimate["properties count"]}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <Row className="justify-content-center mt-3">
            <Button
              size="sm"
              onClick={onClickCompsRent}
              style={{ width: "120px" }}
            >
              Comps rent
            </Button>
          </Row>
        </div>
      </div>
    );
}

export default RentalEstimate;