import $ from 'jquery';
import { CONSTANTS } from '../Constants';
import battleship from '../../media/ships/battleship.png';
import aircraftCarrier from '../../media/ships/aircraftCarrier.png';
import rib from '../../media/ships/rib.png';
import submarine from '../../media/ships/submarine.png';
import ferry from '../../media/ships/ferry.png';
import cargoShip from '../../media/ships/cargoShip.png';

export const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const landSea = ["lightblue", "green"];

export const setupMap = () => {
    for (var i = 0; i <= 26; i++) {
        if (i > 0) {
            $('#mapTable').append(
                `<tr id="row${i}"><th>${i}</th></tr>`
            )
            for (var x = 0; x <= 25; x++) {
                const squareColour = landSea[Math.floor(Math.random() * landSea.length)]
                $(`#row${i}`).append(`<th id="mapCell${x}" title="${alphabet[x]}, ${i}" style="background-color: ${squareColour}" value="${squareColour}"></th>`);
            }

        }
        $('#firstRow').append(`<th>${(i === 0) ? '-' : alphabet[i - 1]}</th > `);

    }
}

export const getMission = ({ setMission }) => {
    const getRandomCell = async () => {
        const rowI = parseInt(Math.random() * (26 - 1) + 1);
        const cellX = parseInt(Math.random() * (25 - 0) + 0);
        const chosenCell = $(`#row${rowI} `).find(`#mapCell${cellX} `).first();
        const chosenCellCoordinates = `${alphabet[cellX]},${rowI}`;
        const chosenCellColour = $(`#row${rowI} `).find(`#mapCell${cellX} `).first().attr('value');
        const rightCell = $(`#row${rowI} `).find(`#mapCell${cellX + 1} `).first().attr('value');
        const leftCell = $(`#row${rowI} `).find(`#mapCell${cellX - 1} `).first().attr('value');
        const aboveCell = $(`#row${rowI - 1} `).find(`#mapCell${cellX} `).first().attr('value');
        const aboveRightCell = $(`#row${rowI - 1} `).find(`#mapCell${cellX + 1} `).first().attr('value');
        const aboveLeftCell = $(`#row${rowI - 1} `).find(`#mapCell${cellX - 1} `).first().attr('value');
        const belowCell = $(`#row${rowI + 1} `).find(`#mapCell${cellX} `).first().attr('value');
        const belowRightCell = $(`#row${rowI + 1} `).find(`#mapCell${cellX + 1} `).first().attr('value');
        const belowLeftCell = $(`#row${rowI + 1} `).find(`#mapCell${cellX - 1} `).first().attr('value');
        const hasTwoSeaAdjacentCells = [rightCell, leftCell, aboveCell, aboveRightCell, aboveLeftCell, belowCell, belowRightCell, belowLeftCell].filter(item => item === "lightblue").length >= 2

        if (chosenCellColour !== 'green') {
            return getRandomCell()
        } else if (!hasTwoSeaAdjacentCells) {
            return getRandomCell()
        } else {
            chosenCell.html("&#11044;");
            chosenCell.addClass('MissionCell');
            return ({ chosenCell, chosenCellCoordinates, chosenCellColour, hasTwoSeaAdjacentCells })
        }

    }
    getRandomCell()?.then(data => {
        setMission({ targetCell: data.chosenCellCoordinates })
    });
}

export const getCell = (x, y) => {
    const rowI = y; // 1 2 3 4 etc...
    const cellX = alphabet.indexOf(x); // A B C D etc...
    const chosenCell = $(`#row${rowI} `).find(`#mapCell${cellX} `).first();
    const chosenCellColour = $(`#row${rowI} `).find(`#mapCell${cellX} `).first().attr('value');
    return { chosenCell, chosenCellColour };
}

export const placeShip = ({ ship, x, y }) => {
    var shipImage = battleship
    if (ship === CONSTANTS.aircraftCarrier) shipImage = aircraftCarrier
    if (ship === CONSTANTS.submarine) shipImage = submarine
    if (ship === CONSTANTS.rib) shipImage = rib
    if (ship === CONSTANTS.ferry) shipImage = ferry
    if (ship === CONSTANTS.cargoShip) shipImage = cargoShip

    const chosenCell = getCell(x, y);
    if (chosenCell.chosenCellColour === CONSTANTS.green) {
        return { status: CONSTANTS.error, message: 'land tile' }
    } else if (chosenCell.chosenCell[0].childNodes.length === 1) {
        return { status: CONSTANTS.error, message: 'ship here' }
    } else {
        chosenCell.chosenCell.css("border", "solid yellow")
        chosenCell.chosenCell.append(`<img class="ShipInCellClass" id="shipInCell" src=${shipImage} />`)
        return { status: CONSTANTS.success, message: 'placed boat' }
    }
}

export const fillXandYSelects = () => {
    setTimeout(() => {
        const xAxisSelections = [...document.getElementsByClassName("xAxisSelect")];
        const yAxisSelections = [...document.getElementsByClassName("yAxisSelect")];
        xAxisSelections.forEach(item => {
            for (let index = 0; index < alphabet.length; index++) {
                item.innerHTML += (
                    `<option value="${alphabet[index]}">${alphabet[index]}</option>`
                )
            }
        })
        yAxisSelections.forEach(item => {
            for (let index = 1; index < 27; index++) {
                item.innerHTML += (
                    `<option value="${index}">${index}</option>`
                )
            }
        })
    }, 0);
}

export const removeAllShips = () => {
    console.log(document.querySelectorAll('.ShipInCellClass'))
    document.querySelectorAll('.ShipInCellClass').forEach(e => e.remove());
}