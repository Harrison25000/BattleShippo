import { useEffect, useState } from 'react';
import '../css/Gamepage.css';
import $ from 'jquery';
import { getMission, setupMap } from '../helpers/gameplayHelpers/gameplayHelper';

function Gamepage() {

    const [mission, setMission] = useState({})

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
                    {console.log(mission.targetCell)}
                    {mission.targetCell && (<h3 id="missionTargetText">Mission Target: {mission.targetCell}</h3>)}
                </div>
            </div>
        </div>
    );
}

export default Gamepage;
