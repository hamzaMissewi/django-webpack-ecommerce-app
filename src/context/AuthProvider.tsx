import React, {createContext, useCallback, useContext, useMemo, useState} from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {Backdrop, CircularProgress, Dialog} from "@mui/material";


// type UserTypeNormal = {
// username: string
// email: string
// loggedIn: boolean
// password: string
// firstName?: string
// lastName?: string
// address?: string
// age?: number
// }

type SessionProject = {
    id: string;
    label: string;
    name: string;
};

type SessionOrganization = {
    id: string;
    label: string;
    name: string;
    // projects: OrderedMap<string, SessionProject>; Immutable
    projects: Map<string, SessionProject>;
}


type AuthContextType = {
    loggedIn: boolean;
    email: string;
    password: string;
    username: string | null;
    other?: {
        isGlobalAdmin: boolean;
        isInit: boolean;
        lastname: string | null;
        firstname: string | null;
        language: string | null;
        organizationId: string | null;
        organizationName: string | null;
        organizationLabel: string | null;
        projectId: string | null;
        projectName: string | null;
        projectLabel: string | null;
        projectRootFolderId: string | null;
        signIn: (data: { username: string, password: string }) => Promise<any>
        // signIn: (data: LoginInput) => Promise<
        //     {
        //     session: GetSessionQuery['session'] | null; // types.ts
        //     error: LoginErrorName | null; // error graphql in types.ts
        //     ssoAssignToken: string | null;
        //     mfa: {
        //         required: boolean;
        //         providers: Mfa_Token_Provider[]; // Types.ts
        //         loginTransactionToken: string | null;
        //         loginTransactionExpireInSeconds: number | null;
        //     };
        // }>;
        organizations: Map<string, SessionOrganization>;
        // setTokens: (accessToken?: string, refreshToken?: string) => Promise<GetSessionQuery['session'] | null>;
        signOut: () => void;
        setOrganization: (organizationId: string, organizationName: string, organizationLabel: string) => void;
        setProject: (projectId: string, projectName: string, projectLabel: string, rootFolderId: string) => void;
    }
}


// interface AuthContextType {
//     user: AuthContextType;
//     setUser: React.Dispatch<React.SetStateAction<AuthContextType>>;// (user: UserType) => void
// }


const REFRESH_TOKEN_STORAGE_KEY = 'hamza:graphql:refreshToken';
const ACCESS_TOKEN_STORAGE_KEY = 'hamza:graphql:accessToken';


export function getAccessToken() {
    return sessionStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
}

export function setAccessToken(token: string) {
    sessionStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
}

export function setRefreshToken(token: string) {
    const oldValue = getRefreshToken();
    localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, token);
    const event = new StorageEvent('storage', {
        key: REFRESH_TOKEN_STORAGE_KEY,
        newValue: token,
        oldValue,
        storageArea: localStorage,
    });
    window.dispatchEvent(event);
}

// const authContextFactory = Record<IAuthContext>({})
// const defaultContextState = authContextFactory();
// type AuthContextState = RecordOf<IAuthContext>;


const AuthContext = createContext<AuthContextType | undefined>(undefined)

const defaultAuthState: AuthContextType = {
    email: "hamza@gmail.com",
    password: "shadow",
    username: "hamza",
    loggedIn: false
}

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<AuthContextType>(defaultAuthState);
    const [isInit, setIsInit] = React.useState<boolean>(false);

    // const fetchingSessionPromise = useRef<Promise<GetSessionQuery['session'] | null> | null>(null);

    // Graphql needed Mutations
    // const [loadSession] = useSession();
    // const [login] = useLogin();
    // const [logoutFromEndpoint] = useLogout();

    const resetState = useCallback(() => {
        setUser({
            loggedIn: false,
            // isGlobalAdmin: false,
            username: null,
            email: "",
            password: ""
            // lastname: null,
            // firstname: null,
            // isInit: true,
        });
    }, []);

    // const valueMemo = useMemo(() => ({user, setUser}), [user]);
    const valueMemo = useMemo(() => ({...user, setUser}), [user]);

    // if (!isInit) {
    //     return (
    //         <Dialog fullScreen open={true} transitionDuration={0}>
    //             <Backdrop sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}} open={true}>
    //                 <CircularProgress color="inherit"/>
    //             </Backdrop>
    //         </Dialog>
    //     );
    // }

    return (
        <AuthContext.Provider value={valueMemo}>
            {children}
        </AuthContext.Provider>
    );
};

// export const useAuth = () => useContext(AuthContext);
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context
}

export const RequireAuth = () => {
    const {loggedIn} = useAuth();
    const location = useLocation();

    if (!loggedIn) {
        return <Navigate to="/login" state={{from: location}} replace/>;
        // return <Navigate to="/v3/ui/auth" state={{from: location}} replace/>;
    }

    return <Outlet/>;
};

export const RequireAuthWithChildren = ({children}: { children: JSX.Element }) => {
    const {loggedIn} = useAuth();
    const location = useLocation();

    if (!loggedIn) {
        return <Navigate to="/login" state={{from: location}} replace/>;
        // return <Navigate to="/v3/ui/auth" state={{from: location}} replace/>;
    }

    return children
};

