import battleShip from '../media/ships/battleship.png';
import aircraftCarrier from '../media/ships/aircraftCarrier.png';
import rib from '../media/ships/rib.png';
import submarine from '../media/ships/submarine.png';
import ferry from '../media/ships/ferry.png';
import cargoShip from '../media/ships/cargoShip.png';
import '../css/Ships.css';
import { useState } from 'react';

export const Ships = ({ ships, setShips }) => {

    const [showShipInfo, setShowShipInfo] = useState(false);

    const renderBoatsOnSide = () => {
        const boatArr = [
            <div className='SidelineShipInfo'>
                <div className="SideShip" alt="empty" />
                <p id="sidelineShipInfo">Ship</p>
                <p id="sidelineShipInfo">Movement</p>
                <p id="sidelineShipInfo">Points</p>
            </div>
            ,]
        for (let i = ships.battleship; i > 0; i--) {
            boatArr.push(
                <div className='SidelineShipInfo'>
                    <img className="SideShip" src={battleShip} alt="battleship" title="battleship" />
                    <p id="sidelineShipInfo">Battleship</p>
                    <p id="sidelineShipInfo">4</p>
                    <p id="sidelineShipInfo">20</p>
                </div>
            )
        }
        for (let i = ships.submarine; i > 0; i--) {
            boatArr.push(
                <div className='SidelineShipInfo'>
                    <img className="SideShip" src={submarine} alt="submarine" title="submarine" />
                    <p id="sidelineShipInfo">Submarine</p>
                    <p id="sidelineShipInfo">3</p>
                    <p id="sidelineShipInfo">30</p>
                </div>
            )
        }
        for (let i = ships.aircraftCarrier; i > 0; i--) {
            boatArr.push(
                <div className='SidelineShipInfo'>
                    <img className="SideShip" src={aircraftCarrier} alt="aircraft carrier" title="aircraft carrier" />
                    <p id="sidelineShipInfo">Aircraft Carrier</p>
                    <p id="sidelineShipInfo">2</p>
                    <p id="sidelineShipInfo">40</p>
                </div>
            )
        }
        for (let i = ships.cargoShip; i > 0; i--) {
            boatArr.push(
                <div className='SidelineShipInfo'>
                    <img className="SideShip" src={cargoShip} alt="cargo ship" title="cargo ship" />
                    <p id="sidelineShipInfo">Cargo Ship</p>
                    <p id="sidelineShipInfo">2</p>
                    <p id="sidelineShipInfo">30</p>
                </div>
            )
        }
        for (let i = ships.rib; i > 0; i--) {
            boatArr.push(
                <div className='SidelineShipInfo'>
                    <img className="SideShip" src={rib} alt="assault rib" title="assault rib" />
                    <p id="sidelineShipInfo">Assault RIB</p>
                    <p id="sidelineShipInfo">5</p>
                    <p id="sidelineShipInfo">10</p>
                </div>
            )
        }
        for (let i = ships.ferry; i > 0; i--) {
            boatArr.push(
                <div className='SidelineShipInfo'>
                    <img className="SideShip" src={ferry} alt="ferry" title="ferry" />
                    <p id="sidelineShipInfo">Ferry</p>
                    <p id="sidelineShipInfo">2</p>
                    <p id="sidelineShipInfo">50</p>
                </div>
            )
        }
        return boatArr;
    }

    return (
        <div className="ShipContainer">
            <button onClick={() => setShowShipInfo(!showShipInfo)}>Ship Information</button>
            {showShipInfo && (
                <div className="ShipInformation">
                    {renderBoatsOnSide()}
                </div>
            )}
        </div>
    )
}