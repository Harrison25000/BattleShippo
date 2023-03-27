import '../../css/Popups.css';
import { randUrl } from '../../helpers/generalHelpers/generalHelper';

export const HostGamePopup = ({ setShowHostGamePopup }) => {
    const hostGame = (e) => {
        window.location.href = `game/${randUrl()}`;
        setShowHostGamePopup(false);
    }

    return (
        <div className="Popup">
            <div className="SubPopup">
                <h2>Host Game</h2>
                <form id="joinGameForm" onSubmit={(e) => hostGame(e)}>
                    <label for="numOfPlayers" >Number of players:</label>
                    <select id="numOfPlayers">
                        <option value="2" >2</option>
                        <option value="3" >3</option>
                        <option value="4" >4</option>
                    </select>
                    <label for="numOfMissiles" >Number of missiles per turn per player:</label>
                    <select id="numOfMissiles">
                        <option value="1" >1</option>
                        <option value="2" >2</option>
                        <option value="3" >3</option>
                        <option value="4" >4</option>
                    </select>
                    <input type="submit" value="Host" />
                </form>
                <button onClick={() => {
                    setShowHostGamePopup(false);
                }}>Close</button>
            </div>
        </div>
    )
}