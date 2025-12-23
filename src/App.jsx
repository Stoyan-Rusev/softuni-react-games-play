import { Routes, Route } from 'react-router'

import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Catalogue from './components/catalogue/Catalogue'
import CreateGame from './components/create-game/CreateGame'
import DetailsGame from './components/details-game/DetailsGame'
import EditGame from './components/edit-game/EditGame'
import Login from './components/login/Login'
import Register from './components/register/Register'

function App() {

    return (
        <div id="box">
            <Header />

            <main id="main-content">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/games' element={<Catalogue />} />
                    <Route path='/games/create' element={<CreateGame />} />
                    <Route path='/games/id/details' element={<DetailsGame />} />
                    <Route path='/games/id/edit' element={<EditGame />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </main>
        </div>
    )
}

export default App
