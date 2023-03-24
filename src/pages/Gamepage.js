import { useEffect, useState } from 'react';
import { Ships } from '../components/Ships';
import '../css/Gamepage.css';
import { getMission, setupMap, getCell, placeBoat, showMoveOptions, removeAllMoveDots } from '../helpers/gameplayHelpers/gameplayHelper';
import target from '../media/Target.png';
import { Fire } from '../components/Fire';
import { FirstTurnPlaceShips } from '../components/FirstTurnPlaceShips';
import $ from 'jquery';

function Gamepage() {

    const [mission, setMission] = useState({});
    const [turnCount, setTurnCount] = useState(0);
    const [ships, setShips] = useState({ battleship: 1, aircraftCarrier: 1, ferry: 1, rib: 1, submarine: 1, cargoShip: 1 });

    $('body').off('click').on('click', "#shipInCell", function (e) {
        const ship = e.target.getAttribute('value')
        const parentCell = e.target.parentNode;
        const coordinates = parentCell.getAttribute("title");
        const xAxis = coordinates.split(",")[0].trim();
        const yAxis = coordinates.split(",")[1].trim();
        removeAllMoveDots();
        showMoveOptions({ ship, x: xAxis, y: yAxis });
        // if (!$(event.target).closest(sel + ', .popover-body').length) {
        //     $(sel).popover('hide');
        // }
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
                        <FirstTurnPlaceShips ships={ships} setTurnCount={setTurnCount} />
                    )}
                    <Ships ships={ships} setShips={setShips} />
                    <Fire />
                </div>
            </div>
        </div>
    );
}

export default Gamepage;
