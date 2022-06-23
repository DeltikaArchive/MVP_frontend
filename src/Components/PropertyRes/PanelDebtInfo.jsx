import React, { useState, useContext, useEffect } from "react";
import { Heading } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { AppContext } from "../../Context/AppContext";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { numberWithCommas, fixInterestRatePercent, checkIfDatePassed } from "../../lib/utilityFunctions";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";

export default function PanelDebtInfo() {
  const { selectedProperty } = useContext(AppContext);
  const [expand, setExpand] = useState(false);
  const [expandID, setExpandID] = useState(null);
  const [targetCapRate, setTargetCapRate] = useState(8);
  const [cashOut, setCashOut] = useState(0);
  const [totalLoanBalance, setTotalLoanBalance] = useState(0);
  const [acquisitionValue, setAcquisitionValue] = useState(null);

  //needs update after roei update extra loan data
  useEffect(() => {
    if (selectedProperty && selectedProperty["loans_list"] && selectedProperty["loans_list"].length > 0)
      setTotalLoanBalance(selectedProperty["loans_list"][selectedProperty["loans_list"].length - 1].current_amount);
    if (
      selectedProperty &&
      typeof selectedProperty.possible_refi === "number" &&
      typeof totalLoanBalance === "number"
    ) {
      setCashOut(Math.round(selectedProperty.possible_refi) - Math.round(totalLoanBalance));
    } else {
      setCashOut(0);
    }
    return () => {
      setCashOut(0);
    };
  }, [selectedProperty]);

  return (
    <>
      <div className=" d-flex flex-column fixWidth800 mt-1">
        <Heading size="md" className="mb-3">
          Debt information:
        </Heading>
        <div>
          {selectedProperty &&
            selectedProperty["loans_list"] &&
            selectedProperty["loans_list"].map((loan, i) => {
              return (
                <div key={i}>
                  <Table variant="simple" size="sm" id="debtInfo">
                    <Thead>
                      <Tr>
                        <Th></Th>
                        <Th>Loan amount</Th>
                        <Th>Origination Date</Th>
                        <Th>Interest Rate </Th>
                        <Th>I/O</Th>
                        <Th>Maturity Date</Th>
                        <Th>Lender name </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Th onClick={() => setExpand((prev) => !prev)}>
                          {!expand && <ChevronRightIcon />}
                          {expand && <ExpandMoreIcon />}
                        </Th>
                        <Td>${numberWithCommas(loan.amount)}</Td>
                        <Td>{loan.origination_date}</Td>
                        <Td>{fixInterestRatePercent(loan.interest_rate)}%</Td>
                        <Td>{loan.interest_only_period}</Td>
                        <Td>
                          {loan.date_of_maturity}
                          <span className={checkIfDatePassed(loan.date_of_maturity) ? "d-none" : ""}>🟢</span>
                        </Td>
                        <Td className="loanTableWidth">{loan.lender_name}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                  {expand && (
                    <div>
                      <div className="mt-1 d-flex">
                        <Table variant="unstyled" size="sm" className="w-50 border">
                          <Tbody>
                            <Tr>
                              <Td>Loan type:</Td>
                              <Td isNumeric className="debtTableText">
                                {loan.type}
                              </Td>
                            </Tr>
                            <Tr>
                              <Td>Amortization:</Td>
                              <Td className="debtTableText">{loan.term / 12} Years</Td>
                            </Tr>
                            <Tr>
                              <Td>Loan balance:</Td>
                              <Td isNumeric className="debtTableText">
                                ${numberWithCommas(loan.loan_balance)}
                              </Td>
                            </Tr>
                          </Tbody>
                        </Table>

                        <Table variant="unstyled" size="sm" className="w-50 border">
                          <Tbody>
                            <Tr>
                              <Td>Origination apprisal:</Td>
                              <Td isNumeric className="debtTableText">
                                ${numberWithCommas(loan.appraisal_value)}
                              </Td>
                            </Tr>
                            <Tr>
                              <Td>Origination NOI:</Td>
                              <Td isNumeric className="debtTableText">
                                ${numberWithCommas(loan.noi)}
                              </Td>
                            </Tr>
                            <Tr>
                              <Td>Acquisition Cap Rate:</Td>
                              <Td isNumeric className="debtTableText">
                                {(loan.cap_rate_doo * 100).toFixed(1)}%
                              </Td>
                            </Tr>
                          </Tbody>
                        </Table>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

          <div className="mt-1 d-flex flex-column">
            <div className="d-flex flex-row justify-content-around">
              <Heading size="md" className="mt-3 mb-1 ms-3">
                Seller Motivation:
              </Heading>
              <Heading size="md" className="mt-3 mb-1 ms-3">
                Buyer Motivation:
              </Heading>
            </div>
            <div className="d-flex flex-row">
              <Table variant="unstyled" size="sm" className="w-50">
                <Tbody>
                  <Tr>
                    <Td>Est. current NOI</Td>
                    <Td isNumeric className="debtTableText">
                      $
                      {selectedProperty &&
                        selectedProperty["loans_list"] &&
                        selectedProperty["loans_list"][selectedProperty["loans_list"].length - 1].noi}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Total Loan Balance:</Td>
                    <Td isNumeric className="debtTableText">
                      ${totalLoanBalance ? numberWithCommas(totalLoanBalance) : totalLoanBalance}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Possible Refi:</Td>
                    <Td className="debtTableText">
                      {selectedProperty ? numberWithCommas(selectedProperty.possible_refi) : "n/a"}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      Cash Out:
                      <span className={cashOut >= 0 ? "d-none" : "cashOut ms-1"}>
                        <FlagRoundedIcon className={cashOut >= 0 ? "d-none" : "cashOutIcon"} />
                        <span className="cashOutText">High likelihood to be sold</span>
                      </span>
                    </Td>
                    <Td isNumeric className="debtTableText">
                      ${numberWithCommas(cashOut)}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>DSR:</Td>
                    <Td isNumeric className="debtTableText">
                      {selectedProperty &&
                        selectedProperty["loans_list"] &&
                        selectedProperty["loans_list"][selectedProperty["loans_list"].length - 1].dsr}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
              <div>
                <Table variant="unstyled" size="sm">
                  <Tbody>
                    <Tr>
                      <Td>Comps Cap Rate:</Td>
                      <Td isNumeric className="debtTableText">
                        {selectedProperty ? (selectedProperty.cap_rate_avg * 100).toFixed(1) : "n/a"}%
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Target Cap Rate:</Td>
                      <Td isNumeric className="debtTableText">
                        <input
                          type="number"
                          value={targetCapRate}
                          onChange={(e) => {
                            setTargetCapRate(e.target.value);
                          }}
                          className="indicators px-1"
                        />
                        %
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
                <div className="mt-2 ms-2">Maximum bid on current NOI [Comps Cap rate]:</div>
                <div className="mb-2 ms-2">
                  <b>N/A</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
