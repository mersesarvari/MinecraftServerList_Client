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
