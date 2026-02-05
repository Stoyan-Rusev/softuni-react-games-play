import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";

import { getGameComments } from "../../services/commentService";
import useGame from "../../gamesApi/useGame"

import AddComment from "../add-comment/AddComment";

import { UserContext } from "../../contexts/UserContext";
import useDelete from "../../gamesApi/useDelete";

export default function DetailsGame() {
    const { email, _id } = useContext(UserContext);
    const { id } = useParams();
    const { game } = useGame(id);
    const { deleteGame } = useDelete(id, game.title);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getGameComments(id)
            .then(data => setComments(data));
    }, [id]);

    const commentsRefresh = (newComment) => {
        setComments([
            ...comments,
            newComment,
        ]);
    };

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={game?.imageUrl} />
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

                {game._ownerId === _id &&
                    <div className="buttons">
                        <Link to={`/games/${id}/edit`} className="button">Edit</Link>
                        <button onClick={deleteGame} className="button">Delete</button>
                    </div>
                }

            </div>

            {email && <AddComment email={email} gameId={id} commentsRefresh={commentsRefresh} />}

        </section>
    );
};