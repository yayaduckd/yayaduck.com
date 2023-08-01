// Constants
const MAP_VISUAL_FILE_DEFAULT = "./map/visual.txt";

// Exporting the map data object
// export const mapData = initMapData();
let mapData;

export var entities = {
    duck: {
        x: 26,
        y: 4,
        icon: " ",
        class: "duck"
    },
    // Add more entities if needed
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

export function drawMap(mapData) {
    const { width, height, map } = mapData;
    const mapElement = document.getElementById("map");
    mapElement.innerHTML = "";

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

function drawCell(row, col, map, rowDiv) {
    const colSpan = document.createElement("span");
    colSpan.classList.add("col");
    colSpan.classList.add("col-" + col);
    colSpan.classList.add("row-" + row);

    let nextChar = map[row][col];
    nextChar = handleEntities(col, row, nextChar, colSpan);

    if (nextChar === " " || nextChar === undefined) {
        colSpan.classList.add("empty");
        nextChar = "&nbsp;";
    }

    colSpan.innerHTML = nextChar;
    rowDiv.appendChild(colSpan);
}

function handleEntities(col, row, char, element) {
    for (const key in entities) {
        const entity = entities[key];
        if (entity.x === col && entity.y === row) {
            element.classList.add(entity.class);
            return entity.icon;
        }
    }
    return char;
}

initMapData()
  .then((data) => {
    mapData = data;
    drawMap(data);
  })
  .catch(console.error);

export { mapData };