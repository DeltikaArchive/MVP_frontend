import axios from "axios";
import { URLrequests } from "../config";
import { emptyFix, minNumFix, maxNumFix } from "./utilityFunctions";

export const getAllProperties = (
  address,
  bedrooms,
  bathrooms,
  homeType,
  minSqf,
  maxSqf,
  minPrice,
  maxPrice
) => {
  return axios
    .get(
      `${URLrequests}/property/?address=${emptyFix(
        address
      )}&bedrooms=${minNumFix(bedrooms)}&bathrooms=${minNumFix(
        bathrooms
      )}&homeType=${emptyFix(homeType)}&minSqf=${minNumFix(
        minSqf
      )}&maxSqf=${maxNumFix(maxSqf)}&minPrice=${minNumFix(
        minPrice
      )}&maxPrice=${maxNumFix(maxPrice)}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error.response));
};

export const getAllPropertiesByMLS = async (MLS) => {
  try {
    const response = await axios.get(`${URLrequests}/property/${MLS}`);
    console.log(response.data)
    if (response.data === "Not Found") {
      return '';
    } else { 
      return response.data;

    }
  } catch (error) {
    console.log(error);
  }
};

export const addRating = async (ratingObj) => {
  try {
    const response = await axios.post(
      `${URLrequests}/rating`,
      ratingObj
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
export const getRating = async (user_uid, property_id) => {
  try {
    const response = await axios.get(
      `${URLrequests}/rating/${user_uid}/${property_id}`
    );
    return response.data[0]
  } catch (error) {
    console.log(error);
  }
};


export const getPropertyById = (id) => {
  //   console.log("axios", id);
  return axios
    .get(`${URLrequests}/property/id/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error.response));
};


export const getPropertyByOwner = (owner) => {
  return axios
    .get(`${URLrequests}/property/owner/${owner}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error.response));
};

export const getPolygons = () => {
  return axios
    .get(`${URLrequests}/polygons`)
    .then((response) => {
      //   console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      console.log(error.response);
      return [];
    });
};
