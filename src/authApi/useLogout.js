import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router";

const baseUrl = 'http://localhost:3030/users/logout';

export default function useLogout() {
    const { accessToken, setAuthData } = useContext(UserContext);
    const navigate = useNavigate();

    const logout = async () => {
        if (!accessToken) return;

        const response = await fetch(baseUrl, {
            headers: {
                'X-Authorization': accessToken,
            }
        });

        if (response.status === 204){
            setAuthData({});
            navigate('/');
        } else {
            alert("Logout failed!");
            console.error('Logout failed');
        }
    };

    return { logout };
};