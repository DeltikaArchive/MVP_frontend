import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { AppContext } from "../../Context/AppContext";
import PropertyImgNotAvailable from "../../Images/PropertyImgNotAvailable.png";
import { numberWithCommas } from "../../lib/utilityFunctions";

function AddressInfo() {
  const { result } = useContext(AppContext);
  return (
    <div>
      <Row>
        <Col md={5} className="pe-0">
          <img src={PropertyImgNotAvailable} alt={"property"} height="140" />
        </Col>
        <Col md={7} className="">
          <Row>
            <span
              className="mb-2"
              style={{ fontWeight: "600", color: "#6b46c1" }}
            >
              Listing Price:{"  "}
              <span
                style={{
                  fontWeight: "600",
                  color: "#6b46c1",
                  fontSize: "20px",
                }}
              >
                ${numberWithCommas(result.info.listing_price)}
              </span>
            </span>
          </Row>
          <Row style={{ fontSize: "12px" }}>
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
    </div>
  );
}

export default AddressInfo;
