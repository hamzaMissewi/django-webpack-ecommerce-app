"use client";
import React, {useCallback, useState} from "react";
import {Divider, Stack, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
// import NavigationLink from "./navigationLink";
// import {useTranslations} from "next-intl";
// import {useLocale} from "use-intl";
// import Image from "next/image";
// import {ThemeToggler} from "@/theme/themeToggler";
// import LocaleSwitcher from "@/components/localeSwitcher";
// import { useTheme } from "next-themes";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

export default function Sidebar() {
    const {t} = useTranslation();

    const [openSidebar, setOpenSidebar] = useState(false);
    const handleToggleSidebar = useCallback(() => {
        setOpenSidebar((isOpen) => !isOpen);
    }, [setOpenSidebar]);

    return (
        <div
            className={`w-55 fixed top-0.5 z-50 flex h-full min-w-0 space-y-2
             rounded-xl border border-black border-white/[0.2] bg-[#fff] dark:bg-gray-800`}
            // shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"*/}
        >
            <Typography variant={"body2"}>{t("sidebar.languages.en")}</Typography>

            <div
                // className={`top-1 ${openSidebar ? (locale === "ar" ? "left-50" : "right-50") : "right-1"} absolute`}
                // className={`top-0 ${locale === "ar" ? "left-[-15px]" : "right-[-15px]"} absolute`}
                className={`top-0 left-[-15px] absolute`}
            >
                <IconButton
                    aria-label="Toggle button"
                    size="small"
                    onClick={handleToggleSidebar}
                    sx={{
                        border: "1px solid black",
                        backgroundColor: "white",
                        // boxShadow:
                        //   "rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px",
                        p: 0.5,
                        ":hover": {
                            backgroundColor: "#f5f5f5",
                            "&:hover": {textDecoration: "none"},
                        },
                    }}
                >
                    {!openSidebar ? (<ChevronLeftIcon fontSize={"small"}/>) : (<ChevronRightIcon fontSize={"small"}/>)}

                    {/*{!openSidebar &&*/}
                    {/*    (locale === "ar" ? (*/}
                    {/*        <ChevronLeftIcon fontSize={"small"}/>*/}
                    {/*    ) : (*/}
                    {/*        <ChevronRightIcon fontSize={"small"}/>*/}
                    {/*    ))}*/}
                    {/*{openSidebar &&*/}
                    {/*    (locale === "ar" ? (*/}
                    {/*        <ChevronRightIcon fontSize={"small"}/>*/}
                    {/*    ) : (*/}
                    {/*        <ChevronLeftIcon fontSize={"small"}/>*/}
                    {/*    ))}*/}
                </IconButton>
            </div>

            {openSidebar && (
                <div
                    // initial={{
                    //   opacity: 0.5,
                    //   x: -100,
                    // }}
                    // animate={{
                    //   x: 0,
                    //   opacity: 1,
                    // }}
                    // transition={{
                    //   duration: 0.4,
                    // }}
                >
                    <Link to={"https://www.b2b-alive.com"} target={"_blank"}>
                        <Stack
                            component={"img"}
                            className={"border border-black-100 bg-white p-1"}
                            // src={"/hamza/b2b-alive.svg"}
                            src="https://s3-eu-west-1.amazonaws.com/public.b2b-alive.files/logo/b2b-alive-logo_256.png"
                            width={140}
                            height={140}
                            alt="b2b alive"
                        />
                    </Link>

                    <div className={"flex flex-col"}>
                        <Link to={"/en"}>{t("sidebar.languages.en")}</Link>
                        <Divider/>
                        <Link to={"/fr"}>{t("sidebar.languages.fr")}</Link>
                        <Divider/>
                        <Link to={"/ar"}>{t("sidebar.languages.ar")}</Link>
                        <Divider/>
                    </div>
                    {/*<div className={"mx-2 flex flex-col space-y-2"}>*/}
                    {/*    <LocaleSwitcher/>*/}
                    {/*    <ThemeToggler/>*/}
                    {/*</div>*/}
                </div>
            )}
        </div>
    );
}


// import React from 'react';
// import {List, ListItem, Typography} from "@mui/material";
// import {Link} from "react-router-dom";
//
// Sidebar.propTypes = {};
//
// function Sidebar() {
//     return (
//         <div className={"text-white bg-black h-full min-h-100 text-left"}>
//             <List>
//                 <ListItem><Link to="/"><Typography>Home</Typography></Link></ListItem>
//                 <ListItem><Link to="/login"><Typography>Login</Typography></Link></ListItem>
//                 <ListItem><Link to="/contact"><Typography>Contact</Typography></Link></ListItem>
//             </List>
//         </div>
//     );
// }
//
// export default Sidebar;