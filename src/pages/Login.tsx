import React, {useState} from "react";
import {useAuth} from "../context/AuthProvider";
import {useNavigate} from "react-router-dom";
import {TextField} from "@mui/material";

// TODO
const Login = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {loggedIn} = useAuth();
    const [user, setUser] = useState<{ username?: string, email: string, password: string }>()
    const navigate = useNavigate();

    const handleLogin = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUser({password, email: email});
        navigate("/lounge");
    };

    return (
        <form onSubmit={handleLogin}>
            <TextField
                variant={"standard"}
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Type username..."
            />
            <TextField
                variant={"standard"}
                fullWidth
                // error={}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type Email..."
            />
            <TextField
                variant={"standard"}
                fullWidth
                value={password}
                type={"password"}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type password..."
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;