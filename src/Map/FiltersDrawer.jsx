import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import {
  Heading,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Checkbox,
  Stack,
} from "@chakra-ui/react";

export default function FiltersDrawer(props) {
  const {
    showMapDrawer,
    setShowMapDrawer,
    showBars,
    setShowBars,
    showMalls,
    setShowMalls,
    showMuseums,
    setShowMuseums,
    showParks,
    setShowParks,
    showRestaurants,
    setShowRestaurants,
    showSuperMarkets,
    setShowSuperMarkets,
    showCrimes,
    setShowCrimes,
  } = props;
  const { showPolygons, setShowPolygons } = useContext(AppContext);
  return (
    <Drawer placement="right" isOpen={showMapDrawer} onClose={(e) => setShowMapDrawer(false)}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">Map Filters</DrawerHeader>
        <DrawerBody>
          <Stack spacing={5} direction="column">
            <Heading size="md" className="">
              Layers:
            </Heading>
            <Checkbox isChecked={showPolygons} onChange={(e) => setShowPolygons(e.target.checked)}>
              HeatMap
            </Checkbox>
            <Checkbox isChecked={showCrimes} onChange={(e) => setShowCrimes(e.target.checked)}>
              Crimes
            </Checkbox>
            <Heading size="md" className="">
              Points of Interest:
            </Heading>
            <Checkbox isChecked={showBars} onChange={(e) => setShowBars(e.target.checked)}>
              Bars
            </Checkbox>
            <Checkbox isChecked={showMalls} onChange={(e) => setShowMalls(e.target.checked)}>
              Malls
            </Checkbox>
            <Checkbox isChecked={showMuseums} onChange={(e) => setShowMuseums(e.target.checked)}>
              Museums
            </Checkbox>
            <Checkbox isChecked={showParks} onChange={(e) => setShowParks(e.target.checked)}>
              Parks
            </Checkbox>
            <Checkbox isChecked={showRestaurants} onChange={(e) => setShowRestaurants(e.target.checked)}>
              Restaurants
            </Checkbox>
            <Checkbox isChecked={showSuperMarkets} onChange={(e) => setShowSuperMarkets(e.target.checked)}>
              SuperMarkets
            </Checkbox>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
