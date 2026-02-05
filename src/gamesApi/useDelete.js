import { useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";

const baseUrl = 'http://localhost:3030/data/games';

export default function useDelete(gameId, title) {
    const { accessToken } = useContext(UserContext);
    const navigate = useNavigate();

    const deleteGame = async () => {
        const hasConfirmed = confirm(`Are you sure you want to delete ${title}?`);

        if (!hasConfirmed) return;

        try {
            const response = await fetch(`${baseUrl}/${gameId}`, {
                method: 'DELETE',
                headers: {
                    'X-Authorization': accessToken,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete game');
            }

            navigate('/games');
        } catch (error) {
            alert('Failed to delete game: ' + error.message);
        };

        return true;
    };

    return { deleteGame };
};