import { useEffect, useState } from "react";

const baseUrl = 'http://localhost:3030/data/games';

export default function useGame(id) {
    const [game, setGame] = useState({});

    useEffect(() => {
        if (!id) return;

        async function fetchData(gameId) {
            try {
                const response = await fetch(`${baseUrl}/${gameId}`);
                const data = await response.json();
                setGame(data);
            } catch (err) {
                console.error('Failed to fetch game:', err);
            }
            
        };

        fetchData(id);
    }, [id]);

    return { game };

};