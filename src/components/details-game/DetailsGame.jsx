import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";

import { deleteGame, getOne } from "../../services/gameService";
import AddComment from "../add-comment/AddComment";
 
export default function DetailsGame(
    {email,}
) {
    const { id } = useParams();
    const [game, setGame] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getOne(id)
            .then(data => {setGame(data); console.log(email);});
    }, []);

    const deleteGameHandler = async () => {
        const hasConfirmed = confirm(`Are you sure you want to delete ${game.title}?`);

        if (!hasConfirmed) return;

        try {
            await deleteGame(id);
            navigate('/games');
        } catch (err) {
            alert('Failed to delete game: ' + err.message);
        };
    };

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">
                    {game.summary}
                </p>

                {/* <!-- Bonus ( for Guests and Users ) --> */}
                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {/* <!-- list all comments for current game (If any) --> */}
                        <li className="comment">
                            <p>Content: I rate this one quite highly.</p>
                        </li>
                        <li className="comment">
                            <p>Content: The best game.</p>
                        </li>
                    </ul>
                    {/* <!-- Display paragraph: If there are no games in the database --> */}
                    <p className="no-comment">No comments.</p>
                </div>

                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                <div className="buttons">
                    <Link to={`/games/${id}/edit`} className="button">Edit</Link>
                    <button onClick={deleteGameHandler} className="button">Delete</button>
                </div>
            </div>

            <AddComment email={email}/>
        </section>
    );
};