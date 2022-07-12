import React, { useContext } from 'react';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import AmenityAffectChart from '../ARV/AmenityAffectChart';
import RentalEstimateTable from './RentalEstimateTable';
import InfoIcon from "@mui/icons-material/Info";
import CompsRentTable from './CompsRentTable';
import { AppContext } from '../../../Context/AppContext';
import { numberWithCommas } from '../../../lib/utilityFunctions';


function LongTermRental({ onClickCompsRent, showCompsRent }) {
  const { result } = useContext(AppContext);
    const rent = result.rent;
    
      const ltrTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Comps Price/Sqft X Building Size
        </Tooltip>
      );
  return (
    <div className="mx-3">
      <div className="h3 text-align-left p-3 mb-0 with-bottom-border">
        Long term rental{" "}
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={ltrTooltip}
        >
          <InfoIcon className="note-trigger" fontSize="small" />
        </OverlayTrigger>
      </div>
      <div className="m-3">
        <Row>
          <Col>
            <Row className="arv-table-header">
              <Col>Long term rental estimate</Col>
              <Col md={3} style={{ textAlign: "end", color: "#0ca789" }}>
                ${numberWithCommas(rent.rent_price)}
              </Col>
            </Row>
            <Row>
              <RentalEstimateTable onClickCompsRent={onClickCompsRent} />
            </Row>
          </Col>
          <Col>
            <Row>
              <AmenityAffectChart />
            </Row>
          </Col>
        </Row>
        {showCompsRent && (
          <Row>
            <CompsRentTable SIMILARITY_TABLE_DATA={result.rent_comps} />
          </Row>
        )}
      </div>
    </div>
  );
}

export default LongTermRental;