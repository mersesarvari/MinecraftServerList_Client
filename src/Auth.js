import axios from "axios";
import Cookies from "js-cookie";
import { SERVERIP, instance } from "./LOCAL";

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
      Cookies.set("email", response.data.email, {
        expires: 700000000000000000000,
      });
      Cookies.set("token", response.data.token, {
        expires: 7000000000000000000000,
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      alert(error.request.response);
    }
  }

  async Register(values) {
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

  CheckLogin() {
    if (
      Cookies.get("token") === "" ||
      Cookies.get("token") === null ||
      Cookies.get("token") === undefined
    ) {
      return false;
    }
    return true;
  }

  async Logout() {
    Cookies.remove("email");
    Cookies.remove("password");
    console.log("You succesfully logged out");
    window.location.reload(false);
  }
}
export default new Auth();
