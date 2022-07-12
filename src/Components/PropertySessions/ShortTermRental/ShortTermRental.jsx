import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { AppContext } from "../../../Context/AppContext";
import { numberWithCommas } from "../../../lib/utilityFunctions";
import CompsSTRTable from "./CompsSTRTable";
import ShortTermRentalTable from "./ShortTermRentalTable";

function ShortTermRental({ onClickCompsSTR, onClickSTRCount, showCompsSTR }) {
  const { result } = useContext(AppContext);
  const str = result.st;
  return (
    <div className="mx-3">
      <div className="h3 text-align-left p-3 mb-0 with-bottom-border">
        Short term rental
      </div>
      <div className="m-3">
        <Row>
          <Col>
            <Row className="arv-table-header">
              <Col>Short term rental estimate</Col>
              <Col md={3} style={{ textAlign: "end", color: "#6b46c1" }}>
                ${numberWithCommas(3150)} - ${numberWithCommas(7850)}
              </Col>
              <Col
                style={{
                  textAlign: "end",
                  fontWeight: "600",
                  fontSize: "15px",
                  color: "#6b46c1",
                }}
              >
                Max arbitrage: {Math.floor(str[3].arbitrages * 100) / 100}
              </Col>
            </Row>
            <Row>
              <ShortTermRentalTable
                onClickCompsSTR={onClickCompsSTR}
                onClickSTRCount={onClickSTRCount}
              />
            </Row>
          </Col>
        </Row>
        {showCompsSTR && (
          <Row>
            <CompsSTRTable SIMILARITY_TABLE_DATA={result.rent_comps} />
          </Row>
        )}
      </div>
    </div>
  );
}

export default ShortTermRental;
