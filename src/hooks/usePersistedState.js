import { useState } from 'react'

export default function usePersistedState(initial) {
    const [state, setState] = useState(() => {
        const authData = localStorage.getItem('auth');

        if (authData === null) {
            const initialJson = JSON.stringify(initial)
            localStorage.setItem('auth', initialJson);
            return initial;
        };

        return JSON.parse(authData);
    });

    const setPersistedState = (data) => {
        setState(data);
        const dataJson = JSON.stringify(data);
        localStorage.setItem('auth', dataJson);
    };

    return [state, setPersistedState];
};