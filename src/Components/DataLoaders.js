import axios from "axios";
import { SERVERIP } from "../LOCAL";
import Cookies from "js-cookie";
import { instance } from "../LOCAL";

//Loader function
export const serverDetailsLoader = async ({ params }) => {
  
};
export const accountVerificationLoader = async ({ params }) => {
  const { token } = params;
  const response = await axios
    .post(`${SERVERIP}verify?token=${token}`)
    .catch(function (error) {
      console.log("Error");
      return error.response;
    });
  console.log("Return value");
  return response.data;
};
