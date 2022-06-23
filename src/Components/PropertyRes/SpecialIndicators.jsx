import React, { useContext } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import PanelDebtInfo from "./PanelDebtInfo";
import PanelShortTermRental from "./PanelShortTermRental";
import PanelAmenitiesTable from "./PanelAmenitiesTable";
import { AppContext } from "../../Context/AppContext";

export default function SpecialIndicators() {
  const { specialIndicatorsTab, setSpecialIndicatorsTab } = useContext(AppContext);
  const handleTabsChange = (index) => {
    setSpecialIndicatorsTab(index);
  };

  return (
    <>
      <Tabs index={specialIndicatorsTab} onChange={handleTabsChange} variant="enclosed" colorScheme="purple">
        <TabList className="d-flex justify-content-center">
          <Tab>Mortgage Motivation</Tab>
          <Tab>Short Term Rental</Tab>
          <Tab>Amenities Analysis</Tab>
          <Tab isDisabled>Eviction</Tab>
          <Tab isDisabled>Other Income</Tab>
        </TabList>

        <TabPanels>
          <TabPanel className="tabPanel">
            <PanelDebtInfo />
          </TabPanel>
          <TabPanel className="tabPanel">
            <PanelShortTermRental />
          </TabPanel>
          <TabPanel className="tabPanel">
            <PanelAmenitiesTable />
          </TabPanel>
          <TabPanel className="tabPanel">
            <p>Eviction</p>
          </TabPanel>
          <TabPanel className="tabPanel">
            <p>Other income</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
