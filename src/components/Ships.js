import battleShip from '../media/ships/battleship.png';
import aircraftCarrier from '../media/ships/aircraftCarrier.png';
import rib from '../media/ships/rib.png';
import submarine from '../media/ships/submarine.png';
import ferry from '../media/ships/ferry.png';
import cargoShip from '../media/ships/cargoShip.png';
import '../css/ships.css';

export const Ships = ({ ships, setShips }) => {

    const renderBoatsOnSide = () => {
        const boatArr = []
        for (let i = ships.battleship; i > 0; i--) {
            boatArr.push(<img className="SideShip" src={battleShip} alt="battleship" />)
        }
        for (let i = ships.submarine; i > 0; i--) {
            boatArr.push(<img className="SideShip" src={submarine} alt="submarine" />)
        }
        for (let i = ships.aircraftCarrier; i > 0; i--) {
            boatArr.push(<img className="SideShip" src={aircraftCarrier} alt="aircraft carrier" />)
        }
        for (let i = ships.cargoShip; i > 0; i--) {
            boatArr.push(<img className="SideShip" src={cargoShip} alt="cargo ship" />)
        }
        for (let i = ships.rib; i > 0; i--) {
            boatArr.push(<img className="SideShip" src={rib} alt="assault rib" />)
        }
        for (let i = ships.ferry; i > 0; i--) {
            boatArr.push(<img className="SideShip" src={ferry} alt="ferry" />)
        }
        return boatArr;
    }

    return (
        <div>
            {renderBoatsOnSide()}
        </div>
    )
}