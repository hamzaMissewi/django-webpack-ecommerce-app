import React from 'react';
import {Route, BrowserRouter as Router, Routes, Navigate, Outlet} from "react-router-dom";
import {AuthProvider} from "./context/AuthProvider";
import Layout from "./components/Layout";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Lounge from "./pages/Lounge";
import Register from "./pages/Register";
import NotFound from "./components/notFound/NotFound";
import {ThemeProvider} from "@mui/material";
import theme from "./theme";
import RequireAuthPage from "./RequireAuth";

function Admin() {
    return (
        <AuthProvider>
            <Router>
                <Layout>
                    <Routes>
                        {/*<Route path="/v3/ui/" element={<AppContainer />}>*/}
                        <Route path={"/"} index element={<Home/>}/>
                        <Route path="/home" element={<Navigate to="/v3/ui" replace/>}/>
                        <Route path={"/home"} element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signUp" element={<Register/>}/>
                        <Route path={"/cart"} index element={<Cart/>}/>
                        <Route element={<RequireAuthPage/>}>
                            <Route path="/commerce" element={<Lounge/>}/>
                        </Route>
                        {/* Other routes can go here */}
                        {/*<Route path="*" element={<NotFound/>}/>*/}
                        {/*<Route path="importVideos" element={<ImportVideoPage />}>*/}
                        {/*  <Route path={':url'} element={null} />*/}
                        {/*</Route>*/}
                    </Routes>
                </Layout>
            </Router>
        </AuthProvider>
    );
}

export default Admin;