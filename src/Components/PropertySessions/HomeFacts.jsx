import React, { useContext } from "react";
import { Col, Row, Tooltip, OverlayTrigger } from "react-bootstrap";
import InfoIcon from "@mui/icons-material/Info";
import { AppContext } from "../../Context/AppContext";
import { numberWithCommas } from "../../lib/utilityFunctions";
function HomeFacts() {
  const { result } = useContext(AppContext);
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
        <Row style={{ color: "#6b46c1", fontWeight: "600" }}>
          <Col>Listing Price</Col>
          <Col className="text-end">
            $ {numberWithCommas(result[0].listing_price)}
          </Col>
        </Row>
        <Row>
          <Col>MLS #: </Col>
          <Col className="text-end">{result[0].MLS_Number}</Col>
        </Row>
        <Row>
          <Col>Property Type:</Col>
          <Col className="text-end">{result[0].property_type}</Col>
        </Row>
        <Row>
          <Col>Year Built:</Col>
          <Col className="text-end">{result[0].year_built}</Col>
        </Row>
        <Row>
          <Col>Lot Size:</Col>
          <Col className="text-end">
            {numberWithCommas(result[0].lot_size)} Sqft.
          </Col>
        </Row>
        <Row>
          <Col>Building Size:</Col>
          <Col className="text-end">
            {numberWithCommas(result[0].building_size)} Sqft.
          </Col>
        </Row>
        <Row>
          <Col>Floors:</Col>
          <Col className="text-end">{result[0].floors}</Col>
        </Row>
        <Row>
          <Col>No. of Bedrooms:</Col>
          <Col className="text-end">{result[0].bedrooms}</Col>
        </Row>
        <Row>
          <Col>Full Bathrooms:</Col>
          <Col className="text-end">{result[0].full_bathrooms}</Col>
        </Row>
        <Row>
          <Col>Half Bathrooms:</Col>
          <Col className="text-end">{result[0].half_bathrooms}</Col>
        </Row>
      </div>
    </div>
  );
}

export default HomeFacts;
