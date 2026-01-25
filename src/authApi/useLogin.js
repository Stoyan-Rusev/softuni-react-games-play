const baseUrl = 'http://localhost:3030/users/login'

export default function useLogin() {

    const login = (userData) => {
        const email = userData.email;
        const password = userData.password;

        const authData = fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password}),
        });

        return authData;
    };

    return login;
};

