import { useState } from 'react';
import { HostGamePopup } from '../components/Popups/HostGamePopup';
import { JoinGamePopup } from '../components/Popups/JoinGamePopup';
import '../css/Play.css';

function Play() {

    const [showJoinGamePopup, setShowJoinGamePopup] = useState(false);
    const [showHostGamePopup, setShowHostGamePopup] = useState(false);

    return (
        <>
            {showJoinGamePopup && (<JoinGamePopup setShowJoinGamePopup={setShowJoinGamePopup} />)}
            {showHostGamePopup && (<HostGamePopup setShowHostGamePopup={setShowHostGamePopup} />)}
            <div className="Play">
                <div className="JoinHostSelect">
                    <div className="JoinGame" onClick={() => setShowJoinGamePopup(true)}>
                        <p>Join Game</p>
                    </div>
                    <div className="HostGame" onClick={() => setShowHostGamePopup(true)}>
                        <p>Host Game</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Play;
