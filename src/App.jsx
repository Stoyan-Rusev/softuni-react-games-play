import { useState } from 'react'
import { Routes, Route } from 'react-router'

import { UserContext } from './contexts/UserContext'

import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Catalog from './components/catalog/Catalog'
import CreateGame from './components/create-game/CreateGame'
import DetailsGame from './components/details-game/DetailsGame'
import EditGame from './components/edit-game/EditGame'
import Login from './components/login/Login'
import Register from './components/register/Register'

function App() {
    const [authData, setAuthData] = useState({});

    const userLogin = (data) => {
        setAuthData(data);
    };

    return (
        <UserContext.Provider value={{...authData, userLogin}}>
        <div id="box">
            <Header />

            <main id="main-content">
                <Routes>
                    <Route index element={<Home />} />
                    <Route path='/games'>
                        <Route index element={<Catalog />} />
                        <Route path='create' element={<CreateGame />} />
                        <Route path=':id/details' element={<DetailsGame />} />
                        <Route path=':id/edit' element={<EditGame />} />
                    </Route>
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </main>
        </div>
        </UserContext.Provider>
    )
};

export default App
