import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const baseUrl = 'http://localhost:3030/data/games';

export default function useGames() {
    const [games, setGames] = useState([]);
    const { accessToken } = useContext(UserContext);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(baseUrl);

            const data = await response.json();
            const gamesData = Object.values(data);
            setGames(gamesData);
        }

        fetchData();
    }, [accessToken]);

    return games;
}

