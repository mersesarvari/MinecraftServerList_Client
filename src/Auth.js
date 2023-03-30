import axios from "axios";
import Cookies from "js-cookie";
import { SERVERIP, instance } from "./LOCAL";
import jwt_decode from "jwt-decode";
import { isJwtExpired } from "jwt-check-expiration";

class Auth {
  constructor() {
    this.authenticated = false;
  }

  async login(values) {
    try {
      let loginObject = {
        Email: values.email,
        Password: values.password,
      };
      const response = await instance.post(`${SERVERIP}login`, loginObject);
      console.log(response);
      if (response.status === 200) {
        Cookies.set("email", response.data.email, {
          expires: 700000000000000000000,
        });
        Cookies.set("token", response.data.token, {
          expires: 7000000000000000000000,
        });
        console.log("Login was succesfull");
        return true;
      }
      new Promise((resolve) => setTimeout(resolve, 1000));
      return false;
    } catch (error) {
      console.log(error.response.data);
      return false;
    }
  }

  async register(values) {
    console.log(values);
    try {
      let registrationObject = {
        Email: values.email,
        Password: values.password,
        ConfirmPassword: values.confirmpassword,
      };

      const response = await axios.post(
        `${SERVERIP}register`,
        registrationObject
      );
      alert(
        "Registration was succesfull! We sent you an activation email to your email address. Activate your account now"
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      alert(error.request.response);
    }
  }

  checklogin() {
    try {
      if (
        Cookies.get("token") === "" ||
        Cookies.get("token") === null ||
        Cookies.get("token") === undefined
      ) {
        Cookies.remove("email");
        Cookies.remove("token");
        return false;
      }
      var tokenExpired = isJwtExpired(Cookies.get("token"));
      if (tokenExpired === true) {
        Cookies.remove("email");
        Cookies.remove("token");
        alert("Your sesson expired. Login again!");
        return false;
      }
      return true;
    } catch (error) {
      Cookies.remove("token");
      Cookies.remove("email");
      console.log("Error:", error);
      return false;
    }
  }

  logout() {
    Cookies.remove("email");
    Cookies.remove("token");
    console.log("You succesfully logged out");
    window.location.reload(false);
  }
}
export default new Auth();
