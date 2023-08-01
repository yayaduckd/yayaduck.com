import { entities, mapData, drawMap } from './map.js';

// Constants
const MOVE_UP = ['ARROWUP', 'W'];
const MOVE_DOWN = ['ARROWDOWN', 'S'];
const MOVE_LEFT = ['ARROWLEFT', 'A'];
const MOVE_RIGHT = ['ARROWRIGHT', 'D'];

// Event listener for keydown events
document.addEventListener('keydown', function (event) {
    event.preventDefault();
    const key = event.key.toUpperCase();
    console.log(key);
    const { width, height } = mapData;


    // Check which movement key was pressed
    if (MOVE_UP.includes(key)) {
        moveEntity(entities.duck, 0, -1, width, height);
    } else if (MOVE_DOWN.includes(key)) {
        moveEntity(entities.duck, 0, 1, width, height);
    } else if (MOVE_LEFT.includes(key)) {
        moveEntity(entities.duck, -1, 0, width, height);
    } else if (MOVE_RIGHT.includes(key)) {
        moveEntity(entities.duck, 1, 0, width, height);
    }

    // Redraw the map with the updated entity position
    drawMap(mapData);
});



/**
 * Move an entity by the given deltas, while respecting map boundaries
 */
function moveEntity(entity, deltaX, deltaY, width, height) {
    const newX = entity.x + deltaX;
    const newY = entity.y + deltaY;

    const newTile = mapData.map[newY][newX];

    if (newTile === ' ' || newTile === undefined) {
        return;
    }

    entity.x = newX;
    entity.y = newY;
}