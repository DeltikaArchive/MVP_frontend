import React, { useState } from "react";
import { Heading } from "@chakra-ui/react";
import { Chart } from "react-google-charts";
import { editYearsGraphTimeline } from "../../lib/utilityFunctions";
import { InflationData } from "../../lib/macroDB";
import { fixInflationArray } from "../../lib/utilityFunctions";

export default function InflationRate() {
  const [inflationTimeline, setInflationTimeline] = useState(0);
  const [inflationData, setInflationData] = useState(fixInflationArray(InflationData));

  const handleInflationChange = (value) => {
    setInflationTimeline(value);
    setInflationData(editYearsGraphTimeline(fixInflationArray(InflationData), value));
  };

  return (
    <div className="macroCell">
      <Heading size="md" className="mb-1 pushLeft">
        Inflation rate:
      </Heading>
      <Chart
        chartType="LineChart"
        width="100%"
        height="200px"
        data={inflationData}
        options={{
          legend: { position: "none" },
          chartArea: { width: "80%", height: "70%" },
          vAxis: { minValue: 0, format: "%" },
          hAxis: { format: `` },
        }}
      />
      <div className="chartYears">
        <span
          onClick={() => handleInflationChange(1)}
          className={inflationTimeline === 1 ? "selectedYear" : "nonSelectedYear"}
        >
          1Y
        </span>
        |
        <span
          onClick={() => handleInflationChange(5)}
          className={inflationTimeline === 5 ? "selectedYear" : "nonSelectedYear"}
        >
          5Y
        </span>
        |
        <span
          onClick={() => handleInflationChange(10)}
          className={inflationTimeline === 10 ? "selectedYear" : "nonSelectedYear"}
        >
          10Y
        </span>
        |
        <span
          onClick={() => handleInflationChange(0)}
          className={inflationTimeline === 0 ? "selectedYear" : "nonSelectedYear"}
        >
          ALL
        </span>
      </div>
    </div>
  );
}
