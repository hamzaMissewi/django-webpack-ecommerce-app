import React from 'react';
import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar";
import {Stack} from "@mui/material";
import Header from "./Header";


function LayoutComponent({children}: { children: React.ReactNode }) {
    return (
        <Stack className={"flex flex-col flex-1 items-center space-y-7 mt-3"}>
            <Header/>
            <div className={"flex flex-row space-x-5 mx-5 w-full"}>
                <Sidebar/>
                <Stack className="border border-black flex-grow flex-1 md:min-w-550 mr-5 p-2">
                    {children}
                    {/*<Outlet/>*/}
                </Stack>
            </div>
        </Stack>
    );
}

export default LayoutComponent;


// Houssem mansouri
// export const metadata = {
//     title: "Editor - Tensor SVG Loaders",
//     description: "Create and customize your own SVG loading animations in our interactive editor. Preview, customize, and export your loader.",
//     metadataBase: new URL("localhost:3000" + "/editor"),
//     icons: {
//         icon: "/logo.svg",
//     },
//     openGraph: {
//         ...OPEN_GRAPH_EDITOR,
//         images: [...OPEN_GRAPH_EDITOR.images] // Convert readonly array to mutable
//     },1
//     twitter: {
//         ...TWITTER_EDITOR,
//         images: [...TWITTER_EDITOR.images] // Convert readonly array to mutable
//     },
// };


export function EditorLayout({children}: { children: React.ReactNode }) {
    return <div>
        {children}
    </div>
}