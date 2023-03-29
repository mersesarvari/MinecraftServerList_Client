import axios from "axios";
import { SERVERIP } from "../LOCAL";
import Cookies from "js-cookie";
import { instance } from "../LOCAL";

//Loader function
export const serverDetailsLoader = async ({ params }) => {
  const { id } = params;
  let token = Cookies.get("token");

  console.log(SERVERIP + "server/" + id);
  const response = await instance.get(SERVERIP + "server/" + id);
  console.log(response);
  if (response.status !== 200) {
    throw Error("Could not find the data");
  }
  console.log(response.data);
  return response.data;
};

export const serverListLoader = async ({ params }) => {
  console.log(SERVERIP + "server");
  const serverresponse = await instance.get(SERVERIP + "server/");
  console.log(serverresponse);
  if (serverresponse.status !== 200) {
    throw Error("Could not find the data");
  }
  console.log(serverresponse.data);
  return serverresponse.data;
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
