import Cookies from 'js-cookie';

export const SERVERIP="https://localhost:7296/";

let https = "https://localhost:7296";
let http = "http://localhost:5000";


export function CheckLogin() {
    let email = Cookies.get('email');
    let pwd = Cookies.get('password');
    if (email !== undefined && pwd !== undefined) {
        return true;
    } else return false;
}