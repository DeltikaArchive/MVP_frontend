import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { AppContext } from "../Context/AppContext";
import { numberWithCommas } from "../lib/utilityFunctions";
import Rating from "react-rating";
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import ShowerOutlinedIcon from "@mui/icons-material/ShowerOutlined";
import BedIcon from "@mui/icons-material/Bed";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import PinDropIcon from "@mui/icons-material/PinDrop";
import {
  Button,
  Collapse,
  Fade,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Link,
} from "@chakra-ui/react";

function PopupCardN({ pin }) {
  const { showCompsSale, showCompsRent, showCompsSTR } = useContext(AppContext);
  const { result } = useContext(AppContext);
  const [rating, setRating] = useState(0);
  const [ratingOnHover, setRatingOnHover] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const closingPriceTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Closing Price
    </Tooltip>
  );
  const rentalPriceTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Rental Price
    </Tooltip>
  );
  const REV_PARTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Revenue per available night
    </Tooltip>
  );
  const wait = (delay, ...args) =>
    new Promise((resolve) => setTimeout(resolve, delay, ...args));

  async function handleClickRating(value) {
    setRating(value);
    setShowAlert(true);
    await wait(1500).then(() => setShowAlert(false));
    await wait(0).then(() => setShowRating(false));
    setShowRating(false);
  }
  function handleRatingChange(value) {
    console.log(value);
    setRating(value);
  }

  function handleHovering(value) {
    setRatingOnHover(value);
  }

  return (
    <Card style={{ width: "20rem" }}>
      {/* {pin.IMG ? (
        <Card.Img variant="top" src={pin.IMG} />
      ) : (
        <Card.Img variant="top" src={PropertyImgNotAvailable} />
      )} */}

      <Card.Body>
        {pin.listing_price && (
          <Card.Title
            style={{
              textAlign: "left",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span className="me-2">
              Listing Price: ${numberWithCommas(pin.listing_price)}
            </span>
          </Card.Title>
        )}
        <Card.Title
          style={{
            textAlign: "left",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {pin.sale_closing_price && (
            <>
              <div>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={closingPriceTooltip}
                >
                  <span
                    className="me-2"
                    style={{
                      textDecorationLine: "underline",
                      textDecorationStyle: "solid",
                    }}
                  >
                    ${numberWithCommas(pin.sale_closing_price)}
                  </span>
                </OverlayTrigger>
              </div>
            </>
          )}
          {pin.rental_price && (
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={rentalPriceTooltip}
            >
              <span
                className="me-2"
                style={{
                  textDecorationLine: "underline",
                  textDecorationStyle: "solid",
                }}
              >
                ${numberWithCommas(pin.rental_price)}
              </span>
            </OverlayTrigger>
          )}

          {pin.REV_PAR && (
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={REV_PARTooltip}
            >
              <span
                className="me-2"
                style={{
                  textDecorationLine: "underline",
                  textDecorationStyle: "solid",
                }}
              >
                ${numberWithCommas(pin.REV_PAR)}
              </span>
            </OverlayTrigger>
          )}

          {pin.similarity && (
            <span
              style={{ color: "#fe0061", fontSize: "13px", fontWeight: "600" }}
            >
              {Math.floor(pin.similarity * 10000) / 100}% similar
            </span>
          )}
        </Card.Title>
        <Card.Text style={{ fontSize: "13px", textAlign: "left" }}>
          {!pin.building_size && pin.building_area !== "N/A" && (
            <>
              <SquareFootIcon fontSize="small" />
              <span>{numberWithCommas(pin.building_area)} Sqft </span>
              {/* <span> | </span> */}
            </>
          )}
          {pin.building_size && (
            <>
              <span>
                <SquareFootIcon fontSize="small" />
                {numberWithCommas(pin.building_size)} Sqft{" "}
              </span>
              {/* <span> | </span> */}
            </>
          )}
          <span>
            <BedIcon fontSize="small" /> {pin.bedrooms} Beds{" "}
          </span>
          {/* <span> | </span> */}
          {pin.half_bathrooms !== "N/A" ? (
            <span>
              <ShowerOutlinedIcon fontSize="small" />
              {pin.full_bathrooms + pin.half_bathrooms * 0.5} Baths
            </span>
          ) : (
            <span>
              {" "}
              <ShowerOutlinedIcon fontSize="small" /> {pin.full_bathrooms} Baths
            </span>
          )}
          {!showCompsSale &&!showCompsRent && <Button
            className="py-0 px-1 ms-2"
            size="sm"
            variant="outline-dark"
            href="https://www.airbnb.com"
          >
            {" "}
            view on airbnb
          </Button>}
        </Card.Text>
        <Card.Text
          style={{ fontSize: "11px", textAlign: "left", marginTop: "8px" }}
        >
          <PinDropIcon fontSize="small" /> {pin.address}
        </Card.Text>
        {<Button
          className="mt-2"
          variant="primary"
          size="sm"
          onClick={() => setShowRating(!showRating)}
          aria-controls="example-collapse-text"
          aria-expanded={showRating}
        >
          Rate it!
        </Button>}
      </Card.Body>
      {!pin.listing_price && showRating && (
        <Card.Footer>
          <>
            <Fade in={showRating}>
              <div id="example-collapse-text">
                <p style={{ fontSize: "15px", marginBottom: "10px" }}>
                  How similar is this property to yours?
                </p>
                <Rating
                  initialRating={rating}
                  quiet={false}
                  emptySymbol={<StarBorderOutlinedIcon />}
                  fullSymbol={<StarIcon />}
                  onClick={handleClickRating}
                  onHover={handleHovering}
                  onChange={handleRatingChange}
                />
                {ratingOnHover === 1 && <p>Not similar at all</p>}
                {ratingOnHover === 2 && <p>A little bit similar</p>}
                {ratingOnHover === 3 && <p>Ok</p>}
                {ratingOnHover === 4 && <p>Quite similar</p>}
                {ratingOnHover === 5 && <p>Very similar!</p>}

                {showAlert && (
                  <Alert
                    status="success"
                    variant="subtle"
                    className="mt-2"
                    style={{ borderRadius: "10px", backgroundColor: "inherit" }}
                  >
                    <AlertIcon />
                    Thank you for the rating!
                  </Alert>
                )}
                {/* <Alert
                  status="success"
                  variant="subtle"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  height="80px"
                >
                  <AlertIcon boxSize="25px" mr={0} />
                  <AlertTitle mt={2} mb={1} fontSize="sm">
                    Rating submitted!
                  </AlertTitle>
                </Alert> */}
              </div>
            </Fade>
          </>
        </Card.Footer>
      )}
    </Card>
  );
}

export default PopupCardN;
