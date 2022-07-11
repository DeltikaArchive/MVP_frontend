import React, { useContext } from "react";
import { Button, Col, Row, Tooltip, OverlayTrigger } from "react-bootstrap";
import InfoIcon from "@mui/icons-material/Info";
import Table from "react-bootstrap/Table";
import { AppContext } from "../../../Context/AppContext";
import { numberWithCommas } from "../../../lib/utilityFunctions";
import ARVTable from "./ARVTable";

function ARV({ onClickCompsSale }) {
  const { result } = useContext(AppContext);
  const arv = result.sales
  const arvTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      After repair value.
    </Tooltip>
  );
  const marginTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      ARV - Listing price - expected expanses
    </Tooltip>
  );
  
  return (
    <div className="mx-3">
      <div className="h3 text-align-left p-3 mb-0 with-bottom-border">
        ARV{" "}
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={arvTooltip}
        >
          <InfoIcon className="note-trigger" fontSize="small" />
        </OverlayTrigger>
      </div>
      <div className="m-3">
        <Row>
          <Col>
            <Row className="arv-table-header">
              <Col>After repair value</Col>
              <Col style={{ textAlign: "end", color: "#0ca789" }}>
                ${numberWithCommas(Math.floor(arv.arv))}
              </Col>
            </Row>
            <Row>
              <ARVTable />
            </Row>
            <Row className="arv-table-header">
              <Col>Expenses</Col>
              <Col style={{ textAlign: "end", color: "#f23f05" }}>
                ${numberWithCommas(225000)}
              </Col>
            </Row>
            <Row className="arv-table-header">
              <Col>Flip margin</Col>
              <Col
                style={{ textAlign: "end", color: "#6b46c1" }}
                // style={
                //   arv["diff"] >= 0
                //     ? {
                //         textAlign: "end",
                //         color: "#0ca789",
                //         fontWeight: "600",
                //       }
                //     : { textAlign: "end", color: "#f23f05", fontWeight: "600" }
                // }
              >
                ${numberWithCommas(Math.floor(arv.diff))}
              </Col>
            </Row>
          </Col>
          <Col>charts</Col>
        </Row>

        {/* <div style={{ fontSize: "12px", textAlign: "left" }}>
        <Row className="mb-2">
          
          <Col style={{ textAlign: "right", fontSize: "15px" }}>
            <p>{Math.floor(arv["diff_per"] * 10000) / 100}% Margin</p>
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
              {numberWithCommas(arv["diff"])}${" "}
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
      </div> */}
      </div>
    </div>
  );
}

export default ARV;
