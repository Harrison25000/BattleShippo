import Homepage from './pages/Homepage.js';
import Instructions from './pages/Instructions.js';
import Play from './pages/Play.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gamepage from './pages/Gamepage';

const Routing = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/play" element={<Play />} />
                    <Route path="/instructions" element={<Instructions />} />
                    <Route path="/game/*" element={<Gamepage />} />
                </Routes>
            </Router>
        </div>
    )
}

export default Routing;