//EZEKET AZ ADATOKAT A SZERVERTŐL KÉNE LEKÉRDEZNI IGAZÁBÓL
import Cookies from "js-cookie";
import axios from "axios";

export const SERVERIP = "https://localhost:7296/";

let https = "https://localhost:7296";
let http = "http://localhost:5000";

export const instance = axios.create();
instance.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
  "token"
)}`;

export async function CheckLogin() {
  //Cookies.remove("email");
  //Cookies.remove("token");
  let email = Cookies.get("email");
  let token = Cookies.get("token");

  console.log("Checklogin cookies:", email, token);
  if (email !== undefined && token !== undefined) {
    var response = await instance.get(SERVERIP + "auth", {
      Email: email,
    });
    console.log("Checklogin response: ", response);
    console.log(response.data);
    return true;
  } else return false;
}

export const categories = [
  "survival",
  "economy",
  "pvp",
  "fullpvp",
  "lobby",
  "factions",
  "bedrock",
  "hungergames",
  "slimefun",
  "prison",
  "smp",
  "mmo",
  "rpg",
  "roleplay",
  "dungeon",
  "skyblock",
];

export const servertypes = ["java", "bedrock"];
