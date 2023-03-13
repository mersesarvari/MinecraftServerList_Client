import { Outlet } from "react-router-dom";

const ServerDetailsLayout = () => {
    return ( 
        <div>
            <h2>Server Details</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit quae libero cupiditate ullam magni repellendus at ipsa iure velit nulla sit qui et minus nobis, fugiat rem error aspernatur necessitatibus?</p>
            <Outlet />
        </div>
     );
}
 
export default ServerDetailsLayout;