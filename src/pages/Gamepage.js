import { useEffect, useState } from 'react';
import { Ships } from '../components/Ships';
import '../css/Gamepage.css';
import { getMission, setupMap, getCell, placeBoat, showMoveOptions, removeAllMoveDots, placeShip, alphabet } from '../helpers/gameplayHelpers/gameplayHelper';
import target from '../media/Target.png';
import { Fire } from '../components/Fire';
import { FirstTurnPlaceShips } from '../components/FirstTurnPlaceShips';
import $ from 'jquery';

function Gamepage() {

    const [mission, setMission] = useState({});
    const [turnCount, setTurnCount] = useState(0);
    const [ships, setShips] = useState({ battleship: 1, aircraftCarrier: 1, ferry: 1, rib: 1, submarine: 1, cargoShip: 1 });
    const [firstTurnShipsPlaced, setFirstTurnShipsPlaced] = useState(false);

    $('body').off('click').on('click', "#shipInCell", function (e) {
        const ship = e.target.getAttribute('value')
        const parentCell = e.target.parentNode;
        const coordinates = parentCell.getAttribute("title");
        const xAxis = coordinates.split(",")[0].trim();
        const yAxis = coordinates.split(",")[1].trim();
        removeAllMoveDots();
        showMoveOptions({ ship, x: xAxis, y: yAxis });
    });

    $('body').on('click', ".MoveDot", function (e) {
        const ship = e.target.getAttribute('value')
        const parentCell = e.target.parentNode;
        const coordinates = parentCell.getAttribute("title");
        const xAxis = coordinates.split(",")[0].trim();
        const yAxis = coordinates.split(",")[1].trim();
        const xAxisIndex = alphabet.indexOf(xAxis);
        console.log({ xAxisIndex, yAxis })
        e.target.remove();
        placeShip({ ship, x: xAxis, y: yAxis })
        removeAllMoveDots();
        showMoveOptions({ ship, x: xAxis, y: yAxis });
    });

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
                        </div>)}
                    {turnCount === 0 && (
                        <FirstTurnPlaceShips ships={ships} setFirstTurnShipsPlaced={setFirstTurnShipsPlaced} />
                    )}
                    <Ships ships={ships} setShips={setShips} />
                    <Fire />
                    {firstTurnShipsPlaced && <button id="endTurnButton" onClick={() => setTurnCount(turnCount + 1)}>End Turn</button>}
                </div>
            </div>
        </div>
    );
}

export default Gamepage;
