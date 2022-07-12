import React from 'react';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import InfoIcon from "@mui/icons-material/Info";

function OwnershipInfo() {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props} >
      Current owner details taken from the assessment.
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
            &nbsp;Ownership Information
          </h6>
        </div>
        <div style={{ fontSize: "12px" }}>
          <Row>
            <Col>Entity Name:</Col>
            <Col className="text-end">N/A</Col>
          </Row>
          <Row>
            <Col>True Owner:</Col>
            <Col className="text-end">N/A</Col>
          </Row>
          <Row>
            <Col md={8}>Number of properties:</Col>
            <Col md={4} className="text-end">
              N/A
            </Col>
          </Row>
        </div>
      </div>
    );
}

export default OwnershipInfo;