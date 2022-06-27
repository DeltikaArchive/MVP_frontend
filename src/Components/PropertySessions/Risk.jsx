import React from 'react';
import { Button, Col, Row } from "react-bootstrap";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";

function Risk({risk}) {
    return (
        <Col className="propertySession-3"
            style={{ marginTop: "6px", marginRight: "4px" }}
        >
        <div className="d-flex">
          <ReportProblemOutlinedIcon
            fontSize=""
            //   style={{ color: "red" }}
          />
          <p className="mb-2" style={{fontSize:"13px", fontWeight: "600", color: "#fe6e00" }}>
            &nbsp;{risk.type}
          </p>
        </div>
        <div style={{ fontSize: "12px" }}>
          <Row className="text-start ms-1">{risk.level}</Row>
          {/* <Row className='justify-content-center'>
            <Button variant='link' size="sm" disabled style={{width:"70px"}}>
              More
            </Button>
          </Row> */}
        </div>
      </Col>
    );
}

export default Risk;