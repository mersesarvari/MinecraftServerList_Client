//EZEKET AZ ADATOKAT A SZERVERTŐL KÉNE LEKÉRDEZNI IGAZÁBÓL
import Cookies from "js-cookie";
import { useState } from "react";

export const SERVERIP = "https://localhost:7296/";

let https = "https://localhost:7296";
let http = "http://localhost:5000";

export function CheckLogin() {
  let email = Cookies.get("email");
  let pwd = Cookies.get("password");
  if (email !== undefined && pwd !== undefined) {
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
