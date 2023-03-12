
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom'

// pages
import Home from './pages/Home'
import About from './pages/About'
import Create from './pages/CreateServer'
import Login from './pages/Login'
import Logout from './pages/Logout'
import PasswordReset from './pages/PasswordReset'
import Register from './pages/Register'
import NoMatch from './pages/NoMatch'
import ServerPage from './pages/ServerPage'
import Cookies from 'js-cookie'



// layouts
import RootLayout from './layouts/RootLayout'
import Navigation from './layouts/Navigation'
import AccountVerification from './pages/AccountVerification'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="Create" element={<Create />} />
            <Route path="Logout" element={<Logout />} />
            <Route path="changepassword" >
                <Route path=":token" element={<PasswordReset />} />
            </Route>
            <Route path="verify" >
                <Route path=":token" element={<AccountVerification />} />
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