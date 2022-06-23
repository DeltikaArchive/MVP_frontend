import React, { useState, useContext } from "react";
import {
  Heading,
  Checkbox,
  Stack,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Collapse,
} from "@chakra-ui/react";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { AppContext } from "../Context/AppContext";
import { BsBookmark, BsFillBookmarkHeartFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import axios from "axios";
import { URLrequests } from "../config";

export default function Filters(props) {
  const {
    setCheckedFilters,
    setOpenMoreFilters,
    openMoreFilters,
    loggedInUser,
    arrayOfFilters,
    setArrayOfFilters,
  } = useContext(AppContext);
  const [arbitrageFilter, setArbitrageFilter] = useState(3);
  const handleArbitrageFilterThumb = (val) => {
    setArbitrageFilter(val);
  };

  const [saved, setSaved] = useState(false);
  const handleClose = () => setOpenMoreFilters(false); // Closes the filters window

  const handleSave = async (e) => {
    checked.route = arrayOfFilters[arrayOfFilters.length - 1].route + 1;
    checked.title = savedFiltersName;
    setArrayOfFilters([...arrayOfFilters, checked]);
    handleFiltersPOST(loggedInUser, checked);
    setSaved(!saved);
  };

  const navigate = useNavigate();

  const handleClear = async (e) => {
    navigate("/filters/0");
    window.location.reload(false);
    setOpenMoreFilters(true);
  };

  const [vioYears, setVioYears] = useState(5);
  const [codeEnYears, setCodeEnYears] = useState(5);
  const [failedInsYears, setFailedInsYears] = useState(5);
  const [highLeverageAboveBelow, setHighLeverageAboveBelow] = useState("above");
  const [highLeveragePercentage, setHighLeveragePercentage] = useState(60);
  const [highRateAboveBelow, setHighRateAboveBelow] = useState("above");
  const [highRatePercentage, setHighRatePercentage] = useState(60);
  const [affordabilityRestExpiration, setAffordabilityRestExpiration] =
    useState(2023);
  const [thirdPartyAgreementsExpiration, setThirdPartyAgreementsExpiration] =
    useState(2023);
  const [timeInMarketNumOfDMY, setTimeInMarketNumOfDMY] = useState(3);
  const [timeInMarketDMY, setTimeInMarketDMY] = useState("months");
  const [numOfTransactionsYears, setNumOfTransactionsYears] = useState(5);
  const [numOfTransactions, setNumOfTransactions] = useState(3);
  const [noiDropPercentage, setNoiDropPercentage] = useState(60);
  const [noiDropYears, setNoiDropYears] = useState(5);
  const [reviewUpgradeDowngrade, setReviewUpgradeDowngrade] =
    useState("upgrade");
  const [maturityDate, setMaturityDate] = useState(new Date());
  const [evictionPercentage, setEvictionPercentage] = useState(60);
  const [concessionPercentage, setConcessionPercentage] = useState(60);
  const [otherIncomeChargesPercentage, setOtherIncomeChargesPercentage] =
    useState(60);
  const [savedFiltersName, setSavedFiltersName] = useState("");
  const [specificUserFiltersArray, setSpecificUserFiltersArray] = useState([]);

  const currentFilters = props.filters;

  // console.log("below is new Date()");
  // console.log(new Date());
  // console.log(typeof maturityDate);

  const handleFiltersPOST = async (user, checked) => {
    console.log("ARRIVED TO FILTERS POST REQ");
    let axiosDataBody = {
      uid: user.uid,
      email: user.email,
      filters_saves: JSON.stringify([...specificUserFiltersArray, checked]),
    };
    try {
      const response = await axios({

        url : `${URLrequests}/users/filters_saves`,
        data : axiosDataBody,
          headers: {
            "Content-Type": "application/json",
          },
          mode: 'no-cors'
      });
      console.log("Status: ", response.status);
      console.log("Data: ", response.data);
    } catch (error) {
      console.error("Oh no!", error);
    }
  };

  const [checked, setChecked] = useState({
    route: currentFilters.route,
    title: currentFilters.title,
    violations: currentFilters.violations,
    codeEnforcement: currentFilters.codeEnforcement,
    failedInspections: currentFilters.failedInspections,
    mandatoryRepairs: currentFilters.mandatoryRepairs,
    liens: currentFilters.liens,
    vacant: currentFilters.vacant,
    watchlist: currentFilters.watchlist,
    nod: currentFilters.nod,
    highLeverage: currentFilters.highLeverage,
    highRate: currentFilters.highRate,
    debtForeclosure: currentFilters.debtForeclosure,
    maturityInTime: currentFilters.maturityInTime,
    reo: currentFilters.reo,
    secondOrThird: currentFilters.secondOrThird,
    sixtyDaysDQ: currentFilters.sixtyDaysDQ,
    extensionOrModified: currentFilters.extensionOrModified,
    prePenalty: currentFilters.prePenalty,
    bmrUnits: currentFilters.bmrUnits,
    mixUse: currentFilters.mixUse,
    condoMap: currentFilters.condoMap,
    shortTermAllowed: currentFilters.shortTermAllowed,
    acceptSec8: currentFilters.acceptSec8,
    rentControlExempted: currentFilters.rentControlExempted,
    affordabilityRest: currentFilters.affordabilityRest,
    thirdPartyAgreements: currentFilters.thirdPartyAgreements,
    listingChangePending: currentFilters.listingChangePending,
    listingPriceChange: currentFilters.listingPriceChange,
    listingChangeExpired: currentFilters.listingChangeExpired,
    listingChangeActive: currentFilters.listingChangeActive,
    listingWithdraw: currentFilters.listingWithdraw,
    timeInMarket: currentFilters.timeInMarket,
    transactions: currentFilters.transactions,
    exchange1031: currentFilters.exchange1031,
    reo: currentFilters.reo,
    pastSalesInfoforeclosure: currentFilters.pastSalesInfoforeclosure,
    noiDrop: currentFilters.noiDrop,
    review: currentFilters.review,
    shortTermRentalArbitrage: currentFilters.shortTermRentalArbitrage,
    otherIncomeCharges: currentFilters.otherIncomeCharges,
    ratioUtilityBilling: currentFilters.ratioUtilityBilling,
    concession: currentFilters.concession,
    eviction: currentFilters.eviction,
    highestTurnOver: currentFilters.highestTurnOver,
    propertyManagementPopularity: currentFilters.propertyManagementPopularity,
    devUnderReview: currentFilters.devUnderReview,
    devPermitExpired: currentFilters.devPermitExpired,
    devNotStarted: currentFilters.devNotStarted,
    devOnMarket: currentFilters.devOnMarket,
    devLoanExp: currentFilters.devLoanExp,
    underCons: currentFilters.underCons,
    underDev: currentFilters.underDev,
    highLikelihoodToBeSold: currentFilters.highLikelihoodToBeSold,
  });

  // const [checked, setChecked] = useState({
  //   violations: false,
  //   codeEnforcement: false,
  //   failedInspections: false,
  //   mandatoryRepairs: false,
  //   liens: false,
  //   vacant: false,
  //   watchlist: false,
  //   nod: false,
  //   highLeverage: false,
  //   highRate: false,
  //   debtForeclosure: false,
  //   maturityInTime: false,
  //   reo: false,
  //   secondOrThird: false,
  //   sixtyDaysDQ: false,
  //   extensionOrModified: false,
  //   prePenalty: false,
  //   bmrUnits: false,
  //   mixUse: false,
  //   condoMap: false,
  //   shortTermAllowed: false,
  //   acceptSec8: false,
  //   rentControlExempted: false,
  //   affordabilityRest: false,
  //   thirdPartyAgreements: false,
  //   listingChangePending: false,
  //   listingPriceChange: false,
  //   listingChangeExpired: false,
  //   listingChangeActive: false,
  //   listingWithdraw: false,
  //   timeInMarket: false,
  //   transactions: false,
  //   exchange1031: false,
  //   reo: false,
  //   pastSalesInfoforeclosure: false,
  //   noiDrop: false,
  //   review: false,
  //   shortTermRentalArbitrage: false,
  //   otherIncomeCharges: false,
  //   ratioUtilityBilling:true,
  //   concession: false,
  //   eviction: false,
  //   highestTurnOver: false,
  //   propertyManagementPopularity: false,
  //   devUnderReview: false,
  //   devPermitExpired: false,
  //   devNotStarted: false,
  //   devOnMarket: false,
  //   devLoanExp: false,
  //   underCons: false,
  //   underDev: false,
  //   highLikelihoodToBeSold: false,
  // });

  const handleViolations = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      violations: {
        isChecked: event.target.checked,
        years: vioYears,
      },
    });
  };

  const handleCodeEnforcement = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      codeEnforcement: {
        isChecked: event.target.checked,
        years: codeEnYears,
      },
    });
  };

  const handleFailedInspections = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      failedInspections: {
        isChecked: event.target.checked,
        years: failedInsYears,
      },
    });
  };

  const handleMandatoryRepairs = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      mandatoryRepairs: event.target.checked,
    });
  };

  const handleLiens = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      liens: event.target.checked,
    });
  };

  const handleVacant = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      vacant: event.target.checked,
    });
  };

  const handleWatchlist = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      watchlist: event.target.checked,
    });
  };

  const handleNod = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      nod: event.target.checked,
    });
  };

  const handleHighLeverage = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      highLeverage: {
        isChecked: event.target.checked,
        aboveOrBelow: highLeverageAboveBelow,
        percentage: highLeveragePercentage,
      },
    });
  };

  const handleHighRate = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      highRate: {
        isChecked: event.target.checked,
        aboveOrBelow: highRateAboveBelow,
        percentage: highRatePercentage,
      },
    });
  };

  const handleDebtForeclosure = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      debtForeclosure: event.target.checked,
    });
  };

  const handleMaturityInTime = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      maturityInTime: {
        isChecked: event.target.checked,
        date: maturityDate,
      },
    });
  };

  const handleReo = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      reo: event.target.checked,
    });
  };

  const handleSecondOrThird = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      secondOrThird: event.target.checked,
    });
  };

  const handleSixtyDayDQ = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      sixtyDaysDQ: event.target.checked,
    });
  };

  const handleExtensionOrModified = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      extensionOrModified: event.target.checked,
    });
  };

  const handlePrePenalty = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      prePenalty: event.target.checked,
    });
  };

  const handleBmrUnits = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      bmrUnits: event.target.checked,
    });
  };

  const handleMixUse = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      mixUse: event.target.checked,
    });
  };

  const handleCondoMap = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      condoMap: event.target.checked,
    });
  };

  const handleShortTermAllowed = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      shortTermAllowed: event.target.checked,
    });
  };

  const handleAcceptSec8 = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      acceptSec8: event.target.checked,
    });
  };

  const handleRentControlExempted = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      rentControlExempted: event.target.checked,
    });
  };

  const handleAffordabilityRest = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      affordabilityRest: {
        isChecked: event.target.checked,
        expirationYear: affordabilityRestExpiration,
      },
    });
  };

  const handleThirdPartyAgreements = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      thirdPartyAgreements: {
        isChecked: event.target.checked,
        expirationYear: thirdPartyAgreementsExpiration,
      },
    });
  };

  const handleListingChangePending = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      listingChangePending: event.target.checked,
    });
  };

  const handleListingPriceChange = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      listingPriceChange: event.target.checked,
    });
  };

  const handleListingChangeExpired = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      listingChangeExpired: event.target.checked,
    });
  };

  const handleListingChangeActive = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      listingChangeActive: event.target.checked,
    });
  };

  const handleListingWithdraw = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      listingWithdraw: event.target.checked,
    });
  };

  const handleTimeInMarket = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      timeInMarket: {
        isChecked: event.target.checked,
        numberOfDMY: timeInMarketNumOfDMY,
        DMY: timeInMarketDMY,
      },
    });
  };

  const handleTransactions = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      transactions: {
        isChecked: event.target.checked,
        numOfTransactions: numOfTransactions,
        years: numOfTransactionsYears,
      },
    });
  };

  const handleExchange1031 = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      exchange1031: event.target.checked,
    });
  };

  const handleREO = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      reo: event.target.checked,
    });
  };

  const handlePastSalesInfoforeclosure = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      pastSalesInfoforeclosure: event.target.checked,
    });
  };

  const handleNoiDrop = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      noiDrop: {
        isChecked: event.target.checked,
        percentage: noiDropPercentage,
        years: noiDropYears,
      },
    });
  };

  const handleReview = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      review: {
        isChecked: event.target.checked,
        upgradeOrDowngrade: reviewUpgradeDowngrade,
      },
    });
  };

  const handleShortTermRentalArbitrage = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      shortTermRentalArbitrage: {
        isChecked: event.target.checked,
        multiplication: arbitrageFilter,
      },
    });
  };

  const handleOtherIncomeCharges = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      otherIncomeCharges: {
        isChecked: event.target.checked,
        percentage: otherIncomeChargesPercentage,
      },
    });
  };

  const handleRatioUtilityBilling = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      ratioUtilityBilling: event.target.checked,
    });
  };

  const handleConcession = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      concession: {
        isChecked: event.target.checked,
        percentage: concessionPercentage,
      },
    });
  };

  const handleEviction = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      eviction: {
        isChecked: event.target.checked,
        percentage: evictionPercentage,
      },
    });
  };

  const handleHighestTurnOver = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      highestTurnOver: event.target.checked,
    });
  };

  const handlePropertyManagementPopularity = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      propertyManagementPopularity: event.target.checked,
    });
  };

  const handleDevUnderReview = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      devUnderReview: event.target.checked,
    });
  };

  const handleDevPermitExpired = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      devPermitExpired: event.target.checked,
    });
  };

  const handleDevNotStarted = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      devNotStarted: event.target.checked,
    });
  };

  const handleDevOnMarket = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      devOnMarket: event.target.checked,
    });
  };

  const handleDevLoanExp = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      devLoanExp: event.target.checked,
    });
  };

  const handleUnderCons = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      underCons: event.target.checked,
    });
  };

  const handleUnderDev = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      underDev: event.target.checked,
    });
  };

  const handleHighLikelihoodToBeSold = (event) => {
    event.preventDefault();
    setChecked({
      ...checked,
      highLikelihoodToBeSold: event.target.checked,
    });
  };

  console.log("below is checked!@!@$!$@!");
  console.log(checked);
  
  const handleApplyFilters = (e) => {
    console.log("arrived handle filters")
    setCheckedFilters(checked)
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">
        Pick a name for your saved filters:
      </Popover.Header>
      <Popover.Body>
        <Input
          placeholder="..."
          size="xs"
          value={savedFiltersName}
          onChange={(e) => setSavedFiltersName(e.target.value)}
          maxLength={50}
        />
        <span>Characters left: {50 - savedFiltersName.length}</span>
        <div id="namePopupButtons">
          <Button id="applyNameForFiltersButton" onClick={(e) => handleSave(e)}>
            OK
          </Button>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <div id="extraFilters">
      <ToastContainer />
      <div id="extraFiltersButtons">
        <div>
          {Object.keys(loggedInUser).length === 0 ? (
            <div className="saveFilters">
              <span>Sign in to save filters</span>
            </div>
          ) : (
            <>
              {!saved ? (
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popover}
                >
                  <button id="saveFiltersButton">
                    <div className="saveFilters">
                      <BsBookmark size={35} color="#805AD5" />
                      <span>Save filters</span>
                    </div>
                  </button>
                </OverlayTrigger>
              ) : (
                <div className="saveFilters">
                  <BsFillBookmarkHeartFill size={35} color="#805AD5" />
                  <span>Saved!</span>
                </div>
              )}
            </>
          )}
        </div>
        <div id="clearAndAddFiltersButtons">
          <Button
            id="clearFiltersButton"
            variant="outline-secondary"
            onClick={(e) => handleClear(e)}
          >
            Clear
          </Button>
          <Button id="addFiltersButton" onClick={(e) => handleApplyFilters(e)}>Apply</Button>
        </div>
      </div>
      <div>
        <div className="mb-3">
          <Heading size="md" className="my-2" textAlign="left">
            Deferred Maintenance
          </Heading>
          <Stack spacing={50} direction="row">
            <Stack spacing={15} direction="column">
              <div className="specificCheckbox" id="problematicCheckbox">
                <Checkbox
                  colorScheme="purple"
                  className="checkboxContent"
                  value={`violation-in-${vioYears}-years`}
                  checked={checked.violations}
                  onChange={(e) => handleViolations(e)}
                  defaultChecked={
                    checked.violations !== false &&
                    checked.violations.isChecked !== false
                      ? true
                      : false
                  }
                ></Checkbox>
                Violations in the past &nbsp;
                <NumberInput
                  onChange={(event) =>
                    setChecked({
                      ...checked,
                      violations: {
                        isChecked: checked.violations.isChecked,
                        years: Number(event),
                      },
                    })
                  }
                  size="xs"
                  maxW={14}
                  defaultValue={
                    checked.violations !== false
                      ? checked.violations.years
                      : vioYears
                  }
                  min={1}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper
                      onClick={() => setVioYears(vioYears + 1)}
                    />
                    <NumberDecrementStepper
                      onClick={() => setVioYears(vioYears - 1)}
                    />
                  </NumberInputStepper>
                </NumberInput>
                &nbsp; years
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  className="checkboxContent"
                  value="code-enforcement"
                  checked={checked.codeEnforcement}
                  onChange={(e) => handleCodeEnforcement(e)}
                  defaultChecked={
                    checked.codeEnforcement !== false &&
                    checked.codeEnforcement.isChecked !== false
                      ? true
                      : false
                  }
                ></Checkbox>
                Code enforcement in the last &nbsp;
                <NumberInput
                  size="xs"
                  maxW={14}
                  defaultValue={
                    checked.codeEnforcement !== false
                      ? checked.codeEnforcement.years
                      : codeEnYears
                  }
                  min={1}
                  onChange={(event) =>
                    setChecked({
                      ...checked,
                      codeEnforcement: {
                        isChecked: checked.codeEnforcement.isChecked,
                        years: Number(event),
                      },
                    })
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper
                      onClick={() => setCodeEnYears(codeEnYears + 1)}
                    />
                    <NumberDecrementStepper
                      onClick={() => setCodeEnYears(codeEnYears - 1)}
                    />
                  </NumberInputStepper>
                </NumberInput>
                &nbsp; years
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  className="checkboxContent"
                  value="failed-inspection-in-5-years"
                  checked={checked.failedInspections}
                  onChange={(e) => handleFailedInspections(e)}
                  defaultChecked={
                    checked.failedInspections !== false &&
                    checked.failedInspections.isChecked !== false
                      ? true
                      : false
                  }
                ></Checkbox>
                Failed inspections in the past &nbsp;
                <NumberInput
                  size="xs"
                  maxW={14}
                  defaultValue={
                    checked.failedInspections !== false
                      ? checked.failedInspections.years
                      : failedInsYears
                  }
                  min={1}
                  onChange={(event) =>
                    setChecked({
                      ...checked,
                      failedInspections: {
                        isChecked: checked.failedInspections.isChecked,
                        years: Number(event),
                      },
                    })
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper
                      onClick={() => setFailedInsYears(failedInsYears + 1)}
                    />
                    <NumberDecrementStepper
                      onClick={() => setFailedInsYears(failedInsYears - 1)}
                    />
                  </NumberInputStepper>
                </NumberInput>
                &nbsp; years
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="mandatory-repairs"
                  checked={checked.mandatoryRepairs}
                  onChange={(e) => handleMandatoryRepairs(e)}
                  defaultChecked={
                    checked.mandatoryRepairs !== false ? true : false
                  }
                ></Checkbox>
                Mandatory repairs
              </div>
            </Stack>
            <Stack spacing={15} direction="column">
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="liens"
                  checked={checked.liens}
                  onChange={(e) => handleLiens(e)}
                  defaultChecked={checked.liens !== false ? true : false}
                ></Checkbox>
                Liens
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="vacant"
                  checked={checked.vacant}
                  onChange={(e) => handleVacant(e)}
                  defaultChecked={checked.vacant !== false ? true : false}
                ></Checkbox>
                Vacant
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="watchlist"
                  checked={checked.watchlist}
                  onChange={(e) => handleWatchlist(e)}
                  defaultChecked={checked.watchlist !== false ? true : false}
                ></Checkbox>
                Watchlist
              </div>
            </Stack>
          </Stack>
        </div>

        <div className="mb-3">
          <Heading size="md" className="my-2" textAlign="left">
            Debt
          </Heading>
          <Stack spacing={50} direction="row">
            <Stack spacing={15} direction="column">
              <div className="specificCheckbox" id="problematicCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="nod"
                  checked={checked.nod}
                  onChange={(e) => handleNod(e)}
                  defaultChecked={checked.nod !== false ? true : false}
                ></Checkbox>
                Notice of Default
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  className="checkboxContent"
                  value="high-leverage"
                  checked={checked.highLeverage}
                  onChange={(e) => handleHighLeverage(e)}
                  defaultChecked={
                    checked.highLeverage !== false &&
                    checked.highLeverage.isChecked !== false
                      ? true
                      : false
                  }
                ></Checkbox>
                High leverage &nbsp;
                <Select
                  size="xs"
                  maxW={20}
                  defaultValue={
                    checked.highLeverage !== false
                      ? checked.highLeverage.aboveOrBelow
                      : highLeverageAboveBelow
                  }
                  onChange={(event) =>
                    setChecked({
                      ...checked,
                      highLeverage: {
                        isChecked: checked.highLeverage.isChecked,
                        aboveOrBelow: event.target.value,
                        percentage: highLeveragePercentage,
                      },
                    })
                  }
                >
                  <option value="above">Above</option>
                  <option value="below">Below</option>
                </Select>
                &nbsp;
                <NumberInput
                  size="xs"
                  maxW={16}
                  defaultValue={
                    checked.highLeverage !== false
                      ? checked.highLeverage.percentage
                      : highLeveragePercentage
                  }
                  min={0}
                  onChange={(event) =>
                    setChecked({
                      ...checked,
                      highLeverage: {
                        isChecked: checked.highLeverage.isChecked,
                        aboveOrBelow: highLeverageAboveBelow,
                        percentage: Number(event),
                      },
                    })
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper
                      onClick={() =>
                        setHighLeveragePercentage(highLeveragePercentage + 1)
                      }
                    />
                    <NumberDecrementStepper
                      onClick={() =>
                        setHighLeveragePercentage(highLeveragePercentage - 1)
                      }
                    />
                  </NumberInputStepper>
                </NumberInput>
                &nbsp; %
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  className="checkboxContent"
                  value="high-rate"
                  checked={checked.highRate}
                  onChange={(e) => handleHighRate(e)}
                  defaultChecked={
                    checked.highRate !== false &&
                    checked.highRate.isChecked !== false
                      ? true
                      : false
                  }
                ></Checkbox>
                High rate &nbsp;
                <Select
                  size="xs"
                  maxW={20}
                  defaultValue={
                    checked.highRate !== false
                      ? checked.highRate.aboveOrBelow
                      : highRateAboveBelow
                  }
                  onChange={(event) =>
                    setChecked({
                      ...checked,
                      highRate: {
                        isChecked: checked.highRate.isChecked,
                        aboveOrBelow: event.target.value,
                        percentage: highRatePercentage,
                      },
                    })
                  }
                >
                  <option value="above">Above</option>
                  <option value="below">Below</option>
                </Select>
                &nbsp;
                <NumberInput
                  size="xs"
                  maxW={16}
                  defaultValue={
                    checked.highRate !== false
                      ? checked.highRate.percentage
                      : highRatePercentage
                  }
                  min={0}
                  onChange={(event) =>
                    setChecked({
                      ...checked,
                      highRate: {
                        isChecked: checked.highRate.isChecked,
                        aboveOrBelow: highRateAboveBelow,
                        percentage: Number(event),
                      },
                    })
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper
                      onClick={() =>
                        setHighRatePercentage(highRatePercentage + 1)
                      }
                    />
                    <NumberDecrementStepper
                      onClick={() =>
                        setHighRatePercentage(highRatePercentage - 1)
                      }
                    />
                  </NumberInputStepper>
                </NumberInput>
                &nbsp; %
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="debtForeclosure"
                  checked={checked.debtForeclosure}
                  onChange={(e) => handleDebtForeclosure(e)}
                  defaultChecked={
                    checked.debtForeclosure !== false ? true : false
                  }
                ></Checkbox>
                Foreclosure
              </div>
              <div id="maturityCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="maturity-in-time"
                  checked={checked.maturityInTimeu}
                  onChange={(e) => handleMaturityInTime(e)}
                  defaultChecked={
                    checked.maturityInTime !== false &&
                    checked.maturityInTime.isChecked !== false
                      ? true
                      : false
                  }
                ></Checkbox>
                Maturity
                <DatePicker
                  id="maturityDatePicker"
                  selected={new Date(maturityDate)}
                  onChange={(date) => setMaturityDate(new Date(date))}
                />
              </div>
            </Stack>
            <Stack spacing={15} direction="column">
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="reo"
                  checked={checked.reo}
                  onChange={(e) => handleReo(e)}
                  defaultChecked={checked.reo !== false ? true : false}
                ></Checkbox>
                Real Estate Owned
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="second-or-third"
                  checked={checked.secondOrThird}
                  onChange={(e) => handleSecondOrThird(e)}
                  defaultChecked={
                    checked.secondOrThird !== false ? true : false
                  }
                ></Checkbox>
                2nd/3rd
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="sixty-days-dq"
                  checked={checked.sixtyDaysDQ}
                  onChange={(e) => handleSixtyDayDQ(e)}
                  defaultChecked={checked.sixtyDaysDQ !== false ? true : false}
                ></Checkbox>
                60 Days DQ
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="extension-or-modified"
                  checked={checked.extensionOrModified}
                  onChange={(e) => handleExtensionOrModified(e)}
                  defaultChecked={
                    checked.extensionOrModified !== false ? true : false
                  }
                ></Checkbox>
                Extension / Modified
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="pre-penalty"
                  checked={checked.prePenalty}
                  onChange={(e) => handlePrePenalty(e)}
                  defaultChecked={checked.prePenalty !== false ? true : false}
                ></Checkbox>
                Pre penalty
              </div>
            </Stack>
          </Stack>
        </div>

        <div className="mb-3">
          <Heading size="md" className="my-2" textAlign="left">
            Restriction
          </Heading>
          <Stack spacing={50} direction="row">
            <Stack spacing={15} direction="column">
              <div className="specificCheckbox" id="problematicCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="bmrUnits"
                  checked={checked.bmrUnits}
                  onChange={(e) => handleBmrUnits(e)}
                  defaultChecked={checked.bmrUnits !== false ? true : false}
                ></Checkbox>
                BMR units
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="mix-use"
                  checked={checked.mixUse}
                  onChange={(e) => handleMixUse(e)}
                  defaultChecked={checked.mixUse !== false ? true : false}
                ></Checkbox>
                Mix use
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="condo-map"
                  checked={checked.condoMap}
                  onChange={(e) => handleCondoMap(e)}
                  defaultChecked={checked.condoMap !== false ? true : false}
                ></Checkbox>
                Condo Map / CC&R
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="short-term-allowed"
                  checked={checked.shortTermAllowed}
                  onChange={(e) => handleShortTermAllowed(e)}
                  defaultChecked={
                    checked.shortTermAllowed !== false ? true : false
                  }
                ></Checkbox>
                Short term allowed
              </div>
            </Stack>
            <Stack spacing={15} direction="column">
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="accept-sec-8"
                  checked={checked.acceptSec8}
                  onChange={(e) => handleAcceptSec8(e)}
                  defaultChecked={checked.acceptSec8 !== false ? true : false}
                ></Checkbox>
                Accept Sec 8
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="rent-control-exempted"
                  checked={checked.rentControlExempted}
                  onChange={(e) => handleRentControlExempted(e)}
                  defaultChecked={
                    checked.rentControlExempted !== false ? true : false
                  }
                ></Checkbox>
                Rent control exempted
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  className="checkboxContent"
                  value="affordability-restriction"
                  checked={checked.affordabilityRest}
                  onChange={(e) => handleAffordabilityRest(e)}
                  defaultChecked={
                    checked.affordabilityRest !== false &&
                    checked.affordabilityRest.isChecked !== false
                      ? true
                      : false
                  }
                ></Checkbox>
                Affordability restriction expired in &nbsp;
                <NumberInput
                  size="xs"
                  maxW={20}
                  defaultValue={
                    checked.affordabilityRest !== false
                      ? checked.affordabilityRest.expirationYear
                      : affordabilityRestExpiration
                  }
                  min={1900}
                  onChange={(event) =>
                    setChecked({
                      ...checked,
                      affordabilityRest: {
                        isChecked: checked.affordabilityRest.isChecked,
                        expirationYear: Number(event),
                      },
                    })
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper
                      onClick={() =>
                        setAffordabilityRestExpiration(
                          affordabilityRestExpiration + 1
                        )
                      }
                    />
                    <NumberDecrementStepper
                      onClick={() =>
                        setAffordabilityRestExpiration(
                          affordabilityRestExpiration - 1
                        )
                      }
                    />
                  </NumberInputStepper>
                </NumberInput>
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  className="checkboxContent"
                  value="third-party-agreements"
                  checked={checked.thirdPartyAgreements}
                  onChange={(e) => handleThirdPartyAgreements(e)}
                  defaultChecked={
                    checked.thirdPartyAgreements !== false &&
                    checked.thirdPartyAgreements.isChecked !== false
                      ? true
                      : false
                  }
                ></Checkbox>
                3rd party agreements expired in &nbsp;
                <NumberInput
                  size="xs"
                  maxW={20}
                  defaultValue={
                    checked.thirdPartyAgreements !== false
                      ? checked.thirdPartyAgreements.expirationYear
                      : thirdPartyAgreementsExpiration
                  }
                  min={1900}
                  onChange={(event) =>
                    setChecked({
                      ...checked,
                      thirdPartyAgreements: {
                        isChecked: checked.affordabilityRest.isChecked,
                        expirationYear: Number(event),
                      },
                    })
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper
                      onClick={() =>
                        setThirdPartyAgreementsExpiration(
                          thirdPartyAgreementsExpiration + 1
                        )
                      }
                    />
                    <NumberDecrementStepper
                      onClick={() =>
                        setThirdPartyAgreementsExpiration(
                          thirdPartyAgreementsExpiration - 1
                        )
                      }
                    />
                  </NumberInputStepper>
                </NumberInput>
              </div>
            </Stack>
          </Stack>
        </div>

        <div className="mb-3">
          <Heading size="md" className="my-2" textAlign="left">
            Listing change
          </Heading>
          <Stack spacing={50} direction="row">
            <Stack spacing={15} direction="column">
              <div className="specificCheckbox" id="problematicCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="listing-change-pending"
                  checked={checked.listingChangePending}
                  onChange={(e) => handleListingChangePending(e)}
                  defaultChecked={
                    checked.listingChangePending !== false ? true : false
                  }
                ></Checkbox>
                Pending
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="listing-price-change"
                  checked={checked.listingPriceChange}
                  onChange={(e) => handleListingPriceChange(e)}
                  defaultChecked={
                    checked.listingPriceChange !== false ? true : false
                  }
                ></Checkbox>
                Price change
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="listing-change-expired"
                  checked={checked.handleListingChangeExpired}
                  onChange={(e) => handleListingChangeExpired(e)}
                  defaultChecked={
                    checked.listingChangeExpired !== false ? true : false
                  }
                ></Checkbox>
                Expired
              </div>
            </Stack>
            <Stack spacing={15} direction="column">
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="listing-change-active"
                  checked={checked.listingChangeActive}
                  onChange={(e) => handleListingChangeActive(e)}
                  defaultChecked={
                    checked.listingChangeActive !== false ? true : false
                  }
                ></Checkbox>
                Active
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="listing-withdraw"
                  checked={checked.listingWithdraw}
                  onChange={(e) => handleListingWithdraw(e)}
                  defaultChecked={
                    checked.listingWithdraw !== false ? true : false
                  }
                ></Checkbox>
                Withdraw
              </div>
              <div className="specificCheckbox" id="problematicCheckbox">
                <Checkbox
                  colorScheme="purple"
                  className="checkboxContent"
                  value="affordability-rest"
                  checked={checked.timeInMarket}
                  onChange={(e) => handleTimeInMarket(e)}
                  defaultChecked={
                    checked.timeInMarket !== false &&
                    checked.timeInMarket.isChecked !== false
                      ? true
                      : false
                  }
                ></Checkbox>
                Time in market &nbsp;
                <NumberInput
                  size="xs"
                  maxW={14}
                  defaultValue={
                    checked.timeInMarket !== false
                      ? checked.timeInMarket.numberOfDMY
                      : timeInMarketNumOfDMY
                  }
                  min={0}
                  onChange={(event) =>
                    setChecked({
                      ...checked,
                      timeInMarket: {
                        isChecked: checked.timeInMarket.isChecked,
                        numberOfDMY: Number(event),
                        DMY: timeInMarketDMY,
                      },
                    })
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper
                      onClick={() =>
                        setTimeInMarketNumOfDMY(timeInMarketNumOfDMY + 1)
                      }
                    />
                    <NumberDecrementStepper
                      onClick={() =>
                        setTimeInMarketNumOfDMY(timeInMarketNumOfDMY - 1)
                      }
                    />
                  </NumberInputStepper>
                </NumberInput>
                &nbsp;
                <Select
                  size="xs"
                  maxW={24}
                  defaultValue={
                    checked.timeInMarket !== false
                      ? checked.timeInMarket.DMY
                      : timeInMarketDMY
                  }
                  onChange={(event) =>
                    setChecked({
                      ...checked,
                      timeInMarket: {
                        isChecked: checked.timeInMarket.isChecked,
                        numberOfDMY: timeInMarketNumOfDMY,
                        DMY: event.target.value,
                      },
                    })
                  }
                >
                  <option value="days">Days</option>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </Select>
              </div>
            </Stack>
          </Stack>
        </div>

        <div className="mb-3">
          <Heading size="md" className="my-2" textAlign="left">
            Past sales information
          </Heading>
          <Stack spacing={50} direction="row">
            <Stack spacing={15} direction="column">
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  className="checkboxContent"
                  value="transactions"
                  checked={checked.transactions}
                  onChange={(e) => handleTransactions(e)}
                  defaultChecked={
                    checked.transactions !== false &&
                    checked.transactions.isChecked !== false
                      ? true
                      : false
                  }
                ></Checkbox>
                +&nbsp;
                <NumberInput
                  size="xs"
                  maxW={14}
                  defaultValue={
                    checked.transactions !== false
                      ? checked.transactions.numOfTransactions
                      : numOfTransactions
                  }
                  min={1}
                  onChange={(event) =>
                    setChecked({
                      ...checked,
                      transactions: {
                        isChecked: checked.transactions.isChecked,
                        numOfTransactions: Number(event),
                        years: numOfTransactionsYears,
                      },
                    })
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper
                      onClick={() =>
                        setNumOfTransactions(numOfTransactions + 1)
                      }
                    />
                    <NumberDecrementStepper
                      onClick={() =>
                        setNumOfTransactions(numOfTransactions - 1)
                      }
                    />
                  </NumberInputStepper>
                </NumberInput>
                &nbsp; transactions in the past &nbsp;
                <NumberInput
                  size="xs"
                  maxW={14}
                  defaultValue={
                    checked.transactions !== false
                      ? checked.transactions.years
                      : numOfTransactionsYears
                  }
                  min={1}
                  onChange={(event) =>
                    setChecked({
                      ...checked,
                      transactions: {
                        isChecked: checked.transactions.isChecked,
                        numOfTransactions: numOfTransactions,
                        years: Number(event),
                      },
                    })
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper
                      onClick={() =>
                        setNumOfTransactionsYears(numOfTransactionsYears + 1)
                      }
                    />
                    <NumberDecrementStepper
                      onClick={() =>
                        setNumOfTransactionsYears(numOfTransactionsYears - 1)
                      }
                    />
                  </NumberInputStepper>
                </NumberInput>
                &nbsp; years
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="exchange-1031"
                  checked={checked.exchange1031}
                  onChange={(e) => handleExchange1031(e)}
                  defaultChecked={checked.exchange1031 !== false ? true : false}
                ></Checkbox>
                1031 exchange
              </div>
            </Stack>
            <Stack spacing={15} direction="column">
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="reo"
                  checked={checked.reo}
                  onChange={(e) => handleREO(e)}
                  defaultChecked={checked.reo !== false ? true : false}
                ></Checkbox>
                Real Estate Owned
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="past-sales-info-foreclosure"
                  checked={checked.pastSalesInfoforeclosure}
                  onChange={(e) => handlePastSalesInfoforeclosure(e)}
                  defaultChecked={
                    checked.pastSalesInfoforeclosure !== false ? true : false
                  }
                ></Checkbox>
                Foreclosure
              </div>
            </Stack>
          </Stack>
        </div>

        <div className="mb-3">
          <Heading size="md" className="my-2" textAlign="left">
            Performance
          </Heading>
          <Stack spacing={50} direction="row">
            <Stack spacing={15} direction="column">
              <div className="specificCheckbox" id="noiCheckbox">
                <Checkbox
                  colorScheme="purple"
                  className="checkboxContent"
                  value="noi-drop"
                  checked={checked.noiDrop}
                  onChange={(e) => handleNoiDrop(e)}
                  defaultChecked={
                    checked.noiDrop !== false &&
                    checked.noiDrop.isChecked !== false
                      ? true
                      : false
                  }
                ></Checkbox>
                NOI drop by &nbsp;
                <NumberInput
                  size="xs"
                  maxW={16}
                  defaultValue={
                    checked.noiDrop !== false
                      ? checked.noiDrop.years
                      : noiDropPercentage
                  }
                  min={0}
                  onChange={(event) =>
                    setChecked({
                      ...checked,
                      noiDrop: {
                        isChecked: checked.noiDrop.isChecked,
                        percentage: Number(event),
                        years: noiDropYears,
                      },
                    })
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper
                      onClick={() =>
                        setNoiDropPercentage(noiDropPercentage + 1)
                      }
                    />
                    <NumberDecrementStepper
                      onClick={() =>
                        setNoiDropPercentage(noiDropPercentage - 1)
                      }
                    />
                  </NumberInputStepper>
                </NumberInput>
                &nbsp; % in the past &nbsp;
                <NumberInput
                  size="xs"
                  maxW={14}
                  defaultValue={
                    checked.noiDrop !== false
                      ? checked.noiDrop.years
                      : noiDropYears
                  }
                  min={1}
                  onChange={(event) =>
                    setChecked({
                      ...checked,
                      noiDrop: {
                        isChecked: checked.noiDrop.isChecked,
                        percentage: noiDropPercentage,
                        years: Number(event),
                      },
                    })
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper
                      onClick={() => setNoiDropYears(noiDropYears + 1)}
                    />
                    <NumberDecrementStepper
                      onClick={() => setNoiDropYears(noiDropYears - 1)}
                    />
                  </NumberInputStepper>
                </NumberInput>
                &nbsp; years
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="review"
                  checked={checked.review}
                  onChange={(e) => handleReview(e)}
                  defaultChecked={
                    checked.review !== false &&
                    checked.review.isChecked !== false
                      ? true
                      : false
                  }
                ></Checkbox>
                Review &nbsp;
                <Select
                  size="xs"
                  maxW={28}
                  defaultValue={
                    checked.review !== false
                      ? checked.review.upgradeOrDowngrade
                      : reviewUpgradeDowngrade
                  }
                  onChange={(event) =>
                    setChecked({
                      ...checked,
                      review: {
                        isChecked: checked.review.isChecked,
                        upgradeOrDowngrade: event.target.value,
                      },
                    })
                  }
                >
                  <option value="upgrade">Upgrade</option>
                  <option value="downgrade">Downgrade</option>
                </Select>
              </div>
              <div className="specificCheckbox" id="arbitrageCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="short-term-rental-arbitrage"
                  checked={checked.shortTermRentalArbitrage}
                  onChange={(e) => handleShortTermRentalArbitrage(e)}
                  defaultChecked={
                    checked.shortTermRentalArbitrage !== false &&
                    checked.shortTermRentalArbitrage.isChecked !== false
                      ? true
                      : false
                  }
                ></Checkbox>
                Short term rental arbitrage &nbsp;
                <div id="arbitrageSlider">
                  <Slider
                    value={
                      checked.shortTermRentalArbitrage !== false
                        ? checked.shortTermRentalArbitrage.multiplication
                        : arbitrageFilter
                    }
                    min={1}
                    max={5}
                    step={0.1}
                    colorScheme="purple"
                    maxW={20}
                    onChange={(event) =>
                      setChecked({
                        ...checked,
                        shortTermRentalArbitrage: {
                          isChecked: checked.shortTermRentalArbitrage.isChecked,
                          multiplication: Number(event),
                        },
                      })
                    }
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                  <span id="arbitrageSliderValues">
                    X{" "}
                    {checked.shortTermRentalArbitrage !== false
                      ? checked.shortTermRentalArbitrage.multiplication
                      : arbitrageFilter}
                  </span>
                </div>
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="other-income-charge"
                  checked={checked.otherIncomeCharges}
                  onChange={(e) => handleOtherIncomeCharges(e)}
                  defaultChecked={
                    checked.otherIncomeCharges !== false ? true : false
                  }
                ></Checkbox>
                Other income charges &nbsp;
                <NumberInput
                  size="xs"
                  maxW={16}
                  defaultValue={
                    checked.otherIncomeCharges !== false
                      ? checked.otherIncomeCharges.percentage
                      : otherIncomeChargesPercentage
                  }
                  min={0}
                  onChange={(event) =>
                    setChecked({
                      ...checked,
                      otherIncomeCharges: {
                        isChecked: checked.otherIncomeCharges.isChecked,
                        percentage: Number(event),
                      },
                    })
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper
                      onClick={() =>
                        setOtherIncomeChargesPercentage(
                          otherIncomeChargesPercentage + 1
                        )
                      }
                    />
                    <NumberDecrementStepper
                      onClick={() =>
                        setOtherIncomeChargesPercentage(
                          otherIncomeChargesPercentage - 1
                        )
                      }
                    />
                  </NumberInputStepper>
                </NumberInput>
                &nbsp; %
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="ratio-utility-billing"
                  checked={checked.ratioUtilityBilling}
                  onChange={(e) => handleRatioUtilityBilling(e)}
                  defaultChecked={
                    checked.ratioUtilityBilling !== false ? true : false
                  }
                ></Checkbox>
                Ratio utility billings
              </div>
            </Stack>
            <Stack spacing={15} direction="column">
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="concession"
                  checked={checked.concession}
                  onChange={(e) => handleConcession(e)}
                  defaultChecked={checked.concession !== false ? true : false}
                ></Checkbox>
                Concession &nbsp;
                <NumberInput
                  size="xs"
                  maxW={16}
                  defaultValue={
                    checked.concession !== false
                      ? checked.concession.percentage
                      : concessionPercentage
                  }
                  min={0}
                  onChange={(event) =>
                    setChecked({
                      ...checked,
                      concession: {
                        isChecked: checked.concession.isChecked,
                        percentage: Number(event),
                      },
                    })
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper
                      onClick={() =>
                        setConcessionPercentage(concessionPercentage + 1)
                      }
                    />
                    <NumberDecrementStepper
                      onClick={() =>
                        setConcessionPercentage(concessionPercentage - 1)
                      }
                    />
                  </NumberInputStepper>
                </NumberInput>
                &nbsp; %
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="eviction"
                  checked={checked.eviction}
                  onChange={(e) => handleEviction(e)}
                  defaultChecked={checked.eviction !== false ? true : false}
                ></Checkbox>
                Eviction/Bad debt &nbsp;
                <NumberInput
                  size="xs"
                  maxW={16}
                  defaultValue={
                    checked.eviction !== false
                      ? checked.eviction.percentage
                      : evictionPercentage
                  }
                  min={0}
                  onChange={(event) =>
                    setChecked({
                      ...checked,
                      eviction: {
                        isChecked: checked.eviction.isChecked,
                        percentage: Number(event),
                      },
                    })
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper
                      onClick={() =>
                        setEvictionPercentage(evictionPercentage + 1)
                      }
                    />
                    <NumberDecrementStepper
                      onClick={() =>
                        setEvictionPercentage(evictionPercentage - 1)
                      }
                    />
                  </NumberInputStepper>
                </NumberInput>
                &nbsp; %
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="highest-turn-over"
                  checked={checked.highestTurnOver}
                  onChange={(e) => handleHighestTurnOver(e)}
                  defaultChecked={
                    checked.highestTurnOver !== false ? true : false
                  }
                ></Checkbox>
                Highest turn over (available units)
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="property-management-popularity"
                  checked={checked.propertyManagementPopularity}
                  onChange={(e) => handlePropertyManagementPopularity(e)}
                  defaultChecked={
                    checked.propertyManagementPopularity !== false
                      ? true
                      : false
                  }
                ></Checkbox>
                Property management popularity
              </div>
            </Stack>
          </Stack>
        </div>

        <div className="mb-3">
          <Heading size="md" className="my-2" textAlign="left">
            Development
          </Heading>
          <Stack spacing={50} direction="row">
            <Stack spacing={15} direction="column">
              <div className="specificCheckbox" id="problematicCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="dev-under-review"
                  checked={checked.devUnderReview}
                  onChange={(e) => handleDevUnderReview(e)}
                  defaultChecked={
                    checked.devUnderReview !== false ? true : false
                  }
                ></Checkbox>
                Under review
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="dev-permit-expired"
                  checked={checked.devPermitExpired}
                  onChange={(e) => handleDevPermitExpired(e)}
                  defaultChecked={
                    checked.devPermitExpired !== false ? true : false
                  }
                ></Checkbox>
                Entitled - permit expired
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="dev-not-started"
                  checked={checked.devNotStarted}
                  onChange={(e) => handleDevNotStarted(e)}
                  defaultChecked={
                    checked.devNotStarted !== false ? true : false
                  }
                ></Checkbox>
                Entitled - not started
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="dev-on-market"
                  checked={checked.devOnMarket}
                  onChange={(e) => handleDevOnMarket(e)}
                  defaultChecked={checked.devOnMarket !== false ? true : false}
                ></Checkbox>
                On market
              </div>
            </Stack>
            <Stack spacing={15} direction="column">
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="dev-loan-exp"
                  checked={checked.devLoanExp}
                  onChange={(e) => handleDevLoanExp(e)}
                  defaultChecked={checked.devLoanExp !== false ? true : false}
                ></Checkbox>
                Loan exp
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="under-cons"
                  checked={checked.underCons}
                  onChange={(e) => handleUnderCons(e)}
                  defaultChecked={checked.underCons !== false ? true : false}
                ></Checkbox>
                Under construction
              </div>
              <div className="specificCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="under-dev"
                  checked={checked.underDev}
                  onChange={(e) => handleUnderDev(e)}
                  defaultChecked={checked.underDev !== false ? true : false}
                ></Checkbox>
                Under developed
              </div>
            </Stack>
          </Stack>
        </div>

        <div className="mb-3">
          <Heading size="md" className="my-2" textAlign="left">
            Prediction indicators
          </Heading>
          <Stack spacing={50} direction="row">
            <Stack spacing={15} direction="column">
              <div className="specificCheckbox" id="problematicCheckbox">
                <Checkbox
                  colorScheme="purple"
                  value="high-likelihood-to-be-sold"
                  checked={checked.highLikelihoodToBeSold}
                  onChange={(e) => handleHighLikelihoodToBeSold(e)}
                  defaultChecked={
                    checked.highLikelihoodToBeSold !== false ? true : false
                  }
                ></Checkbox>
                High likelihood to be sold
              </div>
            </Stack>
          </Stack>
        </div>
      </div>
      <div id="extraFiltersButtons">
        <div>
          {Object.keys(loggedInUser).length === 0 ? (
            <div className="saveFilters">
              <span>Sign in to save filters</span>
            </div>
          ) : (
            <>
              {!saved ? (
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popover}
                >
                  <button id="saveFiltersButton">
                    <div className="saveFilters">
                      <BsBookmark size={35} color="#805AD5" />
                      <span>Save filters</span>
                    </div>
                  </button>
                </OverlayTrigger>
              ) : (
                <div className="saveFilters">
                  <BsFillBookmarkHeartFill size={35} color="#805AD5" />
                  <span>Saved!</span>
                </div>
              )}
            </>
          )}
        </div>
        <div id="clearAndAddFiltersButtons">
          <Button
            id="clearFiltersButton"
            variant="outline-secondary"
            onClick={(e) => handleClear(e)}
          >
            Clear
          </Button>
          <Button id="addFiltersButton" onClick={(e) => handleApplyFilters(e)}>Apply</Button>
        </div>
      </div>
    </div>
  );
}
