import React, { useContext } from 'react';
import { Button, Col, Row, Tooltip, OverlayTrigger } from "react-bootstrap";
import InfoIcon from "@mui/icons-material/Info";
import Table from "react-bootstrap/Table";
import { AppContext } from '../../Context/AppContext';
import { numberWithCommas } from '../../lib/utilityFunctions';
function ShortTermRental({ onClickCompsSTR}) {
  const { result } = useContext(AppContext)
  const str = result[ 2 ]
   const adrTooltip = (props) => (
     <Tooltip id="button-tooltip" {...props}>
       Average Daily Rate: Average booked nightly rate + cleaning fees for all
       booked days over the last year
     </Tooltip>
   );
   const occTooltip = (props) => (
     <Tooltip id="button-tooltip" {...props}>
       The number of booked days divided by the total number of days available
       for rent over the past 12 months. Properties with no reservations are
       excluded. This Occupancy Rate figure represents the median over the past
       12 months.
     </Tooltip>
   );
   const revTooltip = (props) => (
     <Tooltip id="button-tooltip" {...props}>
       The median monthly revenue (nightly rate + cleaning fees) earned over the
       past 12 months. This Revenue figure represents the median over the past
       12 months and does not include taxes, service fees, or additional guest
       fees.
     </Tooltip>
   );
   const potentialTooltip = (props) => (
     <Tooltip id="button-tooltip" {...props}>
       adr= occ*adr*30
     </Tooltip>
   );
   const arbitrageTooltip = (props) => (
     <Tooltip id="button-tooltip" {...props}>
       Potential/ Long term rental
     </Tooltip>
   );
   const countTooltip = (props) => (
     <Tooltip id="button-tooltip" {...props}>
       Number of properties in each tier
     </Tooltip>
   );
    return (
      <div>
        <div className="d-flex">
          {/* <InfoIcon fontSize="" style={{ color: "#6b46c18c" }} /> */}
          <h6 className="mb-2" style={{ fontWeight: "600" }}>
            &nbsp;Short Term Rental
          </h6>
        </div>
        <div style={{ fontSize: "12px", textAlign: "left" }}>
          <Row className="mb-3">
            <Col
              style={{ fontWeight: "600", fontSize: "15px", color: "#6b46c1" }}
            >
              Max arbitrage: {Math.floor(str[3].arbitrage * 100) / 100}
            </Col>
          </Row>
          <div>
            <Table size="sm" responsive>
              <thead>
                <tr>
                  <th></th>
                  <th>
                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 400 }}
                      overlay={adrTooltip}
                    >
                      <InfoIcon fontSize="" style={{ color: "#6b46c18c" }} />
                    </OverlayTrigger>
                    &nbsp;ADR
                  </th>
                  <th>
                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 400 }}
                      overlay={occTooltip}
                    >
                      <InfoIcon fontSize="" style={{ color: "#6b46c18c" }} />
                    </OverlayTrigger>
                    &nbsp;OCC
                  </th>
                  <th>
                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 400 }}
                      overlay={revTooltip}
                    >
                      <InfoIcon fontSize="" style={{ color: "#6b46c18c" }} />
                    </OverlayTrigger>
                    &nbsp;Revenue
                  </th>
                  <th>
                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 400 }}
                      overlay={potentialTooltip}
                    >
                      <InfoIcon fontSize="" style={{ color: "#6b46c18c" }} />
                    </OverlayTrigger>
                    &nbsp;Full Potential
                  </th>
                  <th>
                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 400 }}
                      overlay={arbitrageTooltip}
                    >
                      <InfoIcon fontSize="" style={{ color: "#6b46c18c" }} />
                    </OverlayTrigger>
                    &nbsp;Arbitrage
                  </th>
                  <th>
                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 400 }}
                      overlay={countTooltip}
                    >
                      <InfoIcon fontSize="" style={{ color: "#6b46c18c" }} />
                    </OverlayTrigger>
                    &nbsp;Count
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="tableRow">
                  <td>
                    <strong>Top 10th</strong>⭐⭐⭐
                  </td>
                  <td>${Math.floor(str[3].ADR_2021)}</td>
                  <td>{Math.floor(str[3].occ * 100)}%</td>
                  <td>${numberWithCommas(str[3].REV_2021)}</td>
                  <td>
                    ${numberWithCommas(str[3].expected_st_monthly_income)}
                  </td>
                  <td>{Math.floor(str[3].arbitrage * 100) / 100}</td>
                  <td>{str[3].count}</td>
                </tr>
                <tr className="tableRow">
                  <td>
                    <strong>10th-25th</strong>⭐⭐
                  </td>
                  <td>${Math.floor(str[2].ADR_2021)}</td>
                  <td>{Math.floor(str[2].occ * 100)}%</td>
                  <td>${numberWithCommas(str[2].REV_2021)}</td>
                  <td>
                    ${numberWithCommas(str[2].expected_st_monthly_income)}
                  </td>
                  <td>{Math.floor(str[2].arbitrage * 100) / 100}</td>
                  <td>{str[2].count}</td>
                </tr>
                <tr className="tableRow">
                  <td>
                    <strong>25th-50th</strong>⭐
                  </td>
                  <td>${Math.floor(str[1].ADR_2021)}</td>
                  <td>{Math.floor(str[1].occ * 100)}%</td>
                  <td>${numberWithCommas(str[1].REV_2021)}</td>
                  <td>
                    ${numberWithCommas(str[1].expected_st_monthly_income)}
                  </td>
                  <td>{Math.floor(str[1].arbitrage * 100) / 100}</td>
                  <td>{str[1].count}</td>
                </tr>
                <tr className="tableRow">
                  <td>
                    <strong>50th-100th</strong>
                  </td>
                  <td>${Math.floor(str[0].ADR_2021)}</td>
                  <td>{Math.floor(str[0].occ * 100)}%</td>
                  <td>${numberWithCommas(str[0].REV_2021)}</td>
                  <td>
                    ${numberWithCommas(str[0].expected_st_monthly_income)}
                  </td>
                  <td>{Math.floor(str[0].arbitrage * 100) / 100}</td>
                  <td>{str[0].count}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <Row className="justify-content-center">
            <Button
              size="sm"
              onClick={onClickCompsSTR}
              style={{ width: "120px" }}
            >
              Comps STR
            </Button>
          </Row>
        </div>
      </div>
    );
}

export default ShortTermRental;