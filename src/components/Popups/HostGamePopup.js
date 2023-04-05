import '../../css/Popups.css';
import { randUrl } from '../../helpers/generalHelpers/generalHelper';
import { getBackendUrl } from '../../helpers/gameplayHelpers/gameplayHelper';
import { useState, useEffect } from 'react';

export const HostGamePopup = ({ setShowHostGamePopup }) => {

    const [playerName, setPlayerName] = useState("");
    const [formError, setFormError] = useState({ playerName: false });

    const hostGame = (e) => {
        e.preventDefault();
        if (!playerName) {
            setFormError({ playerName: true })
            return;
        };
        const url = randUrl();
        var numberOfPlayersElem = document.getElementById("numOfPlayers");
        var numberOfPlayers = parseInt(numberOfPlayersElem.value);
        var numberOfMissilesElem = document.getElementById("numOfMissiles");
        var missilesPerTurn = parseInt(numberOfMissilesElem.value);
        console.log({ url, numberOfPlayers, missilesPerTurn, playerName })
        createGame({ url, numberOfPlayers, missilesPerTurn, playerName })
        setShowHostGamePopup(false);
        sessionStorage.setItem('host', true);
        sessionStorage.setItem('joiner', false);
        window.location.href = `game/${url}`;
    }

    const createGame = async ({ url, missilesPerTurn, numberOfPlayers, playerName }) => {
        try {
            await fetch(getBackendUrl() + 'createGame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    post: {
                        url,
                        missilesPerTurn,
                        playerName,
                        numberOfPlayers
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
                <h2>Host Game</h2>
                <form id="joinGameForm" onSubmit={(e) => hostGame(e)}>
                    {formError.playerName ? (
                        <label for="playerName" style={{ "color": "red" }}><i>*Player Name:&nbsp;</i></label>
                    ) : (
                        <label for="playerName" >Player Name:&nbsp;</label>
                    )}
                    <input id="playerName" type="text" onChange={(e) => setPlayerName(e.target.value)}></input><br />
                    <label for="numOfPlayers" >Number of players:&nbsp;</label>
                    <select id="numOfPlayers">
                        <option value="2" >2</option>
                        <option value="3" >3</option>
                        <option value="4" >4</option>
                    </select><br />
                    <label for="numOfMissiles" >Number of missiles per turn:&nbsp;</label>
                    <select id="numOfMissiles">
                        <option value="1" >1</option>
                        <option value="2" >2</option>
                        <option value="3" >3</option>
                        <option value="4" >4</option>
                    </select><br />
                    <div >
                        <input type="submit" value="Host" />
                        <button className="Flex" onClick={() => {
                            setShowHostGamePopup(false);
                        }}>Close</button>
                    </div>
                </form>
            </div>
        </div >
    )
}