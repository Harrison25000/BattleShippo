import '../../css/Popups.css';

export const JoinGamePopup = ({ setShowJoinGamePopup }) => {
    const joinGame = (e) => {
        window.location.href = e.target[0].value;
        setShowJoinGamePopup(false);
    }

    return (
        <div className="Popup">
            <div className="SubPopup">
                <h2>Join Game</h2>
                <form id="joinGameForm" onSubmit={(e) => joinGame(e)}>
                    <input type="text" />
                    <input type="submit" />
                </form>
                <button onClick={() => {
                    setShowJoinGamePopup(false);
                }}>Close</button>
            </div>
        </div>
    )
}