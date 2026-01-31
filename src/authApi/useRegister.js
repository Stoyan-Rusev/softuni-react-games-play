import { useEffect, useRef } from "react"

const url = 'http://localhost:3030/users/register'

export default function useRegister() {
    const controllerRef = useRef(null);

    useEffect(() => {
        return () => {
            controllerRef.current?.abort();
        };
    }, []);

    const register = async (userData) => {
        controllerRef.current?.abort();
        controllerRef.current = new AbortController();

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData),
                signal: controllerRef.current.signal,
            });


            if (!response.ok) {
                return {
                    data: null,
                    error: `Registration failed (${response.status})`
                };
            }

            const registerData = await response.json();
            return registerData;

        } catch (error) {
            if (error.name === "AbortError")
                return { data: null, error: null };

            return {
                data: null,
                error: err.message || 'Unexpected error'
            };
        }
    };

    return register;
};