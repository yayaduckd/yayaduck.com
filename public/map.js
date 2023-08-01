// Constants
const MAP_VISUAL_FILE_DEFAULT = "./map/visual.txt";

var duck = {
    "x": undefined,
    "y": undefined,
    "present": false,
}

function createMapObject(mapString) {
    let rows = mapString.split("\n");
    let mapObj = {
        "width": rows[0].length,
        "height": rows.length,
        "map": rows,
    }
    return mapObj;
}

function drawMap(mapObj) { 
    let map = document.getElementById("map");
    map.innerHTML = "";
    for (let row = 0; row < mapObj.height; row++) {
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        for (let col = 0; col < mapObj.width; col++) {
            let colSpan = document.createElement("span");
            colSpan.classList.add("col");
            colSpan.classList.add("col-" + col);
            colSpan.classList.add("row-" + row);
            let nextChar = mapObj.map[row][col];
            switch (nextChar) {
                case " ":
                    colSpan.classList.add("empty");
                    nextChar = "&nbsp;";
                    break;
                case undefined:
                    colSpan.classList.add("empty");
                    nextChar = "&nbsp;";
                    break;
                case "🦆":
                    if (duck.present) {
                        throw new Error("There are multiple ducks on the map!");
                    }
                    colSpan.classList.add("duck");
                    duck.x = col;
                    duck.y = row;
                    duck.present = true;
                    break;
            }
            colSpan.innerHTML = nextChar;
            rowDiv.appendChild(colSpan);
        }
        map.appendChild(rowDiv);
    }
}

async function fetchFileContent(filename) {
    try {
        const response = await fetch(filename);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.text();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

async function initMap() {
    try {
      let mapString = await fetchFileContent(MAP_VISUAL_FILE_DEFAULT);
      var mapObj = createMapObject(mapString);
      drawMap(mapObj);
    } catch (error) {
      console.error('There was a problem initializing the map:', error);
    }
  }

// Run
initMap();