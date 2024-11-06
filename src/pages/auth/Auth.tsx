// import {Box, Container, Dialog} from "@mui/material";
// import {Navigate, Outlet} from "react-router-dom";
// import {Copyright} from "@mui/icons-material";
// import {useEffect} from "react";
//
// export function LoggedInChecker({children}: { children: JSX.Element }) {
//     const location = useLocation();
//     const auth = useAuth();
//
//     const {loginContext, updateLoginContext} = useLoginContext();
//
//     let from: Location | null = null;
//     if (isLocationStateData(location.state)) {
//         from = location.state.from;
//     }
//
//     if (from && from.pathname.startsWith('/v3/ui/auth')) {
//         from = null;
//     }
//     useEffect(() => {
//         updateLoginContext({from});
//     }, []);
//
//     const isResetPasswordPage = location.pathname.startsWith('/v3/ui/auth/resetPassword');
//     const isForgotPasswordPage = location.pathname.startsWith('/v3/ui/auth/forgotPassword');
//
//     const needUpdateState = from === null && loginContext.from !== null;
//     const needToQuitLoginPage =
//         auth.loggedIn && !isResetPasswordPage && !isForgotPasswordPage && !loginContext.isRedirectAfterLogin;
//
//     // show nothing if auth is not initialized
//     if (!loginContext.isInit) {
//         return null;
//     }
//
//     return (
//         <>
//             {children}
//             {needUpdateState && <Navigate to={location} state={{from: loginContext.from}} replace={true}/>};
//             {needToQuitLoginPage && <Navigate to={loginContext.from || '/'} replace={true}/>}
//         </>
//     );
// }
//
//
// export default function Auth() {
//     return (
//         // <LoginContextProvider>
//         <Dialog fullScreen open={true} transitionDuration={0}>
//             <Container component="main" maxWidth="xs">
//                 <LoggedInChecker>
//                     <>
//                         <Box
//                             sx={{
//                                 marginTop: 8,
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 alignItems: 'center',
//                             }}
//                         >
//                             <Outlet/>
//                         </Box>
//                         <Copyright sx={{mt: 8, pb: 8}}/>
//                     </>
//                 </LoggedInChecker>
//             </Container>
//         </Dialog>
//         // </LoginContextProvider>
//     );
// }
