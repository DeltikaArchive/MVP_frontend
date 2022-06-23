import React, { useState } from "react";
import { Heading } from "@chakra-ui/react";
import { Chart } from "react-google-charts";
import { editDateGraphTimeline, reArrangeDate } from "../../lib/utilityFunctions";
import { ConsumerPriceIndex } from "../../lib/macroDB";

export default function InflationRate() {
  const [cpiTimeline, setCpiTimeline] = useState(0);
  const [cpiData, setCpiData] = useState(reArrangeDate(ConsumerPriceIndex));

  const handleCpiChange = (value) => {
    setCpiTimeline(value);
    setCpiData(editDateGraphTimeline(ConsumerPriceIndex, value));
  };

  return (
    <div className="macroCell">
      <Heading size="md" className="mb-1 pushLeft">
        Consumer Price Index:
      </Heading>
      <Chart
        chartType="LineChart"
        width="100%"
        height="200px"
        data={cpiData}
        options={{
          legend: { position: "none" },
          chartArea: { width: "80%", height: "70%" },
          vAxis: { minValue: 0 },
          hAxis: { format: "yy" },
        }}
      />
      <div className="chartYears">
        <span onClick={() => handleCpiChange(1)} className={cpiTimeline === 1 ? "selectedYear" : "nonSelectedYear"}>
          1Y
        </span>
        |
        <span onClick={() => handleCpiChange(5)} className={cpiTimeline === 5 ? "selectedYear" : "nonSelectedYear"}>
          5Y
        </span>
        |
        <span onClick={() => handleCpiChange(10)} className={cpiTimeline === 10 ? "selectedYear" : "nonSelectedYear"}>
          10Y
        </span>
        |
        <span onClick={() => handleCpiChange(0)} className={cpiTimeline === 0 ? "selectedYear" : "nonSelectedYear"}>
          ALL
        </span>
      </div>
    </div>
  );
}
