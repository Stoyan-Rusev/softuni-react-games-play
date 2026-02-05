import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function useLogout() {
    const { email, setAuthData } = useContext(UserContext);

    const logout = () => {
        if (!email) return;
        setAuthData({});
        console.log('logged out');
    };

    return { logout };
};