import React, { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import { AppContext } from "../Context/AppContext";
import { numberWithCommas } from "../lib/utilityFunctions";
import Rating from 'react-rating';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ShowerOutlinedIcon from "@mui/icons-material/ShowerOutlined";
import BedIcon from "@mui/icons-material/Bed";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function PopupCardN({ pin }) {
  const { showCompsSale, showCompsRent, showCompsSTR } = useContext(AppContext);
  const { result } = useContext(AppContext);
  const [ rating, setRating ] = useState(0);
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
  
  return (
    <Card style={{ width: "17rem" }}>
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
          {showCompsSale && pin.sale_closing_price && (
            <>
              {/* <div> Closing Price:</div> */}
              <div>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={closingPriceTooltip}
                >
                  <span className="me-2">
                    ${numberWithCommas(pin.sale_closing_price)}
                  </span>
                </OverlayTrigger>
              </div>
            </>
          )}
          {showCompsRent && pin.rental_price && (
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={rentalPriceTooltip}
            >
              <span className="me-2">
                ${numberWithCommas(pin.rental_price)}
              </span>
            </OverlayTrigger>
          )}

          {showCompsSTR && pin.REV_PAR && (
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={REV_PARTooltip}
            >
              <span className="me-2">${numberWithCommas(pin.REV_PAR)}</span>
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
        <Card.Text>
          <div style={{ fontSize: "13px", textAlign: "left" }}>
            {showCompsSale && pin.building_area && (
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
            {pin.full_bathrooms ? (
              <span>
                <ShowerOutlinedIcon fontSize="small" />
                {pin.full_bathrooms} Baths
              </span>
            ) : (
              <span>
                {" "}
                <ShowerOutlinedIcon fontSize="small" />{" "}
                {pin.total_bathrooms_numeric} Baths
              </span>
            )}
          </div>
          <div
            style={{ fontSize: "11px", textAlign: "left", marginTop: "8px" }}
          >
            <PinDropIcon fontSize="small" /> {pin.address}
          </div>
        </Card.Text>
        {/* <Button variant="link" style={{ fontSize: "13px" }}>
          Show more
        </Button> */}
      </Card.Body>
      {pin.similarity && (
        <Card.Footer>
          <p style={{ fontSize: "15px", marginBottom: "10px" }}>
            How similar is this property to yours?
          </p>
          <Rating
            value={rating}
            quiet={false}
            emptySymbol={<StarBorderOutlinedIcon />}
            fullSymbol={<StarIcon />}
          />
        </Card.Footer>
      )}
    </Card>
  );
}

export default PopupCardN;
