import React, { useState, useContext, useEffect } from "react";
import { Heading, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { AppContext } from "../../Context/AppContext";
import { numberWithCommas, riskFactor } from "../../lib/utilityFunctions";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import WaterRoundedIcon from "@mui/icons-material/WaterRounded";
import AirRoundedIcon from "@mui/icons-material/AirRounded";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import PublicIcon from "@mui/icons-material/Public";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import GaugeChart from "react-gauge-chart";

export default function PropertyInfo() {
  const [moreViolations, setMoreViolations] = useState(false);
  const [moreCrimes, setMoreCrimes] = useState(false);
  const [moreFlood, setMoreFlood] = useState(false);
  const [moreFire, setMoreFire] = useState(false);
  const [moreEarthquake, setMoreEarthquake] = useState(false);
  const [moreHurricane, setMoreHurricane] = useState(false);

  const { selectedProperty, setPropertyResTab, setSpecialIndicatorsTab, setMapZoom } = useContext(AppContext);

  const closeAll = () => {
    setMoreViolations(false);
    setMoreCrimes(false);
    setMoreFlood(false);
    setMoreFire(false);
    setMoreEarthquake(false);
    setMoreHurricane(false);
  };

  const handleMoreAmenities = () => {
    setPropertyResTab(3);
    setSpecialIndicatorsTab(2);
  };
  const handleMoreMortgage = () => {
    setPropertyResTab(3);
    setSpecialIndicatorsTab(0);
  };

  const handleMoreCrimes = () => {
    closeAll();
    setMoreCrimes((prev) => !prev);
    setMapZoom(13);
  };

  return (
    <>
      <div className=" d-flex flex-column fixWidth800">
        <div className=" d-flex fixWidth800">
          <div className="d-flex flex-column border p-2 my-1 me-1 w-50">
            <Heading size="md" className="mb-1">
              Home Facts:
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
              <div>Num. of Building:</div>
              <div>{selectedProperty && selectedProperty.buildings}</div>
            </div>
            <div className="flexRowBetween">
              <div>Num. of Floors:</div>
              <div>{selectedProperty && selectedProperty.floors}</div>
            </div>
            <div className="flexRowBetween">
              <div>Num. of Units:</div>
              <div>{selectedProperty && selectedProperty.units}</div>
            </div>
            <div className="flexRowBetween">
              <div>Num. of Parkings:</div>
              <div>{selectedProperty && selectedProperty.parkings}</div>
            </div>
            <div className="flexRowBetween">
              <div>HOA</div>
              <div>{selectedProperty && numberWithCommas(selectedProperty.HOA)}$/month</div>
            </div>
            <div className="flexRowBetween">
              <div>Below Market Units:</div>
              <div>{selectedProperty && selectedProperty.below_market} units</div>
            </div>
            <div className="flexRowBetween">
              <div>Rent Control</div>
              <div>{selectedProperty && numberWithCommas(selectedProperty.rent_control)}% Annually</div>
            </div>
          </div>
          <div className="d-flex flex-column border p-2 my-1 ms-1 w-50">
            <div>
              <Heading size="md" className="mb-3">
                Amenities
              </Heading>
              <div className="d-flex flex-row">
                <div className="w-50">
                  <Heading size="sm" className="mb-3">
                    Community Amenities
                  </Heading>
                  {/* {selectedProperty.Community_amenities.map((kind, i) => {
              return <p key={i}>{kind}</p>;
            })} */}
                </div>
                <div className="w-50">
                  <Heading size="sm" className="mb-3">
                    Interior Amenities
                  </Heading>
                  {/* {selectedProperty.Interior_amenities.map((kind, i) => {
                  return <p key={i}>{kind}</p>;
                })} */}
                </div>
              </div>
              <button className="mt-auto moreInfo" onClick={() => handleMoreAmenities()}>
                More
              </button>
            </div>
            <div className="">
              <Heading size="md" className="my-3">
                Mortgage Information
              </Heading>
              <div className="flexRowBetween">
                <div>Loan Amount:</div>
                <div>
                  $
                  {selectedProperty &&
                    selectedProperty["loans_list"] &&
                    numberWithCommas(selectedProperty["loans_list"][selectedProperty["loans_list"].length - 1].amount)}
                </div>
              </div>
              <div className="flexRowBetween">
                <div>Maturity Date :</div>
                <div>
                  {selectedProperty &&
                    selectedProperty["loans_list"] &&
                    selectedProperty["loans_list"][selectedProperty["loans_list"].length - 1].date_of_maturity}
                </div>
              </div>
              <button className="mt-auto moreInfo" onClick={() => handleMoreMortgage()}>
                More
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="d-flex hazardWrapper border p-2">
            <div className="flexRowBetween mt-3 allHazards">
              <div className="hazardsContainer">
                <p className="mb-1 hazardTitle">
                  <ReportProblemRoundedIcon />
                  Violations
                </p>
                <p className="hazardText">
                  {selectedProperty &&
                    selectedProperty["violations_list"] &&
                    selectedProperty["violations_list"].length}{" "}
                  Recent
                </p>
                <button
                  className="mt-auto moreInfo"
                  onClick={() => {
                    closeAll();
                    setMoreViolations((prev) => !prev);
                  }}
                >
                  {moreViolations ? "" : "More"}
                </button>
              </div>
              <div className="hazardsContainer">
                <p className="mb-1 hazardTitle">
                  <FmdBadIcon />
                  Crimes
                </p>
                <p className="hazardText">
                  {selectedProperty && selectedProperty["crimes_list"] && selectedProperty["crimes_list"].length} Recent
                </p>
                <button className="mt-auto moreInfo" onClick={() => handleMoreCrimes()}>
                  {moreCrimes ? "" : "More"}
                </button>
              </div>
              <div className="hazardsContainer">
                <p className="mb-1 hazardTitle">
                  <WaterRoundedIcon />
                  Flood Zone
                </p>
                <p className="hazardText">{riskFactor(RISKS.flood)} Risk</p>
                <button
                  className="mt-auto moreInfo"
                  onClick={() => {
                    closeAll();
                    setMoreFlood((prev) => !prev);
                  }}
                >
                  {moreFlood ? "" : "More"}
                </button>
              </div>
              <div className="hazardsContainer">
                <p className="mb-1 hazardTitle">
                  <PublicIcon />
                  Earthquake Zone
                </p>
                <p className="hazardText">{riskFactor(RISKS.earthquake)} Risk</p>
                <button
                  className="mt-auto moreInfo"
                  onClick={() => {
                    closeAll();
                    setMoreEarthquake((prev) => !prev);
                  }}
                >
                  {moreEarthquake ? "" : "More"}
                </button>
              </div>
              <div className="hazardsContainer">
                <p className="mb-1 hazardTitle">
                  <LocalFireDepartmentIcon />
                  Fire Zone
                </p>
                <p className="hazardText">{riskFactor(RISKS.fire)} Risk</p>
                <button
                  className="mt-auto moreInfo"
                  onClick={() => {
                    closeAll();
                    setMoreFire((prev) => !prev);
                  }}
                >
                  {moreFire ? "" : "More"}
                </button>
              </div>
              <div className="hazardsContainer">
                <p className="mb-1 hazardTitle">
                  <LocalFireDepartmentIcon />
                  Hurricane Zone
                </p>
                <p className="hazardText">{riskFactor(RISKS.hurricane)} Risk</p>
                <button
                  className="mt-auto moreInfo"
                  onClick={() => {
                    closeAll();
                    setMoreHurricane((prev) => !prev);
                  }}
                >
                  {moreHurricane ? "" : "More"}
                </button>
              </div>
            </div>
          </div>
          {moreViolations && (
            <div className="mt-3">
              <Heading size="md" className="">
                <ReportProblemRoundedIcon />
                Violations
                <ReportProblemRoundedIcon />
              </Heading>
              <Tabs>
                <TabList>
                  <Tab className="violationsTabs">
                    Open({selectedProperty["violations_list"] && selectedProperty["violations_list"].length})
                  </Tab>
                  <Tab className="violationsTabs">Closed({CLOSED_VIOLATIONS_DATA.length})</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel className="setZero">
                    <Table variant="simple" size="sm" className="violationsTable mb-5">
                      <Thead>
                        <Tr>
                          <Th>Case Number</Th>
                          <Th>Date Case Generated</Th>
                          <Th>Date Case Closed</Th>
                          <Th>Parcel Identification Number (PIN)</Th>
                          <Th>Case Type</Th>
                          <Th>Area Planning Commission (APC)</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {selectedProperty["violations_list"] &&
                          selectedProperty["violations_list"].map((row, i) => {
                            if (row.propId === selectedProperty.id) {
                              return (
                                <Tr key={i}>
                                  <Td>{row.case_number}</Td>
                                  <Td>{row.date_case_generated}</Td>
                                  <Td>{row.date_case_closed}</Td>
                                  <Td>{row.parcel_identification}</Td>
                                  <Td>{row.case_type}</Td>
                                  <Td>{row.area_planning}</Td>
                                </Tr>
                              );
                            }
                            return;
                          })}
                      </Tbody>
                    </Table>
                  </TabPanel>
                  <TabPanel className="setZero">
                    <Table variant="simple" size="sm" className="violationsTable mb-5">
                      <Thead>
                        <Tr>
                          <Th>Case Number</Th>
                          <Th>Date Case Generated</Th>
                          <Th>Date Case Closed</Th>
                          <Th>Parcel Identification Number (PIN)</Th>
                          <Th>Case Type</Th>
                          <Th>Area Planning Commission (APC)</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {CLOSED_VIOLATIONS_DATA.map((row, i) => {
                          if (row.propId === selectedProperty.id) {
                            return (
                              <Tr key={i}>
                                <Td>{row.caseNumber}</Td>
                                <Td>{row.dateCaseGenerated}</Td>
                                <Td>{row.dateCaseClosed}</Td>
                                <Td>{row.parcelIdentification}</Td>
                                <Td>{row.caseType}</Td>
                                <Td>{row.areaPlanningCommission}</Td>
                              </Tr>
                            );
                          }
                          return;
                        })}
                      </Tbody>
                    </Table>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          )}
          {moreCrimes && (
            <div className="mt-3">
              <Heading size="md" className="mb-1">
                <FmdBadIcon />
                Crimes
                <FmdBadIcon />
              </Heading>
              <p className=" mt-2">Showing crimes occurred 1/4 miles from the property</p>
              <Table variant="simple" size="sm" className="violationsTable mb-5 mt-1">
                <Thead>
                  <Tr>
                    <Th>Date Occurred</Th>
                    <Th>Crime Code Description</Th>
                    <Th>Premis Description</Th>
                    <Th>Distance (miles)</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {selectedProperty["crimes_list"] &&
                    selectedProperty["crimes_list"].map((row, i) => {
                      return (
                        <Tr key={i}>
                          <Td>{row.DATE_OCC.slice(0, 10)}</Td>
                          <Td>{row.Crm_Cd_Desc}</Td>
                          <Td>{row.Premis_Desc}</Td>
                          <Td>{row.distance.toFixed(2)} mile</Td>
                        </Tr>
                      );
                    })}
                </Tbody>
              </Table>
            </div>
          )}
          {moreFlood && (
            <div className="mt-3">
              <div className="flexRowAround">
                <div className="moreWarnings">
                  <Heading size="md" className="mb-1">
                    <WaterRoundedIcon />
                    Flood Zone
                    <WaterRoundedIcon />
                  </Heading>
                  <p className="gaugeText mt-2">There is a {RISKS.flood}% chance of flooding every year</p>
                </div>
                <div>
                  <GaugeChart
                    id="gauge-flood"
                    arcsLength={[0.33, 0.33, 0.33]}
                    textColor={"black"}
                    colors={["#E0E0E0", "#D5AA95", "#CA764B"]}
                    percent={RISKS.flood / 100}
                    arcPadding={0.01}
                    style={{ width: "70%" }}
                  />
                </div>
              </div>
            </div>
          )}
          {moreEarthquake && (
            <div className="mt-3">
              <div className="flexRowAround">
                <div className="moreWarnings">
                  <Heading size="md" className="">
                    <PublicIcon />
                    Earthquake Zone
                    <PublicIcon />
                  </Heading>
                  <p className="gaugeText mt-2">There is a {RISKS.earthquake}% chance of earthquake every year</p>
                </div>
                <div>
                  <GaugeChart
                    id="gauge-earthquake"
                    arcsLength={[0.33, 0.33, 0.33]}
                    textColor={"black"}
                    colors={["#E0E0E0", "#D5AA95", "#CA764B"]}
                    percent={RISKS.earthquake / 100}
                    arcPadding={0.01}
                    style={{ width: "70%" }}
                  />
                </div>
              </div>
            </div>
          )}
          {moreFire && (
            <div className="mt-3">
              <div className="flexRowAround">
                <div className="moreWarnings">
                  <Heading size="md" className="">
                    <LocalFireDepartmentIcon />
                    Fire Zone
                    <LocalFireDepartmentIcon />
                  </Heading>
                  <p className="gaugeText mt-2">There is a {RISKS.fire}% chance of fire every year</p>
                </div>
                <div>
                  <GaugeChart
                    id="gauge-fire"
                    arcsLength={[0.33, 0.33, 0.33]}
                    textColor={"black"}
                    colors={["#E0E0E0", "#D5AA95", "#CA764B"]}
                    percent={RISKS.fire / 100}
                    arcPadding={0.01}
                    style={{ width: "70%" }}
                  />
                </div>
              </div>
            </div>
          )}
          {moreHurricane && (
            <div className="mt-3">
              <div className="flexRowAround">
                <div className="moreWarnings">
                  <Heading size="md" className="">
                    <AirRoundedIcon />
                    Hurricane Zone
                    <AirRoundedIcon />
                  </Heading>
                  <p className="gaugeText mt-2">There is a {RISKS.hurricane}% chance of hurricane every year</p>
                </div>
                <div>
                  <GaugeChart
                    id="gauge-hurricane"
                    arcsLength={[0.33, 0.33, 0.33]}
                    textColor={"black"}
                    colors={["#E0E0E0", "#D5AA95", "#CA764B"]}
                    percent={RISKS.hurricane / 100}
                    arcPadding={0.01}
                    style={{ width: "70%" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const RISKS = { flood: 1, earthquake: 70, fire: 40, hurricane: 5 };

const CLOSED_VIOLATIONS_DATA = [
  {
    propId: 0,
    caseNumber: 528681,
    LADBSInspectionDistrict: 2130,
    dateCaseGenerated: "01/01/0014",
    dateCaseClosed: "02/10/0015",
    parcelIdentification: "189B129   145",
    caseType: "GENERAL",
    areaPlanningCommission: "Texas",
  },
];
