import React, { useContext } from 'react';
import { Button, Row, Table } from 'react-bootstrap';
import { AppContext } from '../../../Context/AppContext';
import { numberWithCommas } from '../../../lib/utilityFunctions';

function ARVTable({ onClickCompsSale }) {
  const { result } = useContext(AppContext);
  const arv = result.sales;
  return (
    <div style={{fontSize:"13px"}}>
      <Table size="sm" responsive>
        <thead>
          <tr style={{ color: "#6b46c1", textAlign: "left" }}>
            <th></th>
            <th>Property</th>
            <th>Comps</th>
          </tr>
        </thead>
        <tbody>
          <tr className="tableRow">
            <td>Price/Sqft:</td>
            <td>
              $
              {numberWithCommas(
                result.info.listing_price / result.info.building_area
              )}
            </td>
            <td>${numberWithCommas(result.avgs[0]["price/sqft"])}</td>
          </tr>
          <tr className="tableRow">
            <td>Avg.DOM:</td>
            <td></td>
            <td>N/A days</td>
          </tr>
          <tr className="tableRow">
            <td>Count:</td>
            <td></td>
            <td>{arv.n_sales}</td>
          </tr>
        </tbody>
      </Table>
      <Row className="justify-content-center">
        <Button size="sm" onClick={onClickCompsSale} style={{ width: "120px" }}>
          Comps Sale
        </Button>
      </Row>
    </div>
  );
}

export default ARVTable;