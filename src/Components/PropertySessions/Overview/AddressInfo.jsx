import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { AppContext } from "../../../Context/AppContext";
import PropertyImgNotAvailable from "../../../Images/PropertyImgNotAvailable.png";
import { numberWithCommas } from "../../../lib/utilityFunctions";

function AddressInfo() {
  const { result } = useContext(AppContext);
  return (
    <div>
      <Row className="mb-3">
        <Col md={5} className="pe-0">
          <img src={PropertyImgNotAvailable} alt={"property"} height="140" />
        </Col>
        <Col md={7} className="pe-0">
          <Row>
            <span style={{ fontWeight: "600", color: "#6b46c1" }}>
              Listing Price:{"  "}
              <span
                style={{
                  fontWeight: "600",
                  color: "#6b46c1",
                  fontSize: "20px",
                }}
              >
                {"  "} ${numberWithCommas(result.info.listing_price)}
              </span>
            </span>
          </Row>
          <Row>
            <span style={{ fontSize: "12px", color: "gray" }}>
              Listing Status:{" "}
              <span style={{ color: "#00b297e6", fontWeight: "600" }}>
                Active
              </span>
            </span>
          </Row>
          <Row style={{ fontSize: "12px" }}>
            <i>{result.info.address}</i>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="purple-cell">
            <p style={{ fontWeight: "600" }}>Flip margin</p>
            <p
              style={{ fontSize: "20px", fontWeight: "600", color: "#6b46c1" }}
            >
              GOOD
            </p>
            <p style={{ color: "#6b46c1", fontWeight: "600" }}>$35,000</p>
            <p style={{ color: "#6b46c1", fontWeight: "600" }}>10% margin</p>
          </div>
        </Col>
        <Col>
          <div className="purple-cell">
            <p style={{ fontWeight: "600" }}>STR potential</p>
            <p
              style={{ fontSize: "18px", fontWeight: "600", color: "#6b46c1" }}
            >
              HIGH
            </p>
            <p style={{ color: "#6b46c1", fontWeight: "600" }}>2.5 Arbitrage</p>
            <p style={{ color: "#6b46c1", fontWeight: "600" }}>
              20% YoY growth
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default AddressInfo;
