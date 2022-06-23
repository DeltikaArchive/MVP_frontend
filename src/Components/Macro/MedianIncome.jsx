import React from "react";
import { IncomeData } from "../../lib/macroDB";
import { Heading } from "@chakra-ui/react";
import { Chart } from "react-google-charts";

export default function MedianIncome() {
  return (
    <div className="macroCell">
      <Heading size="md" className="mb-1 pushLeft">
        Median income by gender in Houston:
      </Heading>
      <Chart
        chartType="LineChart"
        width="100%"
        height="200px"
        data={IncomeData}
        options={{
          legend: { position: "bottom" },
          chartArea: { width: "80%", height: "70%" },
          hAxis: { minValue: 2011, format: `` },
          vAxis: { minValue: 0, format: `short` },
          series: {
            0: { color: "#9b111e" },
            1: { color: "#6495ed" },
          },
        }}
      />
    </div>
  );
}
