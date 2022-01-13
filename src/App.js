import React from "react";
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import Fleet from './Fleet';
import Home from './Home';

function App() {
    return (
    <BrowserRouter>
        <div className="meniu_container">
            <ul className="meniu">
                <li><Link to="/"><a className="menu-item">HOME</a></Link></li>
                <li><Link to="/fleet"><a className="menu-item">VEDERE DE ANSAMBLU</a></Link></li>
            </ul>
        </div>
        <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/fleet'} element={<Fleet />} />
        </Routes>
    </BrowserRouter>
)
}

export default App;