import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import { Chart } from "react-google-charts";
import PopulationGrowth from "../Components/Macro/PopulationGrowth";
import InflationRate from "../Components/Macro/InflationRate";
import PovertyRate from "../Components/Macro/PovertyRate";
import TotalCrimes from "../Components/Macro/TotalCrimes";
import MedianIncome from "../Components/Macro/MedianIncome";
import UnemploymentRate from "../Components/Macro/UnemploymentRate";
import Education from "../Components/Macro/Education";
import Cpi from "../Components/Macro/Cpi";
import EmploymentRate from "../Components/Macro/EmploymentRate";
import MigrationTo from "../Components/Macro/MigrationTo";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import Sidebar from "../Components/Sidebar";
import MacroBar from "../Components/Macro/MacroBar";
import MainMap from "./MainMap";

export default function Macro() {
  let navigate = useNavigate();
  const { selectedId, setLoggedInUser } = useContext(AppContext);
  const [isMapOpened, setIsMapOpened] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser(user);
      } else {
        navigate(`/`);
      }
    });
  }, [selectedId, setLoggedInUser, navigate]);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="d-flex flex-column">
        <MacroBar />

        <div id="macro" className="d-flex flex-row">
          <div
            className={
              isMapOpened ? "d-flex flex-column fixWidth800" : "mapOpen"
            }
          >
            <div className="d-flex flex-column">
              <div id="macroContainer" className="d-flex ">
                <PopulationGrowth />
                <InflationRate />
                <PovertyRate />
                <TotalCrimes />
                <MedianIncome />
                <EmploymentRate />
                <UnemploymentRate />
                <Education />
                <Cpi />
              </div>
              <MigrationTo />
              <div className="d-flex mt-3 d-none">
                <div className="d-flex flex-column w-50 p-2  me-1">
                  <Heading size="md" className="mb-1 pushLeft">
                    Job Growth:
                  </Heading>
                  <Chart
                    chartType="LineChart"
                    width="100%"
                    height="200px"
                    data={FAKE_DATA}
                    options={{
                      legend: { position: "bottom" },
                      chartArea: { width: "80%", height: "70%" },
                      curveType: "function",
                      hAxis: { minValue: 1969 },
                    }}
                  />
                </div>
                <div className="d-flex flex-column w-50 p-2 ms-1">
                  <Heading size="md" className="mb-1 pushLeft">
                    Tech Growth:
                  </Heading>
                  <Chart
                    chartType="LineChart"
                    width="100%"
                    height="200px"
                    data={FAKE_DATA}
                    options={{
                      legend: { position: "bottom" },
                      chartArea: { width: "80%", height: "70%" },
                      curveType: "function",
                      hAxis: { minValue: 1969 },
                    }}
                  />
                </div>
              </div>
              <div className="d-flex mt-3 d-none">
                <div className="d-flex flex-column w-50 p-2  me-1">
                  <Heading size="md" className="mb-1 pushLeft">
                    Renters Vs. Owners:
                  </Heading>
                  <Chart
                    chartType="BarChart"
                    width="100%"
                    height="300px"
                    data={OWNERS_VS_RENTERS}
                    options={{
                      chartArea: { width: "70%" },
                      legend: { position: "none" },
                      hAxis: {
                        title: "in Percentage (%)",
                        minValue: 0,
                      },
                    }}
                  />
                </div>
                <div className="d-flex flex-column w-50 p-2 ms-1">
                  <Heading size="md" className="mb-1 pushLeft">
                    Supply distribution:
                  </Heading>
                  <Chart
                    chartType="PieChart"
                    data={PIE_DATA}
                    options={{
                      legend: {
                        position: "bottom",
                        textStyle: { color: "black", fontSize: 12 },
                      },

                      pieSliceTextStyle: {
                        color: "white",
                      },
                      slices: {
                        0: { color: "skyblue" },
                        1: { color: "darkblue" },
                        2: { color: "lightgreen" },
                        3: { color: "green" },
                      },
                    }}
                    width={"100%"}
                    height={"350px"}
                  />
                </div>
              </div>
              <div className="d-flex mt-3"></div>
            </div>
          </div>
          <div
            className="drawerButton"
            onClick={() => setIsMapOpened((prev) => !prev)}
          >
            {isMapOpened && <ArrowRightIcon fontSize="inherit" />}
            {!isMapOpened && <ArrowLeftIcon fontSize="inherit" />}
          </div>
          <div id="sideMap" className={isMapOpened ? "mapOpen" : "mapClosed"}>
            <MainMap/>
          </div>
        </div>
      </div>
    </div>
  );
}

const FAKE_DATA = [
  ["Year", "Turkey", "Greece", "Italy"],
  [1970, 1500, 400, 100],
  [1980, 1470, 460, 200],
  [1990, 1300, 920, 250],
  [2000, 1030, 540, 50],
  [2010, 1090, 540, 20],
  [2015, 1070, 550, 100],
  [2020, 1340, 540, 190],
];

const PIE_DATA = [
  ["Type", "Percent"],
  ["Hotel", 24.5],
  ["Short term rental", 5.5],
  ["Other", 70],
];

const OWNERS_VS_RENTERS = [
  ["Dwelling Type", "Percent", { role: "style" }],
  ["Owners", 65, "color: #76A7FA"],
  ["Renters", 35, "color: #FF9900"],
];
