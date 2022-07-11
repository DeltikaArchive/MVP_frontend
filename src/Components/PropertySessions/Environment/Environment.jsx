import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { AppContext } from "../../../Context/AppContext";
import Risk from "./Risk";

function Environment() {
  const { result } = useContext(AppContext);
  const risks = [
    {
      type: "Flood",
    //   level: `${result.risk.flood_zone}`,
      level: 'Low Risk, Zone V',
    },
    {
      type: "Crime",
      level: "Low crime",
    },
    {
      type: "Railroad",
      level: "0.2 mi. away",
    },
    {
      type: "Airports",
      level: "0.2 mi. away",
    },
  ];
  return (
    <div className="mx-3">
      <div className="h3 text-align-left p-3 mb-0 with-bottom-border">
        Environment indicators
      </div>
      <div className="m-3">
        <Row>
          {risks.map((risk, index) => (
            <Risk risk={risk} key={index} />
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Environment;
