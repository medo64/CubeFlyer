// sets internal variables based on level
// levels are 1-3 (easy, medium, hard)
// level 0 is all defaults
function setLevel(level) {
    switch (level) {
        case 1:
            velocityCap = 5;
            gravityY = -2;
            flightForce = 3;
            gapSize = 5;
            obstacleSpeed = 1.5;
            break;

        case 2:
            gravityY = -6;
            flightForce = 4;
            gapSize = 4;
            obstacleSpeed = 3.25;
            velocityCap = 10;
            break;

        default:
            velocityCap = 20;
            gravityY = -9.8;
            flightForce = 5;
            gapSize = 3;
            obstacleSpeed = 1.5;
            maxHeightChangeInPercent = 100;
            break;
    }
}

// returns velocity cap; higher number is more velocity
var velocityCap = 20;
function getVelocityCap() {
    return velocityCap;
}

var gravityY = -9.8;
function getGravityY() {
    return gravityY;
}

var flightForce = 5; // The amount of force applied when the "fly" button is pressed
function getFlightForce() {
    return flightForce;
}

var gapSize = 3;  // This determines the size of the gap to create between the floor and ceiling.
function getGapSize() {
    return gapSize;
}

var obstacleSpeed = 1.5; // Changing this will impact how quickly obstacles in the game move.
function getObstacleSpeed() {
    return obstacleSpeed;
}

var maxHeightChangeInPercent = 100;  // 0-100; 0 is no difference, 100 is max difference
function getMaxHeightChangeInPercent() {
    return maxHeightChangeInPercent;
}