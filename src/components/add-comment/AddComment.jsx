import { create } from '../../services/commentService'

export default function AddComment({
    email,
    gameId,
    commentsRefresh,
}) {
    const commentAction = async (formData) => {
        const commentText = formData.get('comment');
        const comment = await create(gameId, email, commentText);
        
        commentsRefresh(comment);
    };
    
    return (
        <article className="create-comment">
            <label>Add new comment:</label>
            <form className="form" action={commentAction}>
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input className="btn submit" type="submit" value="Add Comment" />
            </form>
        </article>
    );
};
