import { useEffect, useState } from 'react';
import { Ships } from '../components/Popups/Ships';
import '../css/Gamepage.css';
import '../css/Generics.css';
import shipInfoImage from '../media/ShipInfo.png';
import { getMission, setupMap, getCell, placeBoat, showMoveOptions, removeAllMoveDots, placeShip, alphabet, removeShip, endTurn, saveMap, getMap } from '../helpers/gameplayHelpers/gameplayHelper';
import target from '../media/Target.png';
import { Fire } from '../components/Fire';
import { FirstTurnPlaceShips } from '../components/FirstTurnPlaceShips';
import $ from 'jquery';

function Gamepage() {

    const [mission, setMission] = useState({});
    const [turnCount, setTurnCount] = useState(0);
    const [points, setPoints] = useState(0);
    const [playerCount, setPlayerCount] = useState(0);
    const [missileCount, setMissileCount] = useState(3);
    const [ships, setShips] = useState({ battleship: 1, aircraftCarrier: 1, ferry: 1, rib: 1, submarine: 1, cargoShip: 1 });
    const [customShipsWLocation, setCustomShipsWLocation] = useState([]);
    const [fireLocations, setFireLocations] = useState([]);
    const [firstTurnShipsPlaced, setFirstTurnShipsPlaced] = useState(false);
    const [connected, setConnected] = useState(false);
    const [showShipInfo, setShowShipInfo] = useState(false);
    const [showFireOptions, setShowFireOptions] = useState(true);
    const [waitingForNextTurn, setWaitingForNextTurn] = useState(false);

    const url = window.location.pathname.split("/").pop();

    useEffect(() => {
        if (sessionStorage.getItem('host') === "true") {
            console.log("host")
            setupMap().then(() => saveMap({ url }));
        } else {
            getMap({ url }).then(body => document.getElementsByClassName("Map")[0].insertAdjacentHTML('beforeend', body));
        }
    }, []);

    useEffect(() => {
        if (waitingForNextTurn) {

        }
    }, [waitingForNextTurn])

    useEffect(() => {
        console.log({ customShipsWLocation })
    }, [customShipsWLocation])

    useEffect(() => {
        if (turnCount === 1) {
            getMission({ setMission });
        }
    }, [turnCount])

    $('body').off('click').on('click', "#shipInCell", function (e) {
        if (turnCount === 0) return;
        const ship = e.target.getAttribute('value')
        const parentCell = e.target.parentNode;
        const coordinates = parentCell.getAttribute("title");
        const xAxis = coordinates.split(",")[0].trim();
        const yAxis = coordinates.split(",")[1].trim();
        removeAllMoveDots();
        const countToDeduct = getCustomShipWLocation({ ship: ship }).moveCount
        showMoveOptions({ ship, x: xAxis, y: yAxis, countToDeduct });
    });

    $('body').on('click', ".MoveDot", async function (e) {
        const shipArr = e.target.getAttribute('value').split("-");
        const ship = shipArr[0];
        const shipId = shipArr[1];
        const moveCount = parseInt(e.target.getAttribute('moveCount'));
        console.log({ moveCount })
        const origin = e.target.getAttribute('origin');
        const parentCell = e.target.parentNode;
        const coordinates = parentCell.getAttribute("title");
        const xAxis = coordinates.split(",")[0].trim();
        const yAxis = coordinates.split(",")[1].trim();
        var countToDeduct = 0;
        e.target.remove();
        removeShip({ x: origin.split(',')[0].trim(), y: origin.split(',')[1].trim() })
        placeShip({ ship, x: xAxis, y: yAxis, id: shipId })
        console.log("here")
        await updateCustomShipsWLocation({ ship: shipArr.join("-"), x: xAxis, y: yAxis, countToDeduct: moveCount }).then(updatedCustomShipsWLocation => {
            setCustomShipsWLocation(updatedCustomShipsWLocation);
            countToDeduct = getCustomShipWLocation({ ship: shipArr.join("-"), customShipsWLocationArr: updatedCustomShipsWLocation }).moveCount
        })
        removeAllMoveDots();
        showMoveOptions({ ship: shipArr.join("-"), x: xAxis, y: yAxis, countToDeduct: countToDeduct });
    });

    const updateCustomShipsWLocation = async ({ ship, x, y, countToDeduct }) => {
        const customShipsWLocationArr = customShipsWLocation.map(obj => {
            console.log(obj.ship, obj.moveCount)
            if (obj.ship === ship) {
                return { ship, location: `${x}, ${y}`, moveCount: (obj.moveCount - countToDeduct) }
            }
            return obj
        })
        return customShipsWLocationArr;
    }

    const getCustomShipWLocation = ({ ship, customShipsWLocationArr }) => {
        if (customShipsWLocationArr) {
            return customShipsWLocationArr.filter(obj => obj.ship === ship)[0];
        }
        return customShipsWLocation.filter(obj => obj.ship === ship)[0];
    }

    const connectToGame = async () => {
        setConnected(true);
        setPlayerCount(playerCount + 1)
    }

    return (
        <div className="Gamepage">
            <div className='GamepageFlex'>
                <div className="Map">
                    <table id="mapTable">
                        <tr id="firstRow">
                        </tr>
                    </table>
                </div>
                <div className="InfoSection">
                    {!connected &&
                        <button id="startGameButton" onClick={(e) => {
                            connectToGame();
                        }}>Start Game</button>
                    }
                    {mission.targetCell && (
                        <div className='Flex-Row MissionTargetDiv'>
                            <h3 id="missionTargetText">Mission Target: {mission.targetCell}</h3>
                            <img src={target} alt="target" title="target" id="targetImage" />
                        </div>)
                    }
                    <div className='Flex-Row-Edges'>
                        <h5>Turn: {turnCount}</h5>
                        <h5>Players: {playerCount}</h5>
                        <h5>Points: {points}</h5>
                        <img alt="ship info button" title='ship info' onClick={() => setShowShipInfo(!showShipInfo)} src={shipInfoImage} id="shipInfoImage" />
                    </div>
                    {showShipInfo && (
                        <Ships ships={ships} setShowShipInfo={setShowShipInfo} />
                    )}
                    {turnCount === 0 && connected && (
                        <FirstTurnPlaceShips ships={ships} setFirstTurnShipsPlaced={setFirstTurnShipsPlaced} setCustomShipsWLocation={setCustomShipsWLocation} customShipsWLocation={customShipsWLocation} connected={connected} setConnected={setConnected} playerCount={playerCount} setPlayerCount={setPlayerCount} />
                    )}
                    {connected && showFireOptions && turnCount > 0 && <Fire missileCount={missileCount} setFireLocations={setFireLocations} setShowFireOptions={setShowFireOptions} />}
                    {fireLocations.length > 0 && (
                        <div>
                            <h5>Firing at: {fireLocations.map(coord => coord.join("")).join(", ")}</h5>
                        </div>
                    )}
                    {firstTurnShipsPlaced && !waitingForNextTurn && <button id="endTurnButton" onClick={() => {
                        setWaitingForNextTurn(true);
                        endTurn({ turnCount, setTurnCount, customShipsWLocation, setCustomShipsWLocation, setShowFireOptions, setFireLocations, mission, setPoints, points })
                    }
                    }>End Turn</button>}
                    {(turnCount < 2) &&
                        <div>
                            <button id='resetMapButton' onClick={() => { window.location.reload() }}>Reset Map</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Gamepage;
