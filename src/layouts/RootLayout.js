import { Outlet, NavLink } from "react-router-dom";
import Cookies from 'js-cookie';
import Navigation from './Navigation';

export default function RootLayout() {
    return (
        <div className="root-layout">
            <header>
                <Navigation/>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}