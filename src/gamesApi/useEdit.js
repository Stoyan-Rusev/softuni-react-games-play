import { useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";

const baseUrl = 'http://localhost:3030/data/games'

export default function useEdit(gameId) {
    const { accessToken } = useContext(UserContext);
    const navigate = useNavigate();

    const editGame = async (e) => {
        e.preventDefault();

        let formData = Object.fromEntries(new FormData(e.target));
        formData._id = gameId;

        try {
            const response = await fetch(`${baseUrl}/${gameId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': accessToken,
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Unsuccessful game edit!')
            };
            navigate(`/games/${gameId}/details`);

        } catch (err) {
            alert(err.message);
            console.log(err);
        };
    };

    return { editGame };
}


