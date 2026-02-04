import { useEffect, useState } from "react";

const baseUrl = 'http://localhost:3030/data/games';

export default function useGame(id) {
    const [game, setGame] = useState({});

    useEffect(() => {
        async function fetchData(gameId) {
            const response = await fetch(`${baseUrl}/${gameId}`);
            const data = await response.json();
            setGame(data);

            return data;
        };

        fetchData(id);
    }, []);

    return { game };

};