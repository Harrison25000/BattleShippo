import { useState, useEffect } from 'react';
import { fillXandYSelects, placeShip, removeAllShips } from '../helpers/gameplayHelpers/gameplayHelper';
import { CONSTANTS } from '../helpers/Constants';
import { arrHasDuplicates, randShipId } from '../helpers/generalHelpers/generalHelper';

export const FirstTurnPlaceShips = ({ ships, setFirstTurnShipsPlaced, setCustomShipsWLocation, customShipsWLocation, setConnected, connected, setPlayerCount, playerCount }) => {
    const [inputRows, setInputRows] = useState([]);
    const [alert, setAlert] = useState({ error: false, message: '' });
    const [placedShips, setPlacedShips] = useState(0)

    const totalShips = Object.values(ships).reduce((acc, current) => acc + current, 0);

    useEffect(() => {
        firstTurnSelectInputs().then(fillXandYSelects())
    }, []);

    const firstTurnSelectInputs = async () => {
        const boatArr = [];
        for (let i = ships.battleship; i > 0; i--) {
            boatArr.push(
                <div className='SidelineShipInfo'>
                    <label id="sidelineShipInfo">Battleship</label>

                    <select className="xAxisSelect" id="battleshipX">
                    </select>
                    <select className="yAxisSelect" id="battleshipY">
                    </select>
                </div>
            )
        }
        for (let i = ships.submarine; i > 0; i--) {
            boatArr.push(
                <div className='SidelineShipInfo'>
                    <label id="sidelineShipInfo">Submarine</label>

                    <select className="xAxisSelect" id="submarineX">
                    </select>
                    <select className="yAxisSelect" id="submarineY">
                    </select>

                </div>
            )
        }
        for (let i = ships.aircraftCarrier; i > 0; i--) {
            boatArr.push(
                <div className='SidelineShipInfo'>
                    <label id="sidelineShipInfo">Aircraft Carrier</label>

                    <select className="xAxisSelect" id="aircraftCarrierX">
                    </select>
                    <select className="yAxisSelect" id="aircraftCarrierY">
                    </select>

                </div>
            )
        }
        for (let i = ships.cargoShip; i > 0; i--) {
            boatArr.push(
                <div className='SidelineShipInfo'>
                    <label id="sidelineShipInfo">Cargo Ship</label>
                    <select className="xAxisSelect" id="cargoX">
                    </select>
                    <select className="yAxisSelect" id="cargoY">
                    </select>

                </div>
            )
        }
        for (let i = ships.rib; i > 0; i--) {
            boatArr.push(
                <div className='SidelineShipInfo'>
                    <label id="sidelineShipInfo">Assault RIB</label>

                    <select className="xAxisSelect" id="ribX">
                    </select>
                    <select className="yAxisSelect" id="ribY">
                    </select>

                </div>
            )
        }
        for (let i = ships.ferry; i > 0; i--) {
            boatArr.push(
                <div className='SidelineShipInfo'>
                    <label id="sidelineShipInfo">Ferry</label>
                    <select className="xAxisSelect" id="ferryX">
                    </select>
                    <select className="yAxisSelect" id="ferryY">
                    </select>
                </div>
            )
        }

        setInputRows(boatArr);
    }

    const placeShipsOnBoard = (e) => {
        e.preventDefault();
        const alertArray = [];
        const customShipsArray = [];
        removeAllShips();
        var placedShipsLocal = 0;
        const coordinateStringsArr = [];
        const elementArray = [...e.target];
        const coordinatesObj = { battleship: [], submarine: [], aircraftCarrier: [], cargoShip: [], rib: [], ferry: [] };
        elementArray.slice(0, elementArray.length - 1).forEach(element => {
            if (element.id.includes("battleship")) coordinatesObj.battleship.push(element.value)
            if (element.id.includes("submarine")) coordinatesObj.submarine.push(element.value)
            if (element.id.includes("aircraftCarrier")) coordinatesObj.aircraftCarrier.push(element.value)
            if (element.id.includes("cargo")) coordinatesObj.cargoShip.push(element.value)
            if (element.id.includes("rib")) coordinatesObj.rib.push(element.value)
            if (element.id.includes("ferry")) coordinatesObj.ferry.push(element.value)
        });

        for (const [key, value] of Object.entries(coordinatesObj)) {
            coordinateStringsArr.push(Array.from({ length: value.length / 2 }, (_, i) => value[2 * i] + value[2 * i + 1]).join(""));
        }

        if (arrHasDuplicates(coordinateStringsArr)) {
            setAlert({ error: true, message: "Cannot place ships on the same coordinates" });
            return;
        } else {
            setAlert({ error: false, message: "" });
        }

        for (const [key, value] of Object.entries(coordinatesObj)) {
            const placeShipCount = value.length / 2;
            for (let index = 0; index < placeShipCount; index++) {
                const randId = randShipId();
                const placeResponse = placeShip({ turn: 0, ship: CONSTANTS[key].name, x: value[0], y: value[1], id: randId })
                customShipsArray.push({ ship: `${CONSTANTS[key].name}-${randId}`, location: `${value[0]}, ${value[1]}`, moveCount: CONSTANTS[`${key}`].moves })
                if (placeResponse.status === CONSTANTS.error) {
                    alertArray.push([placeResponse.message, CONSTANTS[key].name, value[0], value[1]]);
                } else {
                    placedShipsLocal++;
                }
                value.splice(0, 2);
            }
            if (alertArray.length > 0) {
                const alertMessage = alertArray.map(item => <p>{item[0]} - {item[1]}:{item[2]}{item[3]}</p>)
                setAlert({
                    error: true, message: alertMessage
                });
            }
        }

        setCustomShipsWLocation(customShipsArray);

        setPlacedShips(placedShipsLocal);
        if (placedShipsLocal === 6) {
            setFirstTurnShipsPlaced(true);
        }
    }

    return (
        <div>
            {alert.error && (
                <div id="alertMessage">{alert.message}</div>
            )}
            <form id="inputRows" onSubmit={(e) => placeShipsOnBoard(e)}>
                {inputRows}
                {inputRows.length > 0 && (<input type="submit" value="Place Ships"></input>)}
            </form>
            {connected && <p>Placed Ships: {placedShips} / {totalShips}</p>}
        </div >
    )
}