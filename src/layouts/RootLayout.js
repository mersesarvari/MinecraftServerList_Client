import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
