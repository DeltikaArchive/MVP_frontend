import React, { useContext } from 'react';
import { Button, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap';
import InfoIcon from "@mui/icons-material/Info";
import { AppContext } from '../../../Context/AppContext';
import { numberWithCommas } from '../../../lib/utilityFunctions';

function ShortTermRentalTable({ onClickCompsSTR, onClickSTRCount }) {
  const { result } = useContext(AppContext);
  const str = result.st;
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
      past 12 months. This Revenue figure represents the median over the past 12
      months and does not include taxes, service fees, or additional guest fees.
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
    <div style={{ fontSize: "13px" }}>
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
            <td>${Math.floor(str[3].ADR_2021s)}</td>
            <td>{Math.floor(str[3].occs * 100)}%</td>
            <td>${numberWithCommas(str[3].REV_2021s)}</td>
            <td>${numberWithCommas(str[3].expected_incomes)}</td>
            <td>{Math.floor(str[3].arbitrages * 100) / 100}</td>
            <td
              id="STRCountCell"
              onClick={() => onClickSTRCount(str[3].sources_ids)}
            >
              {str[3].count}
            </td>
          </tr>
          <tr className="tableRow">
            <td>
              <strong>10th-25th</strong>⭐⭐
            </td>
            <td>${Math.floor(str[2].ADR_2021s)}</td>
            <td>{Math.floor(str[2].occs * 100)}%</td>
            <td>${numberWithCommas(str[2].REV_2021s)}</td>
            <td>${numberWithCommas(str[2].expected_incomes)}</td>
            <td>{Math.floor(str[2].arbitrages * 100) / 100}</td>
            <td
              id="STRCountCell"
              onClick={() => onClickSTRCount(str[2].sources_ids)}
            >
              {str[2].count}
            </td>
          </tr>
          <tr className="tableRow">
            <td>
              <strong>25th-50th</strong>⭐
            </td>
            <td>${Math.floor(str[1].ADR_2021s)}</td>
            <td>{Math.floor(str[1].occs * 100)}%</td>
            <td>${numberWithCommas(str[1].REV_2021s)}</td>
            <td>${numberWithCommas(str[1].expected_incomes)}</td>
            <td>{Math.floor(str[1].arbitrages * 100) / 100}</td>
            <td
              id="STRCountCell"
              onClick={() => onClickSTRCount(str[1].sources_ids)}
            >
              {str[1].count}
            </td>
          </tr>
          <tr className="tableRow">
            <td>
              <strong>50th-100th</strong>
            </td>
            <td>${Math.floor(str[0].ADR_2021s)}</td>
            <td>{Math.floor(str[0].occs * 100)}%</td>
            <td>${numberWithCommas(str[0].REV_2021s)}</td>
            <td>${numberWithCommas(str[0].expected_incomes)}</td>
            <td>{Math.floor(str[0].arbitrages * 100) / 100}</td>
            <td
              id="STRCountCell"
              onClick={() => onClickSTRCount(str[0].sources_ids)}
            >
              {str[0].count}
            </td>
          </tr>
        </tbody>
      </Table>
      <Row className="justify-content-center mb-2">
        <Button size="sm" onClick={onClickCompsSTR} style={{ width: "120px" }}>
          Comps STR
        </Button>
      </Row>
    </div>
  );
}

export default ShortTermRentalTable;