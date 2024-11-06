import React from 'react';
import {Link} from "react-router-dom";
import {Typography} from "@mui/material";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Button from "@mui/material/Button";
import {useAuth} from "../context/AuthProvider";
import {useNavigationHook} from "../hooks/useNavigation";


function Header() {
    const {loggedIn, username, email} = useAuth();
    const {navigate} = useNavigationHook()


    return (
        <nav className={"flex flex-row space-x-5 items-center justify-between w-full relative"}>
            <div className={"flex flex-row space-x-3"}>
                <Link to="/">
                    <Typography className={"text-gray-800 hover:text-blue-500"}>Home</Typography>
                </Link>
                {loggedIn && (
                    <div className={"flex flex-col space-y-2"}>
                        <h1>Hello, <span><strong>{email}</strong></span></h1>
                        <h5>{username}</h5>
                    </div>
                )}

                <Button variant="contained" size={"small"}
                        className="px-2 bg-blue-500 text-white rounded" onClick={() => navigate({pathname: '/login'})}>
                    Login
                </Button>
                <Button variant="contained" size={"small"}
                        className="px-2 bg-blue-500 text-white rounded"
                        onClick={() => navigate({pathname: '/signUp'})}>
                    Register
                </Button>
                <Link to="/cart"><Typography
                    className={"text-gray-800 hover:text-blue-500"}>Cart</Typography></Link>
            </div>

            <Link to="/chart"><ShoppingBasketIcon/></Link>

            {/*<ul>*/}
            {/*    <li><Link to="/">*/}
            {/*        <Typography className="text-gray-800 hover:text-blue-500>Home</Typography>*/}
            {/*    </Link></li>*/}
            {/*    <li><Link to="/login"><Typography>Login</Typography></Link></li>*/}
            {/*    <li><Link to="/lounge"><Typography>Lounge</Typography></Link></li>*/}
            {/*    <li>*/}
            {/*        <Link to="/chart">*/}
            {/*            <ShoppingBasketIcon/>*/}
            {/*        </Link>*/}
            {/*    </li>*/}
            {/*</ul>*/}
            {/*</nav>*/}
        </nav>
    );
}

export default Header;