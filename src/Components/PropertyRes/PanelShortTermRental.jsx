import React, { useState, useContext, useEffect } from "react";
import { Heading, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { AppContext } from "../../Context/AppContext";
import { numberWithCommas } from "../../lib/utilityFunctions";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Charts from "./Charts";
import { v4 as uuidv4 } from "uuid";

export default function PanelShortTermRental() {
  const { selectedProperty } = useContext(AppContext);
  const [expandShortTermRental, setExpandShortTermRental] = useState(false);
  const [extraExp, setExtraExp] = useState([]);
  const [extraExpTotal, setExtraExpTotal] = useState(0);

  const handleAddLine = () => {
    setExtraExp((oldData) => [...oldData, { id: uuidv4(), value: 0 }]);
  };
  const updateCellValue = (id, number) => {
    let sum = 0;
    let newArr = [...extraExp];
    newArr.forEach((element) => {
      if (element.id === id) element.value = parseFloat(number);
      sum = sum + element.value;
    });
    setExtraExpTotal(sum);
  };

  const handleTrash = async (id) => {
    let sum = 0;
    setExtraExp(() => extraExp.filter((exp) => exp.id !== id));
    extraExp.forEach((element) => {
      if (element.id !== id) sum = sum + element.value;
    });
    setExtraExpTotal(sum);
  };

  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-row ">
        <div className="p-3 my-1 me-1 w-50">
          <div className="d-flex flex-column ">
            <Heading size="md" className="mb-1 me-auto">
              Property potential:
            </Heading>
            <div className="flexRowBetween">
              <div>property type</div>
              <div>{selectedProperty && selectedProperty.property_type}</div>
            </div>
            <div className="flexRowBetween">
              <div>year built</div>
              <div>{selectedProperty && selectedProperty.year_built}</div>
            </div>
            <div className="flexRowBetween">
              <div>Lot Size</div>
              <div>{selectedProperty && numberWithCommas(selectedProperty.lot_size)} Sq.Ft.</div>
            </div>
            <div className="flexRowBetween">
              <div>Building Size</div>
              <div>{selectedProperty && numberWithCommas(selectedProperty.lot_sqf)} Sq.Ft.</div>
            </div>
            <div className="flexRowBetween">
              <div>Price per Sqft- long term:</div>
              <div>${selectedProperty && selectedProperty.LATER}</div>
            </div>
            <div className="flexRowBetween">
              <div>Capex:</div>
              <div>${selectedProperty && selectedProperty.LATER}</div>
            </div>
            <div className="flexRowBetween">
              <div>
                <span onClick={() => setExpandShortTermRental((prev) => !prev)} className="expandAlignment">
                  {expandShortTermRental ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                </span>
                <span>Short term rental income:</span>
              </div>
              <div>$/mo</div>
            </div>
            {expandShortTermRental && (
              <div className="d-flex flex-column border p-3 mb-1">
                <Heading size="md" className="mb-1 me-auto">
                  Revenue Potential:
                </Heading>
                <Table variant="simple" size="sm" className="table-tiny my-1">
                  <Thead>
                    <Tr>
                      <Th></Th>
                      <Th>💲ADR</Th>
                      <Th>👨‍👩‍👧‍👧OCC</Th>
                      <Th>💰Revenue</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td className="flexColCenter">
                        <p>⭐⭐⭐</p> Top 10%
                      </Td>
                      <Td>$</Td>
                      <Td>%</Td>
                      <Td>$</Td>
                    </Tr>
                    <Tr>
                      <Td className="flexColCenter">
                        <p>⭐⭐</p> Top 25%
                      </Td>
                      <Td>$</Td>
                      <Td>%</Td>
                      <Td>$</Td>
                    </Tr>
                    <Tr>
                      <Td className="flexColCenter">
                        <p>⭐</p> Top 50%
                      </Td>
                      <Td>$</Td>
                      <Td>%</Td>
                      <Td>$</Td>
                    </Tr>
                  </Tbody>
                </Table>

                <Charts />
              </div>
            )}
            <div className="flexRowBetween">
              <div>Property value:</div>
              <div>$ M</div>
            </div>
          </div>
        </div>
        <div className="p-3 my-1 me-1 w-50">
          <div className="d-flex flex-column ">
            <Heading size="md" className="mb-1 me-auto">
              Estimated costs:
            </Heading>
            <div className="flexRowBetween">
              <div>Closing costs:</div>
              <div>$</div>
            </div>
            <div className="flexRowBetween">
              <div>Acquisition fee:</div>
              <div>$</div>
            </div>
            <div className="flexRowBetween">
              <div>Fixed expenses:</div>
              <div>$</div>
            </div>
            <div className="flexRowBetween">
              <div>One -time expenses:</div>
              <div>$</div>
            </div>
            <div className="flexRowBetween">
              <div>HOA:</div>
              <div>$/month</div>
            </div>
            {extraExp.map((cell, i) => {
              return (
                <div key={cell.id} className="flexRowBetween nowrap">
                  <input type="text" placeholder="add expense name" className="border-bottom" />
                  <div className="flexRowBetween nowrap">
                    $
                    <input
                      type="number"
                      onChange={(e) => {
                        updateCellValue(cell.id, e.target.value);
                      }}
                      className="addExpense"
                    />
                    <span className="trash ">
                      <DeleteForeverIcon
                        onClick={() => {
                          handleTrash(cell.id);
                        }}
                      />
                    </span>
                  </div>
                </div>
              );
            })}
            <div className="align-self-start">
              <AddIcon onClick={() => handleAddLine()} />
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-row ">
        <div className="p-3 my-1 me-1 w-50">
          <hr className="total" />
          <div className="flexRowBetween">
            <Heading size="md">Estimated Income:</Heading>
            <Heading size="md">$</Heading>
          </div>
          <div className="flexRowBetween">
            <Heading size="md">Estimated Profit:</Heading>
            <Heading size="md">$</Heading>
          </div>
        </div>
        <div className="p-3 my-1 me-1 w-50">
          <hr className="total" />
          <div className="flexRowBetween">
            <Heading size="md">Estimated Cost:</Heading>
            <Heading size="md">${extraExpTotal}</Heading>
          </div>
          <div className="flexRowBetween">
            <Heading size="md">Total Investment costs:</Heading>
            <Heading size="md">$</Heading>
          </div>
        </div>
      </div>
    </div>
  );
}
