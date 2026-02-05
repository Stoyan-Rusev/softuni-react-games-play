import { useParams } from "react-router";
import useGame from "../../gamesApi/useGame";
import useEdit from "../../gamesApi/useEdit";

export default function EditGame() {
    const { id } = useParams();
    const { game } = useGame(id);
    const { editGame } = useEdit(id);

    const submitHandler = async (e) => {
        e.preventDefault();
        let formData = Object.fromEntries(new FormData(e.target));

        editGame(formData);
    };

    return (
        <section id="edit-page" className="auth">
            <form onSubmit={submitHandler} id="edit">
                <div className="container">

                    <h1>Edit Game</h1>
                    <label htmlFor="title">Legendary title:</label>
                    <input type="text" id="title" name="title" defaultValue={game.title} />

                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" defaultValue={game.category} />

                    <label htmlFor="maxLevel">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" defaultValue={game.maxLevel} />

                    <label htmlFor="imageUrl">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" defaultValue={game.imageUrl} />

                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary" defaultValue={game.summary}></textarea>
                    <input className="btn submit" type="submit" />

                </div>
            </form>
        </section>
    );
};