const url = 'http://localhost:3030/users/register'

export default function useRegister(username, email) {
    const register = async (userData) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const registerData = response.json();

        return registerData;
    };

    return register;
};