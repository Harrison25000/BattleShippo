import '../../css/Popups.css';
import { getBackendUrl } from '../../helpers/gameplayHelpers/gameplayHelper';
import { useState } from 'react';

export const JoinGamePopup = ({ setShowJoinGamePopup }) => {

    const [playerName, setPlayerName] = useState("");
    const [formError, setFormError] = useState({ playerName: false });

    const joinGame = (e) => {
        e.preventDefault();
        if (!playerName) {
            setFormError({ playerName: true })
            return;
        };
        const url = document.getElementById("url").value;
        connecttogame({ url, playerName })
        setShowJoinGamePopup(false);
        sessionStorage.setItem('host', false);
        sessionStorage.setItem('joiner', true);
        window.location.href = `game/${url}`;
    }

    const connecttogame = async ({ url, playerName }) => {
        try {
            await fetch(getBackendUrl() + 'connecttogame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    post: {
                        url,
                        playerName,
                    }
                })
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="Popup">
            <div className="SubPopup">
                <h2>Join Game</h2>
                <form id="joinGameForm" onSubmit={(e) => joinGame(e)}>
                    {formError.playerName ? (
                        <label for="playerName" style={{ "color": "red" }}><i>*Player Name:&nbsp;</i></label>
                    ) : (
                        <label for="playerName" >Player Name:&nbsp;</label>
                    )}
                    <input id="playerName" type="text" onChange={(e) => setPlayerName(e.target.value)}></input><br />
                    <input type="text" id="url" />
                    <input type="submit" />
                </form>
                <button onClick={() => {
                    setShowJoinGamePopup(false);
                }}>Close</button>
            </div>
        </div>
    )
}