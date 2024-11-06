import {useOutletContext} from "react-router";
import {AuthProvider, RequireAuth, RequireAuthWithChildren} from "./context/AuthProvider";
import {Outlet} from "react-router-dom";


// interface IPageContainerProps {
//     topBarTitleEl?: HTMLElement | null;
// }

// export function usePageContext() {
//     return useOutletContext<IPageContainerProps>();
// }

function RequireAuthPage() {
    return (
        <RequireAuthWithChildren>
            {/*<Outlet context={usePageContext()}/>*/}
            <Outlet/>
        </RequireAuthWithChildren>
    );
}

export default RequireAuthPage