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

export const placeShip = ({ turn, ship, x, y, id }) => {
    y = parseInt(y);
    if (turn === 0) {
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
        chosenCell.chosenCell.append(`<img class="ShipInCellClass" id="shipInCell" value="${ship}-${id}" src=${shipImage} />`)
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

export const removeShip = ({ x, y }) => {
    const cellToRemoveShip = getCell(x, y).chosenCell;
    cellToRemoveShip.find(`#shipInCell`).first().remove();
}

export const removeAllShips = () => {
    document.querySelectorAll('.ShipInCellClass').forEach(e => e.remove());
}

export const removeAllMoveDots = () => {
    document.querySelectorAll('.MoveDot').forEach(e => e.remove());
}

const repeatShowAdjacentMovableLocationsFunc = ({ moveCount, ship, shipId, countToDeduct, x, y, origin }) => {
    var n = 1;
    var returnedWaterCells = [];
    if (n <= countToDeduct) {
        returnedWaterCells = showAdjacentMovableLocations({ x, y, ship: `${ship}-${shipId}`, moveCount: n, origin }).filter(item => item.cell.length > 0);
    }
    while (moveCount > 1 && n < countToDeduct) {
        console.log({ moveCount, countToDeduct, n })
        n++;
        returnedWaterCells.forEach(item => {
            if (item.cell.length > 0) {
                showAdjacentMovableLocations({ x: item.column, y: item.row, ship: `${ship}-${shipId}`, moveCount: n, origin }).filter(item => item.cell.length > 0).forEach(item => returnedWaterCells.push(item));
            }
        });
        moveCount--;
    }
}

export const showMoveOptions = ({ ship, x, y, countToDeduct }) => {
    if (countToDeduct <= 0) return;
    const customShip = ship.split("-");
    ship = customShip[0];
    const shipId = customShip[1];
    const origin = `${x}, ${y}`;
    y = parseInt(y);
    x = alphabet.indexOf(x); // A B C D etc...
    var moveCount = 0;
    switch (ship) {
        case CONSTANTS.battleship:
            moveCount = CONSTANTS.battleshipMoves
            countToDeduct = countToDeduct || moveCount;
            repeatShowAdjacentMovableLocationsFunc({ moveCount, ship, shipId, countToDeduct, x, y, origin });
            break;
        case CONSTANTS.submarine:
            moveCount = CONSTANTS.submarineMoves
            countToDeduct = countToDeduct || moveCount;
            repeatShowAdjacentMovableLocationsFunc({ moveCount, ship, shipId, countToDeduct, x, y, origin });
            break;
        case CONSTANTS.aircraftCarrier:
            moveCount = CONSTANTS.aircraftCarrierMoves;
            countToDeduct = countToDeduct || moveCount;
            repeatShowAdjacentMovableLocationsFunc({ moveCount, ship, shipId, countToDeduct, x, y, origin });
            break;
        case CONSTANTS.ferry:
            moveCount = CONSTANTS.ferryMoves;
            countToDeduct = countToDeduct || moveCount;
            repeatShowAdjacentMovableLocationsFunc({ moveCount, ship, shipId, countToDeduct, x, y, origin });
            break;
        case CONSTANTS.cargoShip:
            moveCount = CONSTANTS.cargoShipMoves;
            countToDeduct = countToDeduct || moveCount;
            repeatShowAdjacentMovableLocationsFunc({ moveCount, ship, shipId, countToDeduct, x, y, origin });
            break;
        case CONSTANTS.rib:
            moveCount = CONSTANTS.ribMoves;
            countToDeduct = countToDeduct || moveCount;
            repeatShowAdjacentMovableLocationsFunc({ moveCount, ship, shipId, countToDeduct, x, y, origin });
            break;
        default:
            break;
    }
}

const hasAvailableWaterAroundCell = ({ x, y }) => {
    const chosenCell = $(`#row${y} `).find(`#mapCell${x} `).first();
    const chosenCellCoordinates = `${alphabet[x]},${y}`;
    const chosenCellColour = $(`#row${y} `).find(`#mapCell${x} `).first().attr('value');
    const rightCell = $(`#row${y} `).find(`#mapCell${x + 1} `).first()
    const rightCellValue = rightCell.attr('value');
    const rightCellFree = rightCell.find('img').length === 0
    const leftCell = $(`#row${y} `).find(`#mapCell${x - 1} `).first();
    const leftCellValue = leftCell.attr('value');
    const leftCellFree = leftCell.find('img').length === 0
    const aboveCell = $(`#row${y - 1} `).find(`#mapCell${x} `).first();
    const aboveCellValue = aboveCell.attr('value');
    const aboveCellFree = aboveCell.find('img').length === 0
    const aboveRightCell = $(`#row${y - 1} `).find(`#mapCell${x + 1} `).first();
    const aboveRightCellValue = aboveRightCell.attr('value');
    const aboveRightCellFree = aboveRightCell.find('img').length === 0
    const aboveLeftCell = $(`#row${y - 1} `).find(`#mapCell${x - 1} `).first();
    const aboveLeftCellValue = aboveLeftCell.attr('value');
    const aboveLeftCellFree = aboveLeftCell.find('img').length === 0
    const belowCell = $(`#row${y + 1} `).find(`#mapCell${x} `).first();
    const belowCellValue = belowCell.attr('value');
    const belowCellFree = belowCell.find('img').length === 0
    const belowRightCell = $(`#row${y + 1} `).find(`#mapCell${x + 1} `).first();
    const belowRightCellValue = belowRightCell.attr('value');
    const belowRightCellFree = belowRightCell.find('img').length === 0
    const belowLeftCell = $(`#row${y + 1} `).find(`#mapCell${x - 1} `).first();
    const belowLeftCellValue = belowLeftCell.attr('value');
    const belowLeftCellFree = belowLeftCell.find('img').length === 0
    const hasSeaAdjacentCells = [
        [rightCellValue, rightCellFree], [leftCellValue, leftCellFree], [aboveCellValue, aboveCellFree], [aboveRightCellValue, aboveRightCellFree], [aboveLeftCellValue, aboveLeftCellFree], [belowCellValue, belowCellFree], [belowRightCellValue, belowRightCellFree], [belowLeftCellValue, belowLeftCellFree]
    ].filter(item => ((item[0] === "lightblue") && (item[1]))).length >= 1
    return hasSeaAdjacentCells;
}

const showAdjacentMovableLocations = ({ x, y, ship, moveCount, origin }) => {
    const waterCells = [];
    const rightCell = $(`#row${y}`).find(`#mapCell${x + 1}`).first();
    const htmlToAppend = `<p class='MoveDot' origin="${origin}" moveCount="${moveCount}" value="${ship}">${CONSTANTS.dotHtml}</p>`

    if (rightCell.attr('value') !== "green" && rightCell.find('img').length === 0 && rightCell.find('p').length === 0) {
        rightCell.append(htmlToAppend);
        waterCells.push({ cell: rightCell, row: y, column: x + 1 });
    }
    const leftCell = $(`#row${y}`).find(`#mapCell${x - 1}`).first();
    if (leftCell.attr('value') !== "green" && leftCell.find('img').length === 0 && leftCell.find('p').length === 0) {
        leftCell.append(htmlToAppend);
        waterCells.push({ cell: leftCell, row: y, column: x - 1 });
    }
    const aboveCell = $(`#row${y - 1}`).find(`#mapCell${x} `).first();
    if (aboveCell.attr('value') !== "green" && aboveCell.find('img').length === 0 && aboveCell.find('p').length === 0) {
        aboveCell.append(htmlToAppend);
        waterCells.push({ cell: aboveCell, row: y - 1, column: x });
    }
    const aboveRightCell = $(`#row${y - 1} `).find(`#mapCell${x + 1} `).first()
    if (aboveRightCell.attr('value') !== "green" && aboveRightCell.find('img').length === 0 && aboveRightCell.find('p').length === 0) {
        aboveRightCell.append(htmlToAppend);
        waterCells.push({ cell: aboveRightCell, row: y - 1, column: x + 1 });
    }
    const aboveLeftCell = $(`#row${y - 1} `).find(`#mapCell${x - 1} `).first();
    if (aboveLeftCell.attr('value') !== "green" && aboveLeftCell.find('img').length === 0 && aboveLeftCell.find('p').length === 0) {
        aboveLeftCell.append(htmlToAppend);
        waterCells.push({ cell: aboveLeftCell, row: y - 1, column: x - 1 });
    }
    const belowCell = $(`#row${y + 1} `).find(`#mapCell${x} `).first();
    if (belowCell.attr('value') !== "green" && belowCell.find('img').length === 0 && belowCell.find('p').length === 0) {
        belowCell.append(htmlToAppend);
        waterCells.push({ cell: belowCell, row: y + 1, column: x });
    }
    const belowRightCell = $(`#row${y + 1} `).find(`#mapCell${x + 1} `).first();
    if (belowRightCell.attr('value') !== "green" && belowRightCell.find('img').length === 0 && belowRightCell.find('p').length === 0) {
        belowRightCell.append(htmlToAppend);
        waterCells.push({ cell: belowRightCell, row: y + 1, column: x + 1 });
    }
    const belowLeftCell = $(`#row${y + 1} `).find(`#mapCell${x - 1} `).first();
    if (belowLeftCell.attr('value') !== "green" && belowLeftCell.find('img').length === 0 && belowLeftCell.find('p').length === 0) {
        belowLeftCell.append(htmlToAppend);
        waterCells.push({ cell: belowLeftCell, row: y + 1, column: x - 1 });
    }
    return waterCells;
}