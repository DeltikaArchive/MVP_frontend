import React, { useState } from "react";
import { EmploymentRateData } from "../../lib/macroDB";
import { Heading } from "@chakra-ui/react";
import { Chart } from "react-google-charts";
import { changeArrayChannel } from "../../lib/utilityFunctions";

export default function EmploymentRate() {
  const [chartInfo, setChartInfo] = useState(2);
  const [currentData, setCurrentData] = useState(changeArrayChannel(EmploymentRateData, chartInfo));

  const handleInflationChange = (value) => {
    setChartInfo(value);
    setCurrentData(changeArrayChannel(EmploymentRateData, value));
  };

  return (
    <div className="macroCell">
      <Heading size="md" className="mb-1 pushLeft">
        Employment Rate:
      </Heading>
      <Chart
        chartType="LineChart"
        width="100%"
        height="200px"
        data={currentData}
        options={{
          legend: { position: "bottom" },
          chartArea: { width: "80%", height: "70%" },
          vAxis: { minValue: 0, format: `short` },
          hAxis: { minValue: 2021, format: `short` },
        }}
      />
      <div className="chartYears">
        <span onClick={() => handleInflationChange(1)} className={chartInfo === 1 ? "selectedYear" : "nonSelectedYear"}>
          Employment
        </span>
        |
        <span onClick={() => handleInflationChange(2)} className={chartInfo === 2 ? "selectedYear" : "nonSelectedYear"}>
          Rate
        </span>
      </div>
    </div>
  );
}
