import { Outlet, NavLink } from "react-router-dom";
import { useEffect, useState} from 'react';
import Cookies from 'js-cookie';

const Navigation = () => {

    function CheckLogin() {
        let email = Cookies.get('email');
        let pwd = Cookies.get('password');
        if (email !== undefined && pwd !== undefined) {
            return true;
        } else return false;
    }

    function LoadNavigation() {
        if (CheckLogin()) {
            return (
                <nav>
                    <h1>MCMania.com</h1>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="about">About</NavLink>
                    <NavLink to="create">Create</NavLink>
                    <NavLink to="logout"> Logout </NavLink>
                </nav>
            )

        }
        else {
            return (

                <nav>
                    <h1>MCMania.com</h1>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="about">About</NavLink>
                    <NavLink to="login">Login</NavLink>
                    <NavLink to="register">Register</NavLink>
                    <NavLink to="create">Create</NavLink>
                </nav>
            ) 
        } 

    }
    return (
        <div>
            {
                LoadNavigation()
            }
        </div>
    )
}

export default Navigation;