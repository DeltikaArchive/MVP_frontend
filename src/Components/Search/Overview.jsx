import React from 'react';
import { Col, Row } from 'react-bootstrap';
import AddressInfo from '../PropertySessions/AddressInfo';
import HomeFacts from '../PropertySessions/HomeFacts';
import TrendChart from '../PropertySessions/TrendChart';

function Overview() {
    return (
      <div className="mx-3">
        <div className="h3 text-align-left p-3 mb-0 with-bottom-border">Overview</div>
        <div className="m-3">
          <Row className='align-items-center'>
            <Col>
          <AddressInfo />
            </Col>
            <Col md={6}>
              <TrendChart/>
            </Col>
          </Row>
          <Row>
          <HomeFacts />
          </Row>
        </div>
      </div>
    );
}

export default Overview;