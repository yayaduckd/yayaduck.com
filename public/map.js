// Constants
const MAP_VISUAL_FILE_DEFAULT = "./map/visual.txt";

const CHANGING_TILE_CLASSES = ["duck"];

let mapData;

export var entities = {
    duck: {
        x: 26,
        y: 4,
        icon: " ",
        class: "duck",
        tile: ".",
    },
};

async function fetchFileContent(filename) {
    const response = await fetch(filename);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.text();
}

async function initMapData() {
    try {
        const mapString = await fetchFileContent(MAP_VISUAL_FILE_DEFAULT);
        const rows = mapString.split("\n");
        const width = rows[0].length;
        const height = rows.length;
        return { width, height, map: rows };
    } catch (error) {
        console.error(error);
    }
}

function initEmptyHTMLMap(width, height) {
    const mapElement = document.getElementById("map");
    mapElement.innerHTML = "";

    for (let row = 0; row < height; row++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        rowDiv.classList.add("row-" + row); // Include this line
        for (let col = 0; col < width; col++) {
            const colSpan = document.createElement("span");
            colSpan.classList.add("col");
            colSpan.classList.add("col-" + col);
            colSpan.classList.add("row-" + row);
            colSpan.innerHTML = "&nbsp;";
            rowDiv.appendChild(colSpan);
        }
        mapElement.appendChild(rowDiv);
    }
}

export function drawMap(mapData) {
    const { width, height, map } = mapData;
    const mapElement = document.getElementById("map");

    for (let row = 0; row < height; row++) {
        drawRow(row, map, mapElement, width);
    }
}

function drawRow(row, map, mapElement, width) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    for (let col = 0; col < width; col++) {
        drawCell(row, col, map, rowDiv);
    }
    mapElement.appendChild(rowDiv);
}

export function drawCell(row, col, map) {
    const element = document.querySelector(`.row-${row} .col-${col}`);
    CHANGING_TILE_CLASSES.forEach((className) => {
        element.classList.remove(className);
    });

    let nextChar = map[row][col];
    nextChar = handleEntities(col, row, nextChar, element, map);

    if (nextChar === " " || nextChar === undefined) {
        element.classList.add("empty");
        nextChar = "&nbsp;";
    } else {
        element.classList.remove("empty");
    }

    element.innerHTML = nextChar;
}


function handleEntities(col, row, char, element, map) { 
    for (const key in entities) {
        const entity = entities[key];
        if (entity.x === col && entity.y === row) {
            element.classList.add(entity.class);
            return entity.icon;
        }
        entity.tile = map[entity.y][entity.x];
    }
    return char;
}

initMapData()
  .then((data) => {
    mapData = data;
    initEmptyHTMLMap(data.width, data.height);
    drawMap(data);
  })
  .catch(console.error);

export { mapData };