import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const baseUrl = 'http://localhost:3030/data/games'

export default function useCreate() {
    const { accessToken } = useContext(UserContext);

    const createGame = async (gameData) => {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': accessToken,
            },
            body: JSON.stringify(gameData),
        });

        const result = await response.json();

        return result;
    };

    return createGame;
};