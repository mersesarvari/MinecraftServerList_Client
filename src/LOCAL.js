//EZEKET AZ ADATOKAT A SZERVERTŐL KÉNE LEKÉRDEZNI IGAZÁBÓL
import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";

export const SERVERIP = "https://localhost:7296/";

let https = "https://localhost:7296";
let http = "http://localhost:5000";

export async function CheckLogin() {
  //Cookies.remove("email");
  //Cookies.remove("token");
  let email = Cookies.get("email");
  let token = Cookies.get("token");

  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  console.log("Checklogin cookies:", email, token);
  if (email !== undefined && token !== undefined) {
    var response = await axios.get(SERVERIP + "auth", config, { Email: email });
    console.log("Checklogin response: ", response);
    if (response.status !== 200) {
      Cookies.remove("email");
      Cookies.remove("token");
    }
    console.log(response.data);
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
