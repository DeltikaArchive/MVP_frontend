import React from 'react';
import { Col, Row } from 'react-bootstrap';
import AddressInfo from './AddressInfo';
import HomeFacts from './HomeFacts';
import OverviewChart from './OverviewChart';

function Overview() {
    return (
      <div className="mx-3">
        <div className="h3 text-align-left p-3 mb-0 with-bottom-border">Overview</div>
        <div className="m-3">
          <Row className='align-items-center mb-3'>
            <Col>
          <AddressInfo />
            </Col>
            <Col md={5}>
              <OverviewChart/>
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