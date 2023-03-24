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

export const placeShip = ({ turn, ship, x, y }) => {
    if (turn === 0) {
        console.log(x, y)
        if ((x === "A" || x === "Z" || y === 1 || y === 26)) {
        } else {
            return { status: CONSTANTS.error, message: 'Not placed on edge' }
        }
    }
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
        chosenCell.chosenCell.append(`<img class="ShipInCellClass" id="shipInCell" value="${ship}" src=${shipImage} />`)
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
    document.querySelectorAll('.ShipInCellClass').forEach(e => e.remove());
}

export const removeAllMoveDots = () => {
    document.querySelectorAll('.MoveDot').forEach(e => e.remove());
}

export const showMoveOptions = ({ ship, x, y }) => {
    console.log({ ship, x, y })
    y = parseInt(y);
    x = alphabet.indexOf(x); // A B C D etc...
    switch (ship) {
        case CONSTANTS.battleship:
            showAdjacentMovableLocations({ x, y });
            break;
        case CONSTANTS.submarine:
            showAdjacentMovableLocations({ x, y });
            break;
        case CONSTANTS.aircraftCarrier:
            showAdjacentMovableLocations({ x, y });
            break;
        case CONSTANTS.ferry:
            showAdjacentMovableLocations({ x, y });
            break;
        case CONSTANTS.cargoShip:
            showAdjacentMovableLocations({ x, y });
            break;
        case CONSTANTS.rib:
            showAdjacentMovableLocations({ x, y });
            break;
        default:
            break;
    }
}

const showAdjacentMovableLocations = ({ x, y }) => {
    const waterCells = [];
    const rightCell = $(`#row${y}`).find(`#mapCell${x + 1}`).first();
    if (rightCell.attr('value') !== "green" && rightCell.find('img').length === 0) {
        rightCell.append(`<p class='MoveDot'>${CONSTANTS.dotHtml}</p>`);
        waterCells.push(rightCell);
    }
    const leftCell = $(`#row${y}`).find(`#mapCell${x - 1}`).first();
    if (leftCell.attr('value') !== "green" && leftCell.find('img').length === 0) {
        leftCell.append(`<p class='MoveDot'>${CONSTANTS.dotHtml}</p>`);
        waterCells.push(leftCell);
    }
    const aboveCell = $(`#row${y - 1}`).find(`#mapCell${x} `).first();
    if (aboveCell.attr('value') !== "green" && !aboveCell.find('img').length === 0) {
        aboveCell.append(`<p class='MoveDot'>${CONSTANTS.dotHtml}</p>`);
        waterCells.push(aboveCell);
    }
    const aboveRightCell = $(`#row${y - 1} `).find(`#mapCell${x + 1} `).first()
    if (aboveRightCell.attr('value') !== "green" && aboveRightCell.find('img').length === 0) {
        aboveRightCell.append(`<p class='MoveDot'>${CONSTANTS.dotHtml}</p>`);
        waterCells.push(aboveRightCell);
    }
    const aboveLeftCell = $(`#row${y - 1} `).find(`#mapCell${x - 1} `).first();
    if (aboveLeftCell.attr('value') !== "green" && aboveLeftCell.find('img').length === 0) {
        aboveLeftCell.append(`<p class='MoveDot'>${CONSTANTS.dotHtml}</p>`);
        waterCells.push(aboveLeftCell);
    }
    const belowCell = $(`#row${y + 1} `).find(`#mapCell${x} `).first();
    if (belowCell.attr('value') !== "green" && belowCell.find('img').length === 0) {
        belowCell.append(`<p class='MoveDot'>${CONSTANTS.dotHtml}</p>`);
        waterCells.push(belowCell);
    }
    const belowRightCell = $(`#row${y + 1} `).find(`#mapCell${x + 1} `).first();
    if (belowRightCell.attr('value') !== "green" && belowRightCell.find('img').length === 0) {
        belowRightCell.append(`<p class='MoveDot'>${CONSTANTS.dotHtml}</p>`);
        waterCells.push(belowRightCell);
    }
    const belowLeftCell = $(`#row${y + 1} `).find(`#mapCell${x - 1} `).first();
    if (belowLeftCell.attr('value') !== "green" && belowLeftCell.find('img').length === 0) {
        belowLeftCell.append(`<p class='MoveDot'>${CONSTANTS.dotHtml}</p>`);
        waterCells.push(belowLeftCell);
    }
    return waterCells;
}