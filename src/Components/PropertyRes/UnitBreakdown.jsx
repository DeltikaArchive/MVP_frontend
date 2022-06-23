import React, { useState } from "react";
import { Heading, Radio, Stack } from "@chakra-ui/react";
import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined";
import ShowerOutlinedIcon from "@mui/icons-material/ShowerOutlined";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption } from "@chakra-ui/react";

export default function UnitBreakdown() {
  const [trend, setTrend] = useState("100");
  const [ami, setAmi] = useState("100");
  const data = [
    { beds: 2, bath: 2, units: 2, sqft: 500, rent: 1000, trend: 3, ami: 980 },
    { beds: 2, bath: 1, units: 30, sqft: 700, rent: 2000, trend: 5, ami: 1080 },
  ];

  return (
    <div className="d-flex flex-column">
      <Heading size="md" className="mb-3 align-self-start">
        Unit Breakdown:
      </Heading>
      <div>
        <Table variant="simple" id="unitBreakdownTable" className="mb-3">
          <Thead>
            <Tr>
              <Th>Units</Th>
              <Th>
                Number of
                <br />
                units
              </Th>
              <Th>Sqft.</Th>
              <Th>Rent</Th>
              <Th>$/Sqft.</Th>

              <Th>
                Trend
                <br />
                <select className="mt-1" aria-label="Trend" value={trend} onChange={setTrend}>
                  <option value="5">5Y</option>
                  <option value="4">4Y</option>
                  <option value="3">3Y</option>
                  <option value="2">2Y</option>
                  <option value="1">1Y</option>
                </select>
              </Th>
              <Th>
                AMI
                <br />
                <select className="mt-1" aria-label="AMI" value={ami} onChange={setAmi}>
                  <option value="100">100%</option>
                  <option value="80">80%</option>
                  <option value="70">70%</option>
                  <option value="50">50%</option>
                </select>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((line, i) => {
              return (
                <Tr key={i}>
                  <Td>
                    {line.beds}
                    <KingBedOutlinedIcon /> {line.bath} <ShowerOutlinedIcon />
                  </Td>
                  <Td>{line.units}</Td>
                  <Td>{line.sqft}</Td>
                  <Td>
                    {line.rent} <br />
                    <span className="unitBreakdownMiniText">15% bellow avg.</span>
                  </Td>
                  <Td>
                    ${(line.rent / line.sqft).toFixed(1)}
                    <br />
                    <span className="unitBreakdownMiniText">15% bellow avg.</span>
                  </Td>
                  <Td>{line.trend}%</Td>
                  <Td>
                    ${line.ami}
                    <br />
                    <span className="unitBreakdownMiniText">15% above AMI.</span>
                  </Td>
                </Tr>
              );
            })}
            <Tr id="unitBreakdownTableSummery">
              <Td>Total</Td>
              <Td>{data.reduce((a, b) => a.units + b.units)}</Td>
              <Td>{data.reduce((a, b) => a.sqft + b.sqft)}</Td>
              <Td>
                {data.reduce((a, b) => a.rent + b.rent)} <br />
                <span className="unitBreakdownMiniText">15% bellow avg.</span>
              </Td>
              <Td>
                ${(data.reduce((a, b) => a.rent + b.rent) / data.reduce((a, b) => a.sqft + b.sqft)).toFixed(1)}
                <br />
                <span className="unitBreakdownMiniText">15% bellow avg.</span>
              </Td>
              <Td>{data.reduce((a, b) => a.trend + b.trend) / data.length}%</Td>
              <Td>
                ${data.reduce((a, b) => a.ami + b.ami) / data.length}
                <br />
                <span className="unitBreakdownMiniText">15% above AMI.</span>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </div>
    </div>
  );
}
