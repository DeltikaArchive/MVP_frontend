import { createContext } from "react";

export const AppContext = createContext({
  loggedInUser: {},
  setLoggedInUser: () => {},

  //Search
  openMoreFilters: false,
  setOpenMoreFilters: () => {},
  searchResults: "",
  setSearchResults: () => {},
  loading: "",
  setLoading: () => {},
  keepOriginalResults: "",
  setKeepOriginalResults: () => {},
  checkedFilters: {},
  setCheckedFilters: () => {},
  result: "",
  setResult: () => {},

  //Property Page

  compsPins: [],
  setCompsPins: () => {},
  showCompsSale: false,
  setShowCompsSale: () => {},
  showCompsRent: false,
  setShowCompsRent: () => {},
  showCompsSTR: false,
  setShowCompsSTR: () => {},
  selectedId: "",
  setSelectedId: () => {},
  selectedProperty: "",
  setSelectedProperty: () => {},
  loansExtraData: "",
  setLoansExtraData: () => {},
  propertyLoader: "",
  setPropertyLoader: () => {},

  //Map related:
  viewport: "",
  setViewport: () => {},
  showPolygons: "",
  setShowPolygons: () => {},
  showCrimes: "",
  setShowCrimes: () => {},
  mapZoom: "",
  setMapZoom: () => {},

  //Tabs Remote control
  propertyResTab: "",
  setPropertyResTab: () => {},
  specialIndicatorsTab: "",
  setSpecialIndicatorsTab: () => {},
});
