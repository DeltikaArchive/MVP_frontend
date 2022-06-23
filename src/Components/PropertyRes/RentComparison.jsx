import React, { useState } from "react";
import { Chart } from "react-google-charts";
import { Heading, RadioGroup, Radio, Stack } from "@chakra-ui/react";
import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined";
import ShowerOutlinedIcon from "@mui/icons-material/ShowerOutlined";

export default function RentComparison() {
  const [radio, setRadio] = useState("1");
  const sampleData = [
    ["Property Type", "Amount"],
    ["Apartment", 1000],
    ["Single family", 4000],
    ["Condo", 6100],
    ["Townhouse", 6500],
    ["Short Term", 5000],
    ["Mid Term", 4500],
    ["Average Mortgage", 2000],
  ];

  return (
    <div className="d-flex flex-column">
      <Heading size="md" className="align-self-start">
        Rent Comparison:
      </Heading>
      <div id="RentComparison">
        <div id="RentComparisonChart">
          <Chart
            chartType="BarChart"
            width="100%"
            height="300px"
            data={sampleData}
            options={{
              chartArea: { width: "70%" },
              legend: { position: "none" },
              hAxis: {
                title: "Rent ($)",
                minValue: 0,
              },
            }}
          />
        </div>
        <div className="d-flex align-items-center ms-5">
          <RadioGroup onChange={setRadio} value={radio}>
            <Stack>
              <Radio size="lg" value={"1"} name="1/1" colorScheme="purple" defaultChecked>
                1 <KingBedOutlinedIcon /> 1 <ShowerOutlinedIcon />
              </Radio>
              <Radio size="lg" value={"2"} name="1/2" colorScheme="purple">
                1 <KingBedOutlinedIcon /> 2 <ShowerOutlinedIcon />
              </Radio>
              <Radio size="lg" value={"3"} name="2/2" colorScheme="purple">
                2 <KingBedOutlinedIcon /> 2 <ShowerOutlinedIcon />
              </Radio>
              <Radio size="lg" value={"4"} name="2/3" colorScheme="purple">
                2 <KingBedOutlinedIcon /> 3 <ShowerOutlinedIcon />
              </Radio>
            </Stack>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
