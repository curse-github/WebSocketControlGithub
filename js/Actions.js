function forward() {
    if (turtles[curid].canAct) {
        turtles[curid].canAct = false;
        turtles[curid].queue.push(function () {
            luaCmdReturn("turtle.forward()", "Move forward", "return", function (returnVal, id) {
                if (returnVal != null && returnVal[0] == "true") {
                    x = turtles[id].x;
                    y = turtles[id].y;
                    z = turtles[id].z;
                    switch (turtles[id].d) {
                        case 0: turtles[id].z--; break;
                        case 1: turtles[id].x--; break;
                        case 2: turtles[id].z++; break;
                        case 3: turtles[id].x++; break;
                    }
                    updateCameraPos(x, y, z, turtles[id].x, turtles[id].y, turtles[id].z);
                    if (curid == id) { updateTurtlePos(id); }
                    UpdateBlcks(false);
                    if (turtles[id].queue.length != 0) { turtles[id].callingqueue = false; turtles[id].callQueue(); } else { turtles[id].callingqueue = false; }
                }
                turtles[id].canAct = true;
            });
        });
        turtles[curid].callQueue();
    } else { console.log("You can't act right now."); }
}
function back() {
    if (turtles[curid].canAct) {
        turtles[curid].canAct = false;
        turtles[curid].queue.push(function () {
            luaCmdReturn("turtle.back()", "Move backward", "return", function (returnVal, id) {
                if (returnVal != null && returnVal[0] == "true") {
                    x = turtles[id].x;
                    y = turtles[id].y;
                    z = turtles[id].z;
                    switch (turtles[id].d) {
                        case 0: turtles[id].z++; break;
                        case 1: turtles[id].x++; break;
                        case 2: turtles[id].z--; break;
                        case 3: turtles[id].x--; break;
                    }
                    updateCameraPos(x, y, z, turtles[id].x, turtles[id].y, turtles[id].z);
                    if (curid == id) { updateTurtlePos(id); }
                    UpdateBlcks(false);
                    if (turtles[id].queue.length != 0) { turtles[id].callingqueue = false; turtles[id].callQueue(); } else { turtles[id].callingqueue = false; }
                }
                turtles[id].canAct = true;
            });
        });
        turtles[curid].callQueue();
    } else { console.log("You can't act right now."); }
}
function up() {
    if (turtles[curid].canAct) {
        turtles[curid].canAct = false;
        turtles[curid].queue.push(function () {
            luaCmdReturn("turtle.up()", "Move up", "return", function (returnVal, id) {
                if (returnVal != null && returnVal[0] == "true") {
                    turtles[id].y++;
                    updateCameraPos(turtles[id].x, turtles[id].y - 1, turtles[id].z, turtles[id].x, turtles[id].y, turtles[id].z);
                    if (curid == id) { updateTurtlePos(id); }
                    UpdateBlcks(false);
                    if (turtles[id].queue.length != 0) { turtles[id].callingqueue = false; turtles[id].callQueue(); } else { turtles[id].callingqueue = false; }
                }
                turtles[id].canAct = true;
            });
        });
        turtles[curid].callQueue();
    } else { console.log("You can't act right now."); }
}
function down() {
    if (turtles[curid].canAct) {
        turtles[curid].canAct = false;
        turtles[curid].queue.push(function () {
            luaCmdReturn("turtle.down()", "Move down", "return", function (returnVal, id) {
                if (returnVal != null && returnVal[0] == "true") {
                    turtles[id].y--;
                    updateCameraPos(turtles[id].x, turtles[id].y + 1, turtles[id].z, turtles[id].x, turtles[id].y, turtles[id].z);
                    if (curid == id) { updateTurtlePos(id); }
                    UpdateBlcks(false);
                    if (turtles[id].queue.length != 0) { turtles[id].callingqueue = false; turtles[id].callQueue(); } else { turtles[id].callingqueue = false; }
                }
                turtles[id].canAct = true;
            });
        });
        turtles[curid].callQueue();
    } else { console.log("You can't act right now."); }
}
function turnLeft() {
    if (turtles[curid].canAct) {
        turtles[curid].canAct = false;
        turtles[curid].queue.push(function () {
            luaCmdReturn("turtle.turnLeft()", "Turn left", "return", function (returnVal, id) {
                if (returnVal != null && returnVal[0] == "true") {
                    turtles[id].d = (turtles[id].d + 3) % 4;
                    if (curid == id) { updateTurtlePos(id); }
                    if (turtles[id].queue.length != 0) { turtles[id].callingqueue = false; turtles[id].callQueue(); } else { turtles[id].callingqueue = false; }
                }
                turtles[id].canAct = true;
            });
        });
        turtles[curid].callQueue();
    } else { console.log("You can't act right now."); }
}
function turnRight() {
    if (turtles[curid].canAct) {
        turtles[curid].canAct = false;
        turtles[curid].queue.push(function () {
            luaCmdReturn("turtle.turnRight()", "Turn right", "return", function (returnVal, id) {
                if (returnVal != null && returnVal[0] == "true") {
                    turtles[id].d = (turtles[id].d + 5) % 4;
                    if (curid == id) { updateTurtlePos(id); }
                    if (turtles[id].queue.length != 0) { turtles[id].callingqueue = false; turtles[id].callQueue(); } else { turtles[id].callingqueue = false; }
                }
                turtles[id].canAct = true;
            });
        });
        turtles[curid].callQueue();
    } else { console.log("You can't act right now."); }
}

function placeUp() {
    if (turtles[curid].canAct) {
        turtles[curid].canAct = false;
        turtles[curid].queue.push(function () {
            luaCmdReturn("turtle.placeUp()", "Place up", "return", function (returnVal, id) {
                if (returnVal != null && returnVal[0] == "true") {
                    luaCmdReturnSpecific(id, "turtle.inspectUp()", "Get block up", "returnSilent", function (returnVal, id) {
                        if (returnVal != null) {
                            if (returnVal[0] != "false" && returnVal[1] != "nil" && returnVal[1] != "No block to inspect") {
                                setBlockDir("up", returnVal[1], id);
                            } else { setBlockDir("up", "minecraft|air", id); }
                            UpdateInv(id, false);
                            if (turtles[id].queue.length != 0) { turtles[id].callingqueue = false; turtles[id].callQueue(); } else { turtles[id].callingqueue = false; }
                        } else { console.log("Turtle took to long to respond."); turtles[id].canAct = true; }
                    });
                }
                turtles[id].canAct = true;
            });
        });
        turtles[curid].callQueue();
    } else { console.log("You can't act right now."); }
}
function place() {
    if (turtles[curid].canAct) {
        turtles[curid].canAct = false;
        turtles[curid].queue.push(function () {
            luaCmdReturn("turtle.place()", "Place forward", "return", function (returnVal, id) {
                if (returnVal != null && returnVal[0] == "true") {
                    luaCmdReturnSpecific(id, "turtle.inspect()", "Get block", "returnSilent", function (returnVal, id) {
                        if (returnVal != null) {
                            if (returnVal[0] != "false" && returnVal[1] != "nil" && returnVal[1] != "No block to inspect") {
                                setBlockDir("forward", returnVal[1], id);
                            } else { setBlockDir("forward", "minecraft|air", id); }
                            UpdateInv(id, false);
                            if (turtles[id].queue.length != 0) { turtles[id].callingqueue = false; turtles[id].callQueue(); } else { turtles[id].callingqueue = false; }
                        } else { console.log("Turtle took to long to respond."); turtles[id].canAct = true; }
                    });
                }
                turtles[id].canAct = true;
            });
        });
        turtles[curid].callQueue();
    } else { console.log("You can't act right now."); }
}
function placeDown() {
    if (turtles[curid].canAct) {
        turtles[curid].canAct = false;
        turtles[curid].queue.push(function () {
            luaCmdReturn("turtle.placeDown()", "Place down", "return", function (returnVal, id) {
                if (returnVal != null && returnVal[0] == "true") {
                    luaCmdReturnSpecific(id, "turtle.inspectDown()", "Get block down", "returnSilent", function (returnVal, id) {
                        if (returnVal != null) {
                            if (returnVal[0] != "false" && returnVal[1] != "nil" && returnVal[1] != "No block to inspect") {
                                setBlockDir("down", returnVal[1], id);
                            } else { setBlockDir("down", "minecraft|air", id); }
                            UpdateInv(id, false);
                            if (turtles[id].queue.length != 0) { turtles[id].callingqueue = false; turtles[id].callQueue(); } else { turtles[id].callingqueue = false; }
                        } else { console.log("Turtle took to long to respond."); turtles[id].canAct = true; }
                    });
                }
                turtles[id].canAct = true;
            });
        });
        turtles[curid].callQueue();
    } else { console.log("You can't act right now."); }
}

function digUp() {
    if (turtles[curid].canAct) {
        turtles[curid].canAct = false;
        turtles[curid].queue.push(function () {
            luaCmdReturn("turtle.digUp()", "Dig up", "return", function (returnVal, id) {
                if (returnVal != null && returnVal[0] == "true") {
                    luaCmdReturnSpecific(id, "turtle.inspectUp()", "Get block up", "returnSilent", function (returnVal, id) {
                        if (returnVal != null) {
                            if (returnVal[0] != "false" && returnVal[1] != "nil" && returnVal[1] != "No block to inspect") {
                                setBlockDir("up", returnVal[1], id);
                            } else { setBlockDir("up", "minecraft|air", id); }
                            UpdateInv(id, false);
                            if (turtles[id].queue.length != 0) { turtles[id].callingqueue = false; turtles[id].callQueue(); } else { turtles[id].callingqueue = false; }
                        } else { console.log("Turtle took to long to respond."); turtles[id].canAct = true; }
                    });
                }
                turtles[id].canAct = true;
            });
        });
        turtles[curid].callQueue();
    } else { console.log("You can't act right now."); }
}
function dig() {
    if (turtles[curid].canAct) {
        turtles[curid].canAct = false;
        turtles[curid].queue.push(function () {
            luaCmdReturn("turtle.dig()", "Dig forward", "return", function (returnVal, id) {
                if (returnVal != null && returnVal[0] == "true") {
                    luaCmdReturnSpecific(id, "turtle.inspect()", "Get block", "returnSilent", function (returnVal, id) {
                        if (returnVal != null) {
                            if (returnVal[0] != "false" && returnVal[1] != "nil" && returnVal[1] != "No block to inspect") {
                                setBlockDir("forward", returnVal[1], id);
                            } else { setBlockDir("forward", "minecraft|air", id); }
                            UpdateInv(id, false);
                            if (turtles[id].queue.length != 0) { turtles[id].callingqueue = false; turtles[id].callQueue(); } else { turtles[id].callingqueue = false; }
                        } else { console.log("Turtle took to long to respond."); turtles[id].canAct = true; }
                    });
                }
                turtles[id].canAct = true;
            });
        });
        turtles[curid].callQueue();
    } else { console.log("You can't act right now."); }
}
function digDown() {
    if (turtles[curid].canAct) {
        turtles[curid].canAct = false;
        turtles[curid].queue.push(function () {
            luaCmdReturn("turtle.digDown()", "Dig down", "return", function (returnVal, id) {
                if (returnVal != null && returnVal[0] == "true") {
                    luaCmdReturnSpecific(id, "turtle.inspectDown()", "Get block down", "returnSilent", function (returnVal, id) {
                        if (returnVal != null) {
                            if (returnVal[0] != "false" && returnVal[1] != "nil" && returnVal[1] != "No block to inspect") {
                                setBlockDir("down", returnVal[1], id);
                            } else { setBlockDir("down", "minecraft|air", id); }
                            UpdateInv(id, false);
                            if (turtles[id].queue.length != 0) { turtles[id].callingqueue = false; turtles[id].callQueue(); } else { turtles[id].callingqueue = false; }
                        } else { console.log("Turtle took to long to respond."); turtles[id].canAct = true; }
                    });
                }
                turtles[id].canAct = true;
            });
        });
        turtles[curid].callQueue();
    } else { console.log("You can't act right now."); }
}

function dropUp() {
    if (turtles[curid].canAct) {
        turtles[curid].canAct = false;
        turtles[curid].queue.push(function () {
            luaCmdReturn("turtle.dropUp()", "Drop up", "return", function (returnVal, id) {
                turtles[id].canAct = true;
                if (returnVal != null) {
                    if (returnVal[0] = "true") {
                        if (id == curid) {
                            document.getElementById("itemSlot" + turtles[id].selectedSlot).innerHTML = "0";
                        }
                        UpdateInv(id, false);
                    }
                }
                if (turtles[id].queue.length != 0) { turtles[id].callingqueue = false; turtles[id].callQueue(); } else { turtles[id].callingqueue = false; }
            });
        });
        turtles[curid].callQueue();
    } else { console.log("You can't act right now."); }
}
function drop() {
    if (turtles[curid].canAct) {
        turtles[curid].canAct = false;
        turtles[curid].queue.push(function () {
            luaCmdReturn("turtle.drop()", "Drop forward", "return", function (returnVal, id) {
                turtles[id].canAct = true;
                if (returnVal != null) {
                    if (returnVal[0] = "true") {
                        if (id == curid) {
                            document.getElementById("itemSlot" + turtles[id].selectedSlot).innerHTML = "0";
                        }
                        UpdateInv(id, false);
                    }
                }
                if (turtles[id].queue.length != 0) { turtles[id].callingqueue = false; turtles[id].callQueue(); } else { turtles[id].callingqueue = false; }
            });
        });
        turtles[curid].callQueue();
    } else { console.log("You can't act right now."); }
}
function dropDown() {
    if (turtles[curid].canAct) {
        turtles[curid].canAct = false;
        turtles[curid].queue.push(function () {
            luaCmdReturn("turtle.dropDown()", "Drop down", "return", function (returnVal, id) {
                turtles[id].canAct = true;
                if (returnVal != null) {
                    if (returnVal[0] = "true") {
                        if (id == curid) {
                            document.getElementById("itemSlot" + turtles[id].selectedSlot).innerHTML = "0";
                        }
                        UpdateInv(id, false);
                    }
                }
                if (turtles[id].queue.length != 0) { turtles[id].callingqueue = false; turtles[id].callQueue(); } else { turtles[id].callingqueue = false; }
            });
        });
        turtles[curid].callQueue();
    } else { console.log("You can't act right now."); }
}

function suckUp() {
    if (turtles[curid].canAct) {
        turtles[curid].canAct = false;
        turtles[curid].queue.push(function () {
            luaCmdReturn("turtle.suckUp()", "Suck up", "return", function (returnVal, id) {
                turtles[id].canAct = true;
                UpdateInv(id, false);
                if (turtles[id].queue.length != 0) { turtles[id].callingqueue = false; turtles[id].callQueue(); } else { turtles[id].callingqueue = false; }
            });
        });
        turtles[curid].callQueue();
    } else { console.log("You can't act right now."); }
}
function suck() {
    if (turtles[curid].canAct) {
        turtles[curid].canAct = false;
        turtles[curid].queue.push(function () {
            luaCmdReturn("turtle.suck()", "Suck forward", "return", function (returnVal, id) {
                turtles[id].canAct = true;
                UpdateInv(id, false);
                if (turtles[id].queue.length != 0) { turtles[id].callingqueue = false; turtles[id].callQueue(); } else { turtles[id].callingqueue = false; }
            });
        });
        turtles[curid].callQueue();
    } else { console.log("You can't act right now."); }
}
function suckDown() {
    if (turtles[curid].canAct) {
        turtles[curid].canAct = false;
        turtles[curid].queue.push(function () {
            luaCmdReturn("turtle.suckDown()", "Suck down", "return", function (returnVal, id) {
                turtles[id].canAct = true;
                UpdateInv(id, false);
                if (turtles[id].queue.length != 0) { turtles[id].callingqueue = false; turtles[id].callQueue(); } else { turtles[id].callingqueue = false; }
            });
        });
    } else { console.log("You can't act right now."); }
}