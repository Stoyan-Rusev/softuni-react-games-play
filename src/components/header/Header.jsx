import { useContext } from 'react';
import { Link } from 'react-router'

import { UserContext } from '../../contexts/UserContext';
import useLogout from '../../authApi/useLogout';

export default function Header() {
    const { email, accessToken } = useContext(UserContext);
    const { logout } = useLogout();

    const isAuthenticated = !!accessToken

    return (
        <header>
            <h1><Link className="home" to="/">GamesPlay</Link></h1>
            <nav>
                <Link to="/games">All games</Link>
                
                {isAuthenticated
                    ?
                    <div id="user">
                        <Link to="/games/create">Create Game</Link>
                        <button className='nav a' onClick={() => logout()}>Logout</button>
                    </div>
                    :
                    <div id="guest">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                }
                <p>{email}</p>
            </nav>
        </header>
    );
};
