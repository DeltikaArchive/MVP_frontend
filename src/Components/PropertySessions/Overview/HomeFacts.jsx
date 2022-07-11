import React, { useContext } from "react";
import { Col, Row, Tooltip, OverlayTrigger } from "react-bootstrap";
import InfoIcon from "@mui/icons-material/Info";
import { numberWithCommas } from "../../../lib/utilityFunctions";
import { AppContext } from "../../../Context/AppContext";

function HomeFacts() {
  const { result } = useContext(AppContext);
  const info = result.info;
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Current property details taken from the assessment.
    </Tooltip>
  );
  return (
    <div className="text-start">
      <div className="d-flex">
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <InfoIcon fontSize="" style={{ color: "#6b46c18c" }} />
        </OverlayTrigger>
        <h6 className="mb-2" style={{ fontWeight: "600" }}>
          &nbsp;Home Facts
        </h6>
      </div>
      <div style={{ fontSize: "12px" }}>
        <Row>
          <Col md={5}>
            <Row>
              <Col>Property Type:</Col>
              <Col className="text-end">{info.property_type}</Col>
            </Row>
            <Row>
              <Col>Year Built:</Col>
              <Col className="text-end">{info.year_built}</Col>
            </Row>
            <Row>
              <Col>Lot Size:</Col>
              <Col className="text-end">
                {numberWithCommas(info.lot_size)} Sqft.
              </Col>
            </Row>
            <Row>
              <Col>Building Size:</Col>
              <Col className="text-end">
                {numberWithCommas(info.building_area)} Sqft.
              </Col>
            </Row>
            <Row>
              <Col>MLS #: </Col>
              <Col className="text-end">{info["MLS Number"]}</Col>
            </Row>
          </Col>
          <Col md={2}></Col>
          <Col md={5}>
            <Row>
              <Col>Floors:</Col>
              <Col className="text-end">{info.floors}</Col>
            </Row>
            <Row>
              <Col>No. of Bedrooms:</Col>
              <Col className="text-end">{info.bedrooms}</Col>
            </Row>
            <Row>
              <Col>Full Bathrooms:</Col>
              <Col className="text-end">{info.full_bathrooms}</Col>
            </Row>
            <Row>
              <Col>Half Bathrooms:</Col>
              <Col className="text-end">{info.half_bathrooms}</Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default HomeFacts;
