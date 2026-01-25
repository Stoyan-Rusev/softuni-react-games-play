import { useEffect, useRef } from "react";

const baseUrl = 'http://localhost:3030/users/login'

export default function useLogin() {
    const controllerRef = useRef(null);

    useEffect(() => {
        return () => {
            controllerRef.current?.abort();
        }
    }, []);

    const login = async (userData) => {
        controllerRef.current?.abort();
        controllerRef.current = new AbortController();

        const { email, password } = userData;

        try {
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                signal: controllerRef.current.signal,
            });

            if (!response.ok) {
                return { error: `Login failed: ${response.status}`, email: '' };
            }

            const authData = await response.json();
            return authData;

        } catch (error) {
            if (error.name === "AbortError") {
                console.log("Login aborted");
                return; 
            }
            
            console.log(error);
            return {error, email: ''}
        }

    };

    return login;
};

