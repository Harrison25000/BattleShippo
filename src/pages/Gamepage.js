import { useEffect, useState } from 'react';
import { Ships } from '../components/Ships';
import '../css/Gamepage.css';
import { getMission, setupMap, getCell, placeBoat, showMoveOptions, removeAllMoveDots, placeShip, alphabet, removeShip, endTurn } from '../helpers/gameplayHelpers/gameplayHelper';
import target from '../media/Target.png';
import { Fire } from '../components/Fire';
import { FirstTurnPlaceShips } from '../components/FirstTurnPlaceShips';
import $ from 'jquery';

function Gamepage() {

    const [mission, setMission] = useState({});
    const [turnCount, setTurnCount] = useState(0);
    const [ships, setShips] = useState({ battleship: 1, aircraftCarrier: 1, ferry: 1, rib: 1, submarine: 1, cargoShip: 1 });
    const [customShipsWLocation, setCustomShipsWLocation] = useState([]);
    const [firstTurnShipsPlaced, setFirstTurnShipsPlaced] = useState(false);

    useEffect(() => {
        console.log({ customShipsWLocation })
    }, [customShipsWLocation])

    $('body').off('click').on('click', "#shipInCell", function (e) {
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
        const origin = e.target.getAttribute('origin');
        const parentCell = e.target.parentNode;
        const coordinates = parentCell.getAttribute("title");
        const xAxis = coordinates.split(",")[0].trim();
        const yAxis = coordinates.split(",")[1].trim();
        var countToDeduct = 0;
        e.target.remove();
        removeShip({ x: origin.split(',')[0].trim(), y: origin.split(',')[1].trim() })
        placeShip({ ship, x: xAxis, y: yAxis, id: shipId })
        await updateCustomShipsWLocation({ ship: shipArr.join("-"), x: xAxis, y: yAxis, countToDeduct: moveCount }).then(updatedCustomShipsWLocation => {
            setCustomShipsWLocation(updatedCustomShipsWLocation);
            countToDeduct = getCustomShipWLocation({ ship: shipArr.join("-"), customShipsWLocationArr: updatedCustomShipsWLocation }).moveCount
        })
        removeAllMoveDots();
        showMoveOptions({ ship: shipArr.join("-"), x: xAxis, y: yAxis, countToDeduct: countToDeduct });
    });

    const updateCustomShipsWLocation = async ({ ship, x, y, countToDeduct }) => {
        console.log(customShipsWLocation)
        const customShipsWLocationArr = customShipsWLocation.map(obj => {
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

    useEffect(() => {
        setupMap();
        getMission({ setMission });
    }, [])

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
                    {mission.targetCell && (
                        <div className='Flex-Row MissionTargetDiv'>
                            <h3 id="missionTargetText">Mission Target: {mission.targetCell}</h3>
                            <img src={target} alt="target" title="target" id="targetImage" />
                        </div>)
                    }
                    <h5>Turn: {turnCount}</h5>
                    {turnCount === 0 && (
                        <FirstTurnPlaceShips ships={ships} setFirstTurnShipsPlaced={setFirstTurnShipsPlaced} setCustomShipsWLocation={setCustomShipsWLocation} customShipsWLocation={customShipsWLocation} />
                    )}
                    <Ships ships={ships} setShips={setShips} />
                    <Fire />
                    {firstTurnShipsPlaced && <button id="endTurnButton" onClick={() => endTurn(turnCount, setTurnCount, customShipsWLocation, setCustomShipsWLocation)}>End Turn</button>}
                </div>
            </div>
        </div>
    );
}

export default Gamepage;
