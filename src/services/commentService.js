const baseUrl = 'http://localhost:3030/jsonstore/comments'

export const create = async (gameId, email, text) => {
    const commentData = {gameId, email, text}

    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentData),
    })

    const comment = response.json();
    return comment;
};

export const getGameComments = async (gameId) => {
    const response = await fetch(baseUrl);
    const commentsList =Object.values(await response.json());
    const filteredComments = commentsList.filter(comment => comment.gameId === gameId);

    return filteredComments;
};  
