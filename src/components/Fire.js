import '../css/Fire.css';
import { useState, useEffect } from 'react';
import { fillXandYSelects } from '../helpers/gameplayHelpers/gameplayHelper';

export const Fire = ({ missileCount, setFireLocations, setShowFireOptions }) => {

    const [inputRows, setInputRows] = useState([]);
    useEffect(() => {
        fireSetSelects().then(fillXandYSelects());
    }, [])

    missileCount = missileCount || 3;

    const fireSetSelects = async () => {
        const inputRowsArr = [];
        for (let index = 0; index < missileCount; index++) {
            inputRowsArr.push(
                <div className='FireShipSelect'>
                    <label id="fireShipSelect">Coordinates:</label>
                    <select className="xAxisSelect" id={`fireX${index}`}>
                    </select>
                    <select className="yAxisSelect" id={`fireY${index}`}>
                    </select>
                </div>
            )
        }
        setInputRows(inputRowsArr);
    }

    const fire = (e) => {
        e.preventDefault();
        var elementArray = [...e.target];
        const coordArray = [];
        elementArray = elementArray.slice(0, elementArray.length - 1);
        while (elementArray.length > 0) {
            coordArray.push([elementArray[0].value, elementArray[1].value]);
            elementArray.shift();
            elementArray.shift();
        }
        setFireLocations(coordArray);
        setShowFireOptions(false);
    }

    return (
        <div className="FireContainer">
            <form onSubmit={(e) => fire(e)}>
                {inputRows}
                {inputRows.length > 0 && (<input type="submit" value="Fire!"></input>)}
            </form>
        </div>
    )
}