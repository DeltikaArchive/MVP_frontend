import React, { useContext } from "react";
import { Button, Col, Row, Tooltip, OverlayTrigger } from "react-bootstrap";
import InfoIcon from "@mui/icons-material/Info";
import Table from "react-bootstrap/Table";
import { AppContext } from "../../Context/AppContext";
import { numberWithCommas } from "../../lib/utilityFunctions";

function ARV({ onClickCompsSale }) {
  const { result } = useContext(AppContext);
  const arv = result[6];
  const arvTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      After repair value.
    </Tooltip>
  );
  const marginTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      ARV- Listing price - expected expanses
    </Tooltip>
  );
  
  return (
    <div>
      <div className="d-flex">
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={arvTooltip}
        >
          <InfoIcon fontSize="" style={{ color: "#6b46c18c" }} />
        </OverlayTrigger>
        <h6 className="mb-2" style={{ fontWeight: "600" }}>
          &nbsp;ARV
        </h6>
      </div>
      <div style={{ fontSize: "12px", textAlign: "left" }}>
        <Row>
          <Col
            style={{ fontWeight: "600", fontSize: "15px", color: "#6b46c1" }}
          >
            ${numberWithCommas(Math.floor(arv.arv))}
          </Col>
          <Col style={{ textAlign: "right" }}>
            <p>{Math.floor(arv["diff %"] * 100)}% Margin</p>
            <p
              style={
                arv["diff"] >= 0
                  ? {
                      color: "#00b297e6",
                      fontWeight: "600",
                    }
                  : {
                      color: "red",
                      fontWeight: "600",
                    }
              }
            >
              {Math.floor(arv["diff"] / 1000)}K
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={marginTooltip}
              >
                <span
                  style={{
                    textDecorationLine: "underline",
                    textDecorationStyle: "dashed",
                  }}
                >
                  Margin
                </span>
              </OverlayTrigger>
            </p>
          </Col>
        </Row>
        <div>
          <Table size="sm" responsive>
            <thead>
              <tr style={{ color: "#6b46c1", textAlign: "left" }}>
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
                <td>Avg.DOM:</td>
                <td></td>
                <td>22 days</td>
              </tr>
              <tr className="tableRow">
                <td>Count:</td>
                <td></td>
                <td>{arv["properties count"]}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        {/* <div className="mb-3">
          <Row>
            <Col style={{ fontWeight: "600" }}>Annual exp. expenses</Col>
            <Col
              style={{
                fontWeight: "600",
                color: "#fe007fdc",
                textAlign: "right",
              }}
            >
              $50,000
            </Col>
          </Row>
        </div> */}
        {/* <div style={{ color: "gray" }} className="mb-3">
          <Row>
            <Col>Closing costs</Col>
            <Col style={{ textAlign: "right" }}>$5,000</Col>
          </Row>
          <Row>
            <Col>Acquisition fee</Col>
            <Col style={{ textAlign: "right" }}>8%</Col>
          </Row>
          <Row>
            <Col>Fixed expenses</Col>
            <Col style={{ textAlign: "right" }}>$3,000</Col>
          </Row>
          <Row>
            <Col>One-time expenses</Col>
            <Col style={{ textAlign: "right" }}>$3,000</Col>
          </Row>
          <Row>
            <Col>HOA</Col>
            <Col style={{ textAlign: "right" }}>$400/month</Col>
          </Row>
          <Row>
            <Col>Renovation</Col>
            <Col style={{ textAlign: "right" }}>$40,000</Col>
          </Row>
          <Row>
            <Col>Insurance</Col>
            <Col style={{ textAlign: "right" }}>5%</Col>
          </Row>
        </div> */}
        <Row className="justify-content-center">
          <Button
            size="sm"
            onClick={onClickCompsSale}
            style={{ width: "120px" }}
          >
            Comps Sale
          </Button>
        </Row>
      </div>
    </div>
  );
}

export default ARV;