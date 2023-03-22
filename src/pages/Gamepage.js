import { useEffect, useState } from 'react';
import { Ships } from '../components/Ships';
import '../css/Gamepage.css';
import { CONSTANTS } from '../helpers/Constants';
import { getMission, setupMap, getCell, placeBoat } from '../helpers/gameplayHelpers/gameplayHelper';

function Gamepage() {

    const [mission, setMission] = useState({});
    const [ships, setShips] = useState({ battleship: 1, aircraftCarrier: 1, ferry: 1, rib: 1, submarine: 1, cargoShip: 1 });

    useEffect(() => {
        setupMap();
        getMission({ setMission });
        placeBoat({ ship: CONSTANTS.battleship, x: "A", y: 6 });
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
                    {mission.targetCell && (<h3 id="missionTargetText">Mission Target: {mission.targetCell}</h3>)}
                    <Ships ships={ships} setShips={setShips} />
                </div>
            </div>
        </div>
    );
}

export default Gamepage;
