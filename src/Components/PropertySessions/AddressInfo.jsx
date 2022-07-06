import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { AppContext } from "../../Context/AppContext";
import PropertyImgNotAvailable from "../../Images/PropertyImgNotAvailable.png";

function AddressInfo() {
  const { result } = useContext(AppContext);
  return (
    <div className="text-center">
      <Row>
        <Col md={4} style={{ alignSelf: "center" }} className="pe-0">
          <img src={PropertyImgNotAvailable} alt={"property"} height="140" />
        </Col>
        <Col md={8} style={{ alignSelf: "center" }} className="ps-0">
          <Row>
            <h5
              className="mb-2"
              style={{ fontWeight: "600", textAlign: "center" }}
            >
              <i>
                {result.info.address}
              </i>
            </h5>
          </Row>
          <Row style={{ fontSize: "12px" }}>
            <Col>N/A</Col>
            <Col>N/A</Col>
            <Col style={{ color: "#00b297e6", fontWeight: "600" }}>Active</Col>
          </Row>
          <Row style={{ fontSize: "12px", color: "gray" }}>
            <Col>Zoning</Col>
            <Col>APN</Col>
            <Col>Listing Status</Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default AddressInfo;
