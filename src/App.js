import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom'

// pages
import Home from './pages/Home'
import About from './pages/About'
import Create from './pages/server/CreateServer'
import Login from './pages/Login'
import Logout from './pages/Logout'
import PasswordReset from './pages/tokenpages/NewPasswordRequest'
import Register from './pages/Register'
import NoMatch from './pages/NoMatch'
import  { accountVerificationLoader, serverDetailsLoader, serverListLoader } from './Components/DataLoaders'
import Cookies from 'js-cookie'



// layouts
import RootLayout from './layouts/RootLayout'
import Navigation from './layouts/Navigation'
import AccountVerificationRequest from './pages/tokenpages/AccountVerificationRequest'
import ForgotPasswordRequest from './pages/tokenpages/ForgotPasswordRequest'
import NewPasswordRequest from './pages/tokenpages/NewPasswordRequest'
import ServerNotFound from './pages/server/ServerNotFound'
import ServerDetailsLayout from './pages/server/ServerDetailsLayout'
import ServerDetails from './pages/server/ServerDetails'
import ServerError from './pages/server/ServerError'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index 
                element={<Home />} 
                loader={serverListLoader}
                errorElement={<ServerError/>}
            />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="Create" element={<Create />} />
            <Route path="Logout" element={<Logout />} />
            <Route path="forgotpassword" element={<ForgotPasswordRequest />} />
            <Route path="resetpassword" >
                <Route path=":token" element={<NewPasswordRequest />} />
            </Route>
            <Route path="verify" >
                <Route 
                path=":token" 
                element={<AccountVerificationRequest />}  
                loader={accountVerificationLoader}
                errorElement={<ServerError/>}              
                 />
            </Route>
            <Route path="server" element={<ServerDetailsLayout/>} >
                <Route 
                path=":id" 
                element={<ServerDetails/>}
                loader={serverDetailsLoader}
                errorElement={<ServerError/>}
            />
            </Route>
            <Route path="*" element={<NoMatch />} />
        </Route>
    )
)

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App