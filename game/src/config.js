var velocityCap = 1;

// sets internal variables based on level
// level 0 is all defaults
function setLevel(level) {
    switch (level) {
        default:
            velocityCap = 20;
    }
}

// returns velocity cap; higher number is more velocity
function getVelocityCap() {
    return velocityCap;
}
