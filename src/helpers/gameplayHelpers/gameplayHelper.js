import $ from 'jquery';

const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

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