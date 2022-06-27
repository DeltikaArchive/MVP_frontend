import axios from "axios";
import { URLrequests } from "../config";
import { emptyFix, minNumFix, maxNumFix } from "./utilityFunctions";

export const getAllLoans = (maturityDate, ids) => {
  const BODY = JSON.stringify({
    ids : ids,
    maturityDate: maturityDate,
  })
  console.log(BODY)
  return axios({ // verify validation
      method: 'post',
      url : `${URLrequests}/loans`, // fix backend to search for specific prop ids too
      data : BODY,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error.response));
};
