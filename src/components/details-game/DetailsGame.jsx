import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";

import { deleteGame, getOne } from "../../services/gameService";
import { getGameComments } from "../../services/commentService";
import AddComment from "../add-comment/AddComment";

import { UserContext } from "../../contexts/UserContext";

export default function DetailsGame() {
    const { email } = useContext(UserContext);
    const { id } = useParams();
    const [game, setGame] = useState({});
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getOne(id)
            .then(data => setGame(data));
        getGameComments(id)
            .then(data => setComments(data));
    }, [id]);

    const commentsRefresh = (newComment) => {
        setComments([
            ...comments,
            newComment,
        ]);
    };

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

                <div className="details-comments">
                    {comments.length === 0
                        ? <p className="no-comment">No comments.</p>
                        : <>
                            <h2>Comments:</h2>
                            <ul>
                                {comments.map(comment =>
                                    <li key={comment._id} className="comment">
                                        <p>{comment.email}: {comment.text}</p>
                                    </li>
                                )}
                            </ul>
                        </>
                    }
                </div>

                <div className="buttons">
                    <Link to={`/games/${id}/edit`} className="button">Edit</Link>
                    <button onClick={deleteGameHandler} className="button">Delete</button>
                </div>
            </div>

            <AddComment email={email} gameId={id} commentsRefresh={commentsRefresh} />
        </section>
    );
};