import { useState } from 'react'

export default function usePersistedState(initial) {
    const [state, setState] = useState(() => {
        const authData = localStorage.getItem('auth');

        if (authData === null) {
            localStorage.setItem('auth', initial);
        };

        return initial;

    });

    return [state, setState];
};