import React, { useContext } from "react";
import { Col, Row, Button } from "react-bootstrap";
import CheckIcon from "@mui/icons-material/Check";
import { AppContext } from "../../../Context/AppContext";


function Amenities() {
  const { result } = useContext(AppContext);
  const amenities = result.amenities;
  
  return (
    <div className="text-start">
      <div style={{ fontSize: "12px" }}>
        <Row>
          {amenities.pool > 0 && (
            <Col md={6}>
              <CheckIcon fontSize="small" />
              &nbsp;{amenities.pool} Private Pool
            </Col>
          )}
          {amenities["garages"] > 0 && (
            <Col md={6}>
              <CheckIcon fontSize="small" />
              &nbsp;{amenities["garages"]} Garages
            </Col>
          )}

          {amenities["fire place"] > 0 && (
            <Col md={6}>
              <CheckIcon fontSize="small" />
              &nbsp;{amenities["fire place"]} Fire Place
            </Col>
          )}
          {amenities.total_parking !== "N/A" && (
            <Col md={6}>
              <CheckIcon fontSize="small" />
              &nbsp;{amenities.total_parking} Parking
            </Col>
          )}

          {amenities["construction"] && (
            <Col md={6}>
              <CheckIcon fontSize="small" />
              &nbsp;{amenities["construction"]}
            </Col>
          )}

          {result.info.style && (
            <Col md={6}>
              <CheckIcon fontSize="small" />
              &nbsp;Style: {result.info.style}
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
