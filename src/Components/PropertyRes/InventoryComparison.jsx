import React, { useState } from "react";
import { Chart } from "react-google-charts";
import { Heading, RadioGroup, Radio, Stack, Checkbox } from "@chakra-ui/react";
import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined";
import ShowerOutlinedIcon from "@mui/icons-material/ShowerOutlined";

export default function InventoryComparison() {
  const [radio, setRadio] = useState("1");
  const [apartmentCheckbox, setApartmentCheckbox] = useState(false);
  const [singleFamilyCheckbox, setSingleFamilyCheckbox] = useState(false);
  const [condoCheckbox, setCondoCheckbox] = useState(false);
  const [townhouseCheckbox, setTownhouseCheckbox] = useState(false);
  const [multiFamilyCheckbox, setMultiFamilyCheckbox] = useState(false);
  const data = [
    [
      { type: "number", label: "x" },
      { type: "number", label: "values" },
      { id: "i0", type: "number", role: "interval" },
      { id: "i1", type: "number", role: "interval" },
      { id: "i2", type: "number", role: "interval" },
      { id: "i2", type: "number", role: "interval" },
      { id: "i2", type: "number", role: "interval" },
      { id: "i2", type: "number", role: "interval" },
    ],
    [1, 100, 100, 100, 100, 100, 100, 100],
    [2, 120, 120, 120, 120, 120, 120, 120],
    [3, 130, 130, 130, 130, 130, 130, 130],
    [4, 85, 85, 85, 85, 85, 85, 85],
    [5, 70, 70, 70, 70, 70, 70, 70],
    [6, 39, 39, 39, 39, 39, 39, 39],
    [7, 80, 80, 80, 80, 80, 80, 80],
    [8, 100, 90, 110, 85, 95, 102, 110],
    [9, 120, 90, 110, 85, 95, 130, 125],
  ];

  const options = {
    title: "Inventory under rental",
    curveType: "function",
    series: [{ color: "#E7711B" }],
    intervals: { style: "area" },
    legend: "none",
  };

  return (
    <div className="d-flex flex-column">
      <Heading size="md" className="mb-3 align-self-start">
        Inventory Comparison:
      </Heading>
      <div className="d-flex flex-row">
        <div id="InventoryComparisonChart">
          <Chart chartType="LineChart" width="100%" height="300px" data={data} options={options} />
        </div>

        <div>
          <div className="flexRowBetween">
            <div id="InventoryComparisonLeftStack" className="d-flex mt-4">
              <RadioGroup onChange={setRadio} value={radio}>
                <Stack>
                  <Heading size="sm" className="mb-3 align-self-start">
                    Beds/Bath:
                  </Heading>
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
            <div id="InventoryComparisonRightStack" className="d-flex flex-column mt-4">
              <Heading size="sm" className="mb-3 align-self-start">
                Type:
              </Heading>
              <div className="InventoryComparisonCheckbox">
                <Checkbox
                  colorScheme="purple"
                  isChecked={apartmentCheckbox}
                  onChange={(e) => setApartmentCheckbox(e.target.checked)}
                />
                Apartment
              </div>
              <div className="InventoryComparisonCheckbox">
                <Checkbox
                  colorScheme="purple"
                  isChecked={singleFamilyCheckbox}
                  onChange={(e) => setSingleFamilyCheckbox(e.target.checked)}
                />
                Single Family
              </div>
              <div className="InventoryComparisonCheckbox">
                <Checkbox
                  colorScheme="purple"
                  isChecked={condoCheckbox}
                  onChange={(e) => setCondoCheckbox(e.target.checked)}
                />
                Condo
              </div>
              <div className="InventoryComparisonCheckbox">
                <Checkbox
                  colorScheme="purple"
                  isChecked={townhouseCheckbox}
                  onChange={(e) => setTownhouseCheckbox(e.target.checked)}
                />
                Townhouse
              </div>
              <div className="InventoryComparisonCheckbox">
                <Checkbox
                  colorScheme="purple"
                  isChecked={multiFamilyCheckbox}
                  onChange={(e) => setMultiFamilyCheckbox(e.target.checked)}
                />
                Multi-Family
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
