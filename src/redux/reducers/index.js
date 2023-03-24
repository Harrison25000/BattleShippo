import turnCounter from './turnCounter'; // use name you want as selector
import numberOfPlayers from './numberOfPlayers';
import { combineReducers } from 'redux';

const allReducers = combineReducers({ turnCounter, numberOfPlayers });

export default allReducers;