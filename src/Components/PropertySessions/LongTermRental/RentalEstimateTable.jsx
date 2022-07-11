import React, { useContext } from 'react';
import { Button, Row, Table } from 'react-bootstrap';
import { AppContext } from '../../../Context/AppContext';

function RentalEstimateTable({ onClickCompsRent }) {
  const { result } = useContext(AppContext);
  const rent = result.rent;
  return (
    <div style={{ fontSize: "13px" }}>
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

            <td>${Math.floor(result.avgs[1]["price/sqft"] * 100) / 100}</td>
          </tr>
          <tr className="tableRow">
            <td>Count:</td>

            <td>{rent.n_rents}</td>
          </tr>
        </tbody>
      </Table>
      <Row className="justify-content-center mb-3">
        <Button size="sm" onClick={onClickCompsRent} style={{ width: "120px" }}>
          Comps rent
        </Button>
      </Row>
    </div>
  );
}

export default RentalEstimateTable;