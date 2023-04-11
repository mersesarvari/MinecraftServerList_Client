//EZEKET AZ ADATOKAT A SZERVERTŐL KÉNE LEKÉRDEZNI IGAZÁBÓL
import Cookies from "js-cookie";
import axios from "axios";

export const SERVERIP = "http://192.168.0.120:5270/";

export const instance = axios.create();
instance.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
  "token"
)}`;
instance.defaults.headers.common["Access-Control-Allow-Origin"] = `*`;

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
