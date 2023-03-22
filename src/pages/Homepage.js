import '../css/Homepage.css';
import HeroVideo from '../media/HeroVideo.mp4';
import CartoonExplosion from '../media/CartoonExplosion.png';
import { Hero } from '../components/Hero';
import { Link } from 'react-router-dom';

function Homepage() {
    return (
        <div className="Homepage">
            <Hero template="Homepage" image={null} video={HeroVideo} altText="Homepage Hero" />
            <div className="PlayNowDiv">
                <h1 id="playNowText"><Link to="/play">PLAY NOW</Link></h1>
            </div>
            <div className="AboutSection">
                <p>BattleShippo is a remake of the popular game BattleShip. We felt that is was such a brilliant design of a game yet there was room for expansion. Introducing...</p>
                <p><b>Battle<i>Shippo</i></b></p>
                <p>Bringing back that 20th century.</p>
                <p> Embark on missions taking you across the world. Take on up to four friends at a time. Build your armada. Buy your upgrades. Win the battle.</p>
            </div>
        </div>
    );
}

export default Homepage;
