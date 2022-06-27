import React, { useContext } from "react";
import { Col, Row, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import InfoIcon from "@mui/icons-material/Info";
import CheckIcon from "@mui/icons-material/Check";
import { AppContext } from "../../Context/AppContext";

function Amenities() {
  const { result } = useContext(AppContext);
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      List of amenities included in the property.
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
          &nbsp;Amenities
        </h6>
      </div>
      <div style={{ fontSize: "12px" }}>
        {/* <Row
            style={{
              fontWeight: "600",
              fontSize: "12px",
              backgroundColor: "#6b46c144",
              padding: "6px 0px",
            }}
          >
            <Col>Community Amenities:</Col>
            <Col >Interior Amenities:</Col>
          </Row> */}

        <Row>
          {result[1].private_pool > 0 && (
            <Col md={6}>
              <CheckIcon fontSize="small" />
              &nbsp;{result[1].private_pool} Private Pool
            </Col>
          )}
          {result[1]["garages"] > 0 && (
            <Col md={6}>
              <CheckIcon fontSize="small" />
              &nbsp;{result[1]["garages"]} Garages
            </Col>
          )}

          {result[1]["fire place"] > 0 && (
            <Col md={6}>
              <CheckIcon fontSize="small" />
              &nbsp;{result[1]["fire place"]} Fire Place
            </Col>
          )}
          {result[1].parking > 0 && (
            <Col md={6}>
              <CheckIcon fontSize="small" />
              &nbsp;{result[1].parking} Parking
            </Col>
          )}

          {result[1]["construction"] && (
            <Col md={6}>
              <CheckIcon fontSize="small" />
              &nbsp;{result[1]["construction"]}
            </Col>
          )}

          {result[1].style && (
            <Col md={6}>
              <CheckIcon fontSize="small" />
              &nbsp;Style: {result[1].style}
            </Col>
          )}
        </Row>
        {/* <Row>
          <Button variant="link" size="sm" disabled>
            More
          </Button>
        </Row> */}
      </div>
    </div>
  );
}

export default Amenities;
