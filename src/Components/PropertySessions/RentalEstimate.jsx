import React, { useContext } from 'react';
import { Button, Col, Row, Tooltip, OverlayTrigger } from "react-bootstrap";
import InfoIcon from "@mui/icons-material/Info";
import Table from "react-bootstrap/Table";
import { AppContext } from '../../Context/AppContext';
import { numberWithCommas } from '../../lib/utilityFunctions';

function RentalEstimate({ onClickCompsRent }) {
    const { result } = useContext(AppContext);
  const rent = result.rent;
   const renderTooltip = (props) => (
     <Tooltip id="button-tooltip" {...props}>
       Comps Price/Sqft X Building Size
     </Tooltip>
   );
    return (
      <div>
        <div className="d-flex">
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <InfoIcon fontSize="" style={{ color: "#6b46c18c" }} />
          </OverlayTrigger>
          <h6 className="mb-2" style={{ fontWeight: "600" }}>
            &nbsp;Long Term Rental Estimate
          </h6>
        </div>
        <div style={{ fontSize: "12px", textAlign: "left" }}>
          <Row className="mb-3">
            <Col
              style={{ fontWeight: "600", fontSize: "15px", color: "#6b46c1" }}
            >
              ${numberWithCommas(rent.rent_price)}
            </Col>
          </Row>
          <div>
            <Table size="sm" responsive>
              <thead>
                <tr style={{ color: "#6b46c1" }}>
                  <th></th>

                  <th>Comps</th>
                </tr>
              </thead>
              <tbody>
                <tr className="tableRow">
                  <td>Price/Sqft:</td>

                  
                  
                  <td>
                    ${Math.floor(result.avgs[1]["price/sqft"] * 100) / 100}
                  </td>
                </tr>
                <tr className="tableRow">
                  <td>Count:</td>

                  <td>{rent.n_rents}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <Row className="justify-content-center mt-3">
            <Button
              size="sm"
              onClick={onClickCompsRent}
              style={{ width: "120px" }}
            >
              Comps rent
            </Button>
          </Row>
        </div>
      </div>
    );
}

export default RentalEstimate;