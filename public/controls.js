import { entities, mapData, drawMap, drawCell } from './map.js';

// Constants
const MOVE_UP = ['ARROWUP', 'W'];
const MOVE_DOWN = ['ARROWDOWN', 'S'];
const MOVE_LEFT = ['ARROWLEFT', 'A'];
const MOVE_RIGHT = ['ARROWRIGHT', 'D'];

// Event listener for keydown events
document.addEventListener('keydown', function (event) {
    const key = event.key.toUpperCase();

    // Check which movement key was pressed
    if (MOVE_UP.includes(key)) {
        up();
        event.preventDefault();
    } else if (MOVE_DOWN.includes(key)) {
        down();
        event.preventDefault();
    } else if (MOVE_LEFT.includes(key)) {
        left();
        event.preventDefault();
    } else if (MOVE_RIGHT.includes(key)) {
        right();
        event.preventDefault();
    }

    // Redraw the map with the updated entity position
    // drawMap(mapData);
});

function up() {
    moveEntity(entities.duck, 0, -1);
}

function down() {
    moveEntity(entities.duck, 0, 1);
}

function left() {
    moveEntity(entities.duck, -1, 0);
}

function right() {
    moveEntity(entities.duck, 1, 0);
}

document.addEventListener('DOMContentLoaded', () => {
    const crossTop = document.querySelector('.crossTop');
    const crossBottom = document.querySelector('.crossBottom');
    const crossLeft = document.querySelector('.crossLeft');
    const crossRight = document.querySelector('.crossRight');

    crossTop.addEventListener('mousedown', up);
    crossBottom.addEventListener('mousedown', down);
    crossLeft.addEventListener('mousedown', left);
    crossRight.addEventListener('mousedown', right);
  });


/**
 * Move an entity by the given deltas, while respecting map boundaries
 */
function moveEntity(entity, deltaX, deltaY) {
    const oldX = entity.x;
    const oldY = entity.y;
    const newX = entity.x + deltaX;
    const newY = entity.y + deltaY;

    if (newX < 0 || newX >= mapData.width || newY < 0 || newY >= mapData.height) {
        return;
    }

    const newTile = mapData.map[newY][newX];

    if (newTile === ' ' || newTile === undefined) {
        return;
    }

    entity.x = newX;
    entity.y = newY;
    drawCell(oldY, oldX, mapData.map);
    drawCell(newY, newX, mapData.map);
}
