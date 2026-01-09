const baseUrl = 'http://localhost:3030/jsonstore/games';

export const create = async (gameData) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
    });

    const result = await response.json();
    return result;
}

export const getAll = async() => {
    const response = await fetch(baseUrl);
    const data = await response.json();
    const games = Object.values(data);

    return games;
}

export const getOne = async (gameId) => {
    const response = await fetch(`${baseUrl}/${gameId}`);
    const data = await response.json();
    return data;
};

export const deleteGame = async (gameId) => {
    const response = await fetch(`${baseUrl}/${gameId}`, {
        method: 'DELETE',
    });

      if (!response.ok) {
        throw new Error('Failed to delete game');
    }

    return true;
};

export const editGame = async (game) => {
    const response = await fetch(`${baseUrl}/${game._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(game)
    });

    if (!response.ok) {
        throw new Error('Unsuccessful game edit!')
    };

    const editedGame = await response.json();
    return editedGame;
}