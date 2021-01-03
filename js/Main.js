const scene = new THREE.Scene();
const light = new THREE.AmbientLight(0x404040);
scene.add(light);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

var material = new THREE.MeshBasicMaterial({ color: 0xc00030, transparent: true, opacity: 0.5 });
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xa8002a });
const TurtleMat = new THREE.MeshBasicMaterial({ map: new TextureLoader().load("textures/turtle.png") });
TurtleMat.map.magFilter = THREE.NearestFilter;

animate();

var forceNames = false;

var curid = "none";
var turtles = [];
turtles[0] = null;

var worlds = [, , ,]
var blocks = []
var blockDirections = []

var returnNum;
//change {port} to a number but leave {ipAddr} as it is
ws = new WebSocket("ws://{ipAddr}:{port}");
ws.onopen = function () {
    document.getElementById("status").innerHTML = "Connected!!";
    ws.send("{\"type\":\"connection\",\"connection\":\"browser\"}");
    setonmessage();
};
ws.onerror = function (error) { console.log("WebSocket error: " + error); };

function setonmessage() {
    ws.onmessage = function (event) {
        var msg = JSON.parse(event.data);
        if (msg.connection != null) {
            console.log("Adding turtle" + msg.connection + ".");
            document.getElementById("selectTurtle").innerHTML = document.getElementById("selectTurtle").innerHTML + "<option value=\"" + msg.connection + "\">turtle" + msg.connection + "</option>";
            curid = document.getElementById("selectTurtle").value;
            var loader = new OBJLoader2();
            loader.load("model/turtle.obj", function (object) {
                object.scale.set(0.25, 0.25, 0.25);
                object.traverse(function (child) {
                    if (child instanceof THREE.Mesh) { child.material = TurtleMat; }
                });
                turtles[msg.connection].model = object;
                turtles[msg.connection].model.position.set(0, 0, 0);
                turtles[msg.connection].model.name = "turtle" + msg.connection;
                if (curid == msg.connection) { scene.add(turtles[msg.connection].model); }
            });
            turtles[msg.connection] = {
                x: 0,
                y: 0,
                z: 0,
                d: 0,
                name: "turtle" + msg.connection,
                curIntrvlId: null,
                canAct: true,
                _return: {},
                _evntNm: null,
                model: null,
                offset: 0
            };
            if (forceNames) { luaCmd(msg.connection, "os.setComputerLabel('turtle" + msg.connection + "')", "os.setComputerLabel('turtle" + msg.connection + "')", "false"); }
            luaCmd(msg.connection, "os.getComputerLabel()", "os.getComputerLabel()", "name");
            if (curid == msg.connection) { turtles[curid].canAct = false; UpdateBlcks(); }
        } else if (msg.disconnection != null) {
            if (turtles[msg.disconnection] != null) {
                console.log("Turtle" + msg.disconnection + " disconnected.");
                html = document.getElementById("selectTurtle").innerHTML.replace("<option value=\"" + msg.disconnection + "\">" + turtles[msg.disconnection].name + "</option>", "");

                document.getElementById("selectTurtle").innerHTML = html;
                if (blocks[msg.disconnection] != null) {
                    for (let index = 0; index < blocks[msg.disconnection].length; index++) {
                        pos = blocks[msg.disconnection][index].split(", ");
                        worlds[msg.disconnection] = null;
                        blockDirections[msg.disconnection] = null;
                        if (scene.getObjectByName("Cube, " + blocks[msg.disconnection][index]) != null) { scene.remove(scene.getObjectByName("Cube, " + blocks[msg.disconnection][index])); }
                        if (scene.getObjectByName("Line, " + blocks[msg.disconnection][index]) != null) { scene.remove(scene.getObjectByName("Line, " + blocks[msg.disconnection][index])); }
                    }
                    blocks[msg.disconnection] = null;
                }
                scene.remove(turtles[msg.disconnection].model);
                updateCameraPos(turtles[msg.disconnection].x, turtles[msg.disconnection].y, turtles[msg.disconnection].z, 0, 0, 0);
                turtles[msg.disconnection] = null;


                curid = document.getElementById("selectTurtle").value;
                if (blocks[curid] != null) {
                    for (let index = 0; index < blocks[curid].length; index++) {
                        pos = blocks[curid][index].split(", ");
                        if (blockDirections[curid][pos[0]][pos[1]][pos[2]] != null) {
                            var cube = getCube(worlds[curid][pos[0]][pos[1]][pos[2]], blockDirections[curid][pos[0]][pos[1]][pos[2]]);
                        } else { var cube = getCube(worlds[curid][pos[0]][pos[1]][pos[2]], null); }
                        cube[0].position.x = pos[0];
                        cube[0].position.y = pos[1];
                        cube[0].position.z = -parseInt(pos[2]);
                        cube[0].name = "Cube, " + blocks[curid][index];
                        scene.add(cube[0]);
                        if (cube[1] != null) {
                            var edges = new THREE.EdgesGeometry(cube[1]);
                            var line = new THREE.LineSegments(edges, lineMaterial);
                            line.position.x = pos[0];
                            line.position.y = pos[1];
                            line.position.z = -parseInt(pos[2]);
                            line.name = "Line, " + blocks[curid][index];
                            scene.add(line);
                        }
                    }
                } if (turtles[curid] != null) {
                    turtles[curid].model.position.set(turtles[curid].x, turtles[curid].y, turtles[curid].z);
                    scene.add(turtles[curid].model);
                    updateCameraPos(turtles[curid].x, turtles[curid].y, turtles[curid].z, turtles[curid].x, turtles[curid].y, turtles[curid].z)
                    turtles[curid].canAct = false;
                    UpdateBlcks();
                }
            }
        } else if (msg.rtrnTyp != null) {
            var id = msg.id;
            if (msg.rtrnTyp == "name") {
                var name = "turtle" + id;
                if (msg.return.split(", ")[0] != "nil") { name = "\"" + msg.return.split(", ")[0] + "\""; }
                document.getElementById("selectTurtle").innerHTML = document.getElementById("selectTurtle").innerHTML.replace(turtles[id].name, name);
                turtles[id].name = name;
            } else if (msg.rtrnTyp == "return") {
                turtles[id]._evntNm = msg.evntNm;
                turtles[id]._return = msg.return.split(", ");
                if (turtles[id]._return[0] == "true") {
                    console.log(msg.evntNm + " succeded!");
                } else if (turtles[id]._return[0] == "false") {
                    console.log(msg.evntNm + " failed.");
                } else {
                    console.log(msg.evntNm + " returned: " + msg.return + ".");
                }

            } else if (msg.rtrnTyp == "returnSilent") {
                turtles[id]._evntNm = msg.evntNm;
                turtles[id]._return = msg.return.split(", ");
            } else if (msg.rtrnTyp == "customReturn") { console.log(msg.evntNm + " returned: " + msg.return + "."); }
        }
    }
}



function luaCmd(id, cmd, _eventName, returnType) {
    ws.send("{\"type\":\"send\", \"turtle\":\"" + id + "\", \"cmd\":\"{\\\"type\\\":\\\"lua\\\", \\\"cmd\\\":\\\"" + cmd + "\\\",\\\"id\\\":\\\"" + id + "\\\", \\\"evntNm\\\":\\\"" + _eventName + "\\\", \\\"rtrnTyp\\\":\\\"" + returnType + "\\\"}\"}");
}
function luaCmdReturn(cmd, _eventName, returnType, callback) {
    ws.send("{\"type\":\"send\", \"turtle\":\"" + curid + "\", \"cmd\":\"{\\\"type\\\":\\\"lua\\\", \\\"cmd\\\":\\\"" + cmd + "\\\",\\\"id\\\":\\\"" + curid + "\\\", \\\"evntNm\\\":\\\"" + _eventName + "\\\", \\\"rtrnTyp\\\":\\\"" + returnType + "\\\"}\"}");
    if (_eventName != "false" && returnType != "false") {
        obj = { return: null };
        checkreturn(_eventName, 100, curid, true, callback);
    } else { return true; }
}
function luaCmdReturnSpecific(id, cmd, _eventName, returnType, callback) {
    ws.send("{\"type\":\"send\", \"turtle\":\"" + id + "\", \"cmd\":\"{\\\"type\\\":\\\"lua\\\", \\\"cmd\\\":\\\"" + cmd + "\\\",\\\"id\\\":\\\"" + id + "\\\", \\\"evntNm\\\":\\\"" + _eventName + "\\\", \\\"rtrnTyp\\\":\\\"" + returnType + "\\\"}\"}");
    if (_eventName != "false" && returnType != "false") {
        obj = { return: null };
        checkreturn(_eventName, 100, id, true, callback);
    } else { return true; }
}
function checkreturn(_eventName, num, id, variable, callback) {
    if (variable) {
        returnNum = num;
        if (turtles[id].curIntrvlId == null) { turtles[id].curIntrvlId = setInterval(checkreturn, 150, _eventName, null, id, false, callback); }
    } else {
        if ((turtles[id]._return[0] != null && _eventName == turtles[id]._evntNm)) {
            turtles[id]._evntNm = null;
            var returnVal;
            returnVal = turtles[id]._return;
            turtles[id]._return = {};
            clearInterval(turtles[id].curIntrvlId);
            turtles[id].curIntrvlId = null;
            callback(returnVal, id);
        } else if (returnNum == 0) {
            clearInterval(turtles[id].curIntrvlId);
            turtles[id].curIntrvlId = null;
            callback(null, id);
        }
        returnNum--;
    }
}


function getCube(BlkId, dir) {
    var cubeGeometry = new THREE.BoxGeometry();
    cubeGeometry.computeFaceNormals();
    cube = new THREE.Mesh(cubeGeometry, material);
    defaultReturn = [cube, cubeGeometry];

    if (getMatType[BlkId] != null) {
        if (getMatType[BlkId] == "single") {
            //single texture on all sides
            var newMaterial = new THREE.MeshBasicMaterial({ map: new TextureLoader().load(getTexAll[BlkId]), transparent: true });
            newMaterial.map.magFilter = THREE.NearestFilter;
            cube = new THREE.Mesh(cubeGeometry, newMaterial);
            return [cube, null];
        }
        else if (getMatType[BlkId] == "multi") {
            //create textures for each side
            var leftTex = new TextureLoader().load(getTexLeft[BlkId])
            var rightTex = new TextureLoader().load(getTexRight[BlkId])
            if (dir != null && (dir == "x" || dir == "y" || dir == "z")) {
                leftTex.center = new THREE.Vector2(0.5, 0.5); leftTex.rotation = THREE.Math.degToRad(90);
                rightTex.center = new THREE.Vector2(0.5, 0.5); rightTex.rotation = THREE.Math.degToRad(90);
            }
            var leftMaterial = new THREE.MeshBasicMaterial({ map: leftTex, transparent: true }); leftMaterial.map.magFilter = THREE.NearestFilter;
            var rightMaterial = new THREE.MeshBasicMaterial({ map: rightTex, transparent: true }); rightMaterial.map.magFilter = THREE.NearestFilter;
            var topMaterial = new THREE.MeshBasicMaterial({ map: new TextureLoader().load(getTexTop[BlkId]), transparent: true }); topMaterial.map.magFilter = THREE.NearestFilter;
            var bottomMaterial = new THREE.MeshBasicMaterial({ map: new TextureLoader().load(getTexBottom[BlkId]), transparent: true }); bottomMaterial.map.magFilter = THREE.NearestFilter;
            var frontMaterial = new THREE.MeshBasicMaterial({ map: new TextureLoader().load(getTexFront[BlkId]), transparent: true }); frontMaterial.map.magFilter = THREE.NearestFilter;
            var backMaterial = new THREE.MeshBasicMaterial({ map: new TextureLoader().load(getTexBack[BlkId]), transparent: true }); backMaterial.map.magFilter = THREE.NearestFilter;
            materials = [leftMaterial, rightMaterial, topMaterial, bottomMaterial, frontMaterial, backMaterial]
            //create mesh
            block = new THREE.Mesh(cubeGeometry, materials);
            if (dir != null) {
                var x = 0;
                var y = 0;
                var z = 0;
                switch (dir) {
                    case "north": y = turtles[curid].offset; break;
                    case "east": y = 1 + turtles[curid].offset; break;
                    case "south": y = 2 + turtles[curid].offset; break;
                    case "west": y = 3 + turtles[curid].offset; break;
                    case "up": x = 1; break;
                    case "x": y = 1 + turtles[curid].offset; break;
                    case "y": x = 1; break;
                    case "z": y = turtles[curid].offset; break;
                    default: console.log("Direction not supported yet."); break;
                }
                y = (y + 4) % 4;
                block.rotation.x = -THREE.Math.degToRad(x * 90);
                block.rotation.y = -THREE.Math.degToRad(y * 90);
                block.rotation.z = -THREE.Math.degToRad(z * 90);
            }
            return [block, null];
        } else { return defaultReturn; }
    } else { return defaultReturn; }
}
function getBlockDir(trtlId, dir) {
    x = turtles[trtlId].x;
    y = turtles[trtlId].y;
    z = turtles[trtlId].z;
    d = turtles[trtlId].d;
    if (trtlId != null) {
        switch (dir) {
            case "front":
                switch (d) {
                    case 0: z--; break;
                    case 1: x--; break;
                    case 2: z++; break;
                    case 3: x++; break;
                } break;
            case "forward":
                switch (d) {
                    case 0: z--; break;
                    case 1: x--; break;
                    case 2: z++; break;
                    case 3: x++; break;
                } break;
            case "forwards":
                switch (d) {
                    case 0: z--; break;
                    case 1: x--; break;
                    case 2: z++; break;
                    case 3: x++; break;
                } break;
            case "back":
                switch (d) {
                    case 0: z--; break;
                    case 1: x--; break;
                    case 2: z++; break;
                    case 3: x++; break;
                } break;
            case "backward":
                switch (d) {
                    case 0: z--; break;
                    case 1: x--; break;
                    case 2: z++; break;
                    case 3: x++; break;
                } break;
            case "backwards":
                switch (d) {
                    case 0: z--; break;
                    case 1: x--; break;
                    case 2: z++; break;
                    case 3: x++; break;
                } break;
            case "up": y++; break;
            case "down": y--; break;
            case "right":
                switch ((d + 5) % 4) {
                    case 0: z--; break;
                    case 1: x--; break;
                    case 2: z++; break;
                    case 3: x++; break;
                } break;
            case "left":
                switch ((d + 3) % 4) {
                    case 0: z--; break;
                    case 1: x--; break;
                    case 2: z++; break;
                    case 3: x++; break;
                } break;
        }
        if (worlds[trtlId] != null) {
            if (worlds[trtlId][x] != null) {
                if (worlds[trtlId][x][y] != null) {
                    if (worlds[trtlId][x][y][z] != null) {
                        return worlds[trtlId][x][y][z];
                    } else { console.log("No block at " + x + ", " + y + ", " + z + "."); return false; }
                } else { console.log("No block at " + x + ", " + y + ", " + z + "."); return false; }
            } else { console.log("No block at " + x + ", " + y + ", " + z + "."); return false; }
        } else { console.log("No block at " + x + ", " + y + ", " + z + "."); return false; }
    } else { console.log("Turtle: " + trtlId + " does not exist" + "."); return false; }
}


function updateCameraPos(prevX, prevY, prevZ, newX, newY, newZ) {
    camera.position.set(camera.position.x + (newX - prevX), camera.position.y + (newY - prevY), -(-camera.position.z + (newZ - prevZ))); controls.update();
    controls.target.set(newX, newY, -newZ); controls.update();
}
function updateTurtlePos(id) {
    turtles[id].model.position.set(turtles[id].x, turtles[id].y, -turtles[id].z);
    turtles[id].model.rotation.y = (-(Math.PI / 2) * turtles[id].d) - (Math.PI / 2);
}
function UpdateBlcks() {
    luaCmdReturn("turtle.inspectUp()", "Get block up", "returnSilent", function (returnVal, id) {
        if (returnVal != null) {
            if (returnVal[0] != "false" && returnVal[1] != "nil" && returnVal[1] != "No block to inspect") {
                setBlockDir("up", returnVal[1], id);
            } else { setBlockDir("up", "minecraft|air", id); }
            luaCmdReturnSpecific(id, "turtle.inspectDown()", "Get block down", "returnSilent", function (returnVal, id) {
                if (returnVal != null) {
                    if (returnVal[0] != "false" && returnVal[1] != "nil" && returnVal[1] != "No block to inspect") {
                        setBlockDir("down", returnVal[1], id);
                    } else { setBlockDir("down", "minecraft|air", id); }
                    luaCmdReturnSpecific(id, "turtle.inspect()", "Get block", "returnSilent", function (returnVal, id) {
                        if (returnVal != null) {
                            if (returnVal[0] != "false" && returnVal[1] != "nil" && returnVal[1] != "No block to inspect") {
                                setBlockDir("forward", returnVal[1], id);
                            } else { setBlockDir("forward", "minecraft|air", id); }
                            luaCmdReturnSpecific(id, "turtle.turnRight()", "Turn Right", "returnSilent", function (returnVal, id) {
                                if (returnVal != null) {
                                    if (returnVal[0] = "true") {
                                        turtles[id].d = (turtles[id].d + 5) % 4;
                                        updateTurtlePos(id);
                                        luaCmdReturnSpecific(id, "turtle.inspect()", "Get block", "returnSilent", function (returnVal, id) {
                                            if (returnVal[0] != "false" && returnVal[1] != "nil" && returnVal[1] != "No block to inspect") {
                                                setBlockDir("forward", returnVal[1], id);
                                            } else { setBlockDir("forward", "minecraft|air", id); }
                                            luaCmdReturnSpecific(id, "turtle.turnRight()", "Turn Right", "returnSilent", function (returnVal, id) {
                                                if (returnVal != null) {
                                                    if (returnVal[0] = "true") {
                                                        turtles[id].d = (turtles[id].d + 5) % 4;
                                                        updateTurtlePos(id);
                                                        luaCmdReturnSpecific(id, "turtle.inspect()", "Get block", "returnSilent", function (returnVal, id) {
                                                            if (returnVal[0] != "false" && returnVal[1] != "nil" && returnVal[1] != "No block to inspect") {
                                                                setBlockDir("forward", returnVal[1], id);
                                                            } else { setBlockDir("forward", "minecraft|air", id); }
                                                            luaCmdReturnSpecific(id, "turtle.turnRight()", "Turn Right", "returnSilent", function (returnVal, id) {
                                                                if (returnVal != null) {
                                                                    if (returnVal[0] = "true") {
                                                                        turtles[id].d = (turtles[id].d + 5) % 4;
                                                                        updateTurtlePos(id);
                                                                        luaCmdReturnSpecific(id, "turtle.inspect()", "Get block", "returnSilent", function (returnVal, id) {
                                                                            if (returnVal[0] != "false" && returnVal[1] != "nil" && returnVal[1] != "No block to inspect") {
                                                                                setBlockDir("forward", returnVal[1], id);
                                                                            } else { setBlockDir("forward", "minecraft|air", id); }
                                                                            luaCmdReturnSpecific(id, "turtle.turnRight()", "Turn Right", "returnSilent", function (returnVal, id) {
                                                                                if (returnVal != null) {
                                                                                    if (returnVal[0] = "true") {
                                                                                        turtles[id].d = (turtles[id].d + 5) % 4;
                                                                                        updateTurtlePos(id);
                                                                                        turtles[id].canAct = true;
                                                                                    } else { console.log("Turn right failed while trying to update blocks."); turtles[id].canAct = true; }
                                                                                } else { console.log("Turtle took to long to respond."); turtles[id].canAct = true; }
                                                                            });
                                                                        });
                                                                    } else { console.log("Turn right failed while trying to update blocks."); turtles[id].canAct = true; }
                                                                } else { console.log("Turtle took to long to respond."); turtles[id].canAct = true; }
                                                            });
                                                        });
                                                    } else { console.log("Turn right failed while trying to update blocks."); turtles[id].canAct = true; }
                                                } else { console.log("Turtle took to long to respond."); turtles[id].canAct = true; }
                                            });
                                        });
                                    } else { console.log("Turn right failed while trying to update blocks."); turtles[id].canAct = true; }
                                } else { console.log("Turtle took to long to respond."); turtles[id].canAct = true; }
                            });
                        } else { console.log("Turtle took to long to respond."); turtles[id].canAct = true; }
                    });
                } else { console.log("Turtle took to long to respond."); turtles[id].canAct = true; }
            });
        } else { console.log("Turtle took to long to respond."); turtles[id].canAct = true; }
    });
}


function setForceNames(value) {
    forceNames = value;
    for (let index = 1; index < turtles.length + 1; index++) {

        if (turtles[index] != null) {
            luaCmd(index, "os.setComputerLabel('turtle" + index + "')", "os.setComputerLabel('turtle" + index + "')", "false");
            luaCmd(index, "os.getComputerLabel()", "os.getComputerLabel()", "name");
        }
    }
}
function setOffset() {
    if (turtles[curid].canAct) {
        var x = turtles[curid].x;
        var y = turtles[curid].y;
        var z = turtles[curid].z;
        var d = turtles[curid].d;
        var isNull = true;
        //make sure there is a block one block forward and one block down
        switch (d) {
            case 0: if (worlds[curid][x] != null && worlds[curid][x][y - 1] != null && worlds[curid][x][z - 1] != null) { isNull = (worlds[curid][x][y - 1][z - 1] == null); } break;
            case 1: if (worlds[curid][x - 1] != null && worlds[curid][x - 1][y - 1] != null && worlds[curid][x - 1][z] != null) { isNull = (worlds[curid][x - 1][y - 1][z] == null); } break;
            case 2: if (worlds[curid][x] != null && worlds[curid][x][y - 1] != null && worlds[curid][x][z + 1] != null) { isNull = (worlds[curid][x][y - 1][z + 1] == null); } break;
            case 3: if (worlds[curid][x + 1] != null && worlds[curid][x + 1][y - 1] != null && worlds[curid][x + 1][z] != null) { isNull = (worlds[curid][x + 1][y - 1][z] == null); } break;
        }
        if (!isNull) {
            luaCmdReturn("turtle.inspect()", "Get block", "returnSilent", function (returnVal, id) {
                if (returnVal != null) {
                    if (returnVal[0] != "false" && returnVal[1] != "nil" && returnVal[1] != "No block to inspect") {
                        var BlkId = returnVal[1].replaceAll("|", ":");
                        json = JSON.parse(BlkId);
                        if (facingOffsets[json.name]) {
                            //calculate offset
                            var _offset;
                            switch (json.state.facing) {
                                case "north": _offset = ((d - (facingOffsets[json.name])) + 4) % 4; break;
                                case "east": _offset = ((d - (1 + facingOffsets[json.name])) + 4) % 4; break;
                                case "south": _offset = ((d - (2 + facingOffsets[json.name])) + 4) % 4; break;
                                case "west": _offset = ((d - (3 + facingOffsets[json.name])) + 4) % 4; break;
                                default: console.log("Direction not supported."); return;
                            }
                            //rerender the scene with correct rotation
                            rerender();
                        } else { console.log("Not a valid block."); }
                    } else { console.log("There is not a block in front of the Turtle."); }
                } else { console.log("Turtle took too long to respond."); }
            });
        } else { console.log("Invalid block placement."); }
    }
}
function setCurTurtle(value) {
    //remove old world
    if (blocks[curid] != null) {
        for (let index = 0; index < blocks[curid].length; index++) {
            if (scene.getObjectByName("Cube, " + blocks[curid][index]) != null) { scene.remove(scene.getObjectByName("Cube, " + blocks[curid][index])); }
            if (scene.getObjectByName("Line, " + blocks[curid][index]) != null) { scene.remove(scene.getObjectByName("Line, " + blocks[curid][index])); }
        }
    }
    scene.remove(turtles[curid].model);
    //create new  world
    if (blocks[value] != null) {
        for (let index = 0; index < blocks[value].length; index++) {
            pos = blocks[value][index].split(", ");
            if (blockDirections[curid][pos[0]][pos[1]][pos[2]] != null) {
                var cube = getCube(worlds[value][pos[0]][pos[1]][pos[2]], blockDirections[curid][pos[0]][pos[1]][pos[2]]);
            } else { var cube = getCube(worlds[value][pos[0]][pos[1]][pos[2]], null); }
            cube[0].position.x = pos[0];
            cube[0].position.y = pos[1];
            cube[0].position.z = -parseInt(pos[2]);
            cube[0].name = "Cube, " + blocks[value][index];
            scene.add(cube[0]);
            if (cube[1] != null) {
                var edges = new THREE.EdgesGeometry(cube[1]);
                var line = new THREE.LineSegments(edges, lineMaterial);
                line.position.x = pos[0];
                line.position.y = pos[1];
                line.position.z = -parseInt(pos[2]);
                line.name = "Line, " + blocks[value][index];
                scene.add(line);
            }
        }
    }
    turtles[value].model.position.set(turtles[value].x, turtles[value].y, turtles[value].z);
    scene.add(turtles[value].model);
    updateCameraPos(turtles[curid].x, turtles[curid].y, turtles[curid].z, turtles[value].x, turtles[value].y, turtles[value].z);
    curid = value;
    turtles[curid].canAct = false;
    UpdateBlcks();
}
function setBlock(x, y, z, BlkId, trtlId, direction) {
    //remove block from scene
    object1 = scene.getObjectByName("Cube, " + x + ", " + y + ", " + z) != null;
    object1 != null ? scene.remove(scene.getObjectByName("Cube, " + x + ", " + y + ", " + z)) : false;
    object2 = scene.getObjectByName("Line, " + x + ", " + y + ", " + z) != null;
    object2 != null ? scene.remove(scene.getObjectByName("Line, " + x + ", " + y + ", " + z)) : false;
    //remove block from blocks array
    if (blocks[trtlId] != null) {
        index = blocks[trtlId].indexOf(x + ", " + y + ", " + z);
        index != -1 ? blocks[trtlId].splice(index, 1) : false;
    }
    //remove block from worlds array
    object1 != null && object2 != null ? function () { if (worlds[trtlId] != null) { worlds[trtlId][x][y][z] = null } } : false;
    //place new block
    if (BlkId != "minecraft:air" && !irrelevantBlocks.includes(BlkId)) {
        if (direction != null) {
            var cube = getCube(BlkId, direction);
        } else { var cube = getCube(BlkId, direction); }
        cube[0].position.x = x;
        cube[0].position.y = y;
        cube[0].position.z = -z;
        cube[0].name = "Cube, " + x + ", " + y + ", " + z;
        scene.add(cube[0]);
        //create new outline
        if (cube[1] != null) {
            var edges = new THREE.EdgesGeometry(cube[1]);
            var line = new THREE.LineSegments(edges, lineMaterial);
            line.position.x = x;
            line.position.y = y;
            line.position.z = -z;
            line.name = "Line, " + x + ", " + y + ", " + z;
            scene.add(line);
        }
        //add to blocks list
        if (blocks[trtlId] == null) { blocks[trtlId] = []; }
        blocks[trtlId].push(x + ", " + y + ", " + z);
        //add block to worlds array
        if (worlds[trtlId] == null) { worlds[trtlId] = []; }
        if (worlds[trtlId][x] == null) { worlds[trtlId][x] = []; }
        if (worlds[trtlId][x][y] == null) { worlds[trtlId][x][y] = []; }
        worlds[trtlId][x][y][z] = BlkId;
        //add block to blockDirections array
        if (blockDirections[trtlId] == null) { blockDirections[trtlId] = []; }
        if (blockDirections[trtlId][x] == null) { blockDirections[trtlId][x] = []; }
        if (blockDirections[trtlId][x][y] == null) { blockDirections[trtlId][x][y] = []; }
        blockDirections[trtlId][x][y][z] = direction;
    }
}
function setBlockDir(dir, id, trtlId) {
    var direction = null;
    var BlkId = id.replaceAll("|", ":");
    if (BlkId != "minecraft:air") {
        json = JSON.parse(BlkId);
        if (json.state != null && json.state.variant != null) {
            BlkId = json.name + "/" + json.state.variant;
        } else if (json.state != null && json.state.type != null) {
            BlkId = json.name + "/type:" + json.state.type;
        } else {
            BlkId = json.name;
        } if (json.state != null) {
            if (json.state.facing != null) {
                direction = json.state.facing;
            } else if (json.state.axis != null) { direction = json.state.axis; }
        }
    }
    x = turtles[trtlId].x;
    y = turtles[trtlId].y;
    z = turtles[trtlId].z;
    d = turtles[trtlId].d;
    if (id != null) {
        switch (dir) {
            case "forward":
                switch (d) {
                    case 0: setBlock(x, y, z - 1, BlkId, trtlId, direction); break;
                    case 1: setBlock(x - 1, y, z, BlkId, trtlId, direction); break;
                    case 2: setBlock(x, y, z + 1, BlkId, trtlId, direction); break;
                    case 3: setBlock(x + 1, y, z, BlkId, trtlId, direction); break;
                } break;
            case "up": setBlock(x, y + 1, z, BlkId, trtlId, direction); break;
            case "down": setBlock(x, y - 1, z, BlkId, trtlId, direction); break;
        }
    }
}


function forward() {
    if (turtles[curid].canAct) {
        turtles[curid].canAct = false;
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
                UpdateBlcks();
            } else { turtles[id].canAct = true; }
        });
    } else { console.log("You can't act right now."); }
}
function back() {
    if (turtles[curid].canAct) {
        turtles[curid].canAct = false;
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
                UpdateBlcks();
            } else { turtles[id].canAct = true; }
        });
    } else { console.log("You can't act right now."); }
}
function up() {
    if (turtles[curid].canAct) {
        turtles[curid].canAct = false;
        luaCmdReturn("turtle.up()", "Move up", "return", function (returnVal, id) {
            if (returnVal != null && returnVal[0] == "true") {
                turtles[id].y++;
                updateCameraPos(turtles[id].x, turtles[id].y - 1, turtles[id].z, turtles[id].x, turtles[id].y, turtles[id].z);
                if (curid == id) { updateTurtlePos(id); }
                UpdateBlcks();
            } else { turtles[id].canAct = true; }
        });
    } else { console.log("You can't act right now."); }
}
function down() {
    if (turtles[curid].canAct) {
        turtles[curid].canAct = false;
        luaCmdReturn("turtle.down()", "Move down", "return", function (returnVal, id) {
            if (returnVal != null && returnVal[0] == "true") {
                turtles[id].y--;
                updateCameraPos(turtles[id].x, turtles[id].y + 1, turtles[id].z, turtles[id].x, turtles[id].y, turtles[id].z);
                if (curid == id) { updateTurtlePos(id); }
                UpdateBlcks();
            } else { turtles[id].canAct = true; }
        });
    } else { console.log("You can't act right now."); }
}
function turnLeft() {
    if (turtles[curid].canAct) {
        turtles[curid].canAct = false;
        luaCmdReturn("turtle.turnLeft()", "Turn left", "return", function (returnVal, id) {
            if (returnVal != null && returnVal[0] == "true") {
                turtles[id].d = (turtles[id].d + 3) % 4;
                turtles[id].canAct = true;
                if (curid == id) { updateTurtlePos(id); }
            } else { turtles[id].canAct = true; }
        });
    } else { console.log("You can't act right now."); }
}
function turnRight() {
    if (turtles[curid].canAct) {
        turtles[curid].canAct = false;
        luaCmdReturn("turtle.turnRight()", "Turn right", "return", function (returnVal, id) {
            if (returnVal != null && returnVal[0] == "true") {
                turtles[id].d = (turtles[id].d + 5) % 4;
                turtles[curid].canAct = true;
                if (curid == id) { updateTurtlePos(id); }
            } else { turtles[curid].canAct = true; }
        });
    } else { console.log("You can't act right now."); }
}

function digUp() {
    if (turtles[curid].canAct) {
        turtles[curid].canAct = false;
        luaCmdReturn("turtle.digUp()", "Dig", "return", function (returnVal, id) {
            if (returnVal != null && returnVal[0] == "true") {
                luaCmdReturnSpecific(id, "turtle.inspectUp()", "Get block up", "returnSilent", function (returnVal, id) {
                    if (returnVal != null) {
                        if (returnVal[0] != "false" && returnVal[1] != "nil" && returnVal[1] != "No block to inspect") {
                            setBlockDir("up", returnVal[1], id);
                        } else { setBlockDir("up", "minecraft|air", id); }
                        turtles[id].canAct = true;
                    }
                });
            } else { turtles[id].canAct = true; }
        });
    } else { console.log("You can't act right now."); }
}
function dig() {
    if (turtles[curid].canAct) {
        turtles[curid].canAct = false;
        luaCmdReturn("turtle.dig()", "Dig forward", "return", function (returnVal, id) {
            if (returnVal != null && returnVal[0] == "true") {
                luaCmdReturnSpecific(id, "turtle.inspect()", "Get block", "returnSilent", function (returnVal, id) {
                    if (returnVal != null) {
                        if (returnVal[0] != "false" && returnVal[1] != "nil" && returnVal[1] != "No block to inspect") {
                            setBlockDir("forward", returnVal[1], id);
                        } else { setBlockDir("forward", "minecraft|air", id); }
                        turtles[id].canAct = true;
                    }
                });
            } else { turtles[id].canAct = true; }
        });
    } else { console.log("You can't act right now."); }
}
function digDown() {
    if (turtles[curid].canAct) {
        turtles[curid].canAct = false;
        luaCmdReturn("turtle.digDown()", "Dig", "return", function (returnVal, id) {
            if (returnVal != null && returnVal[0] == "true") {
                luaCmdReturnSpecific(id, "turtle.inspectDown()", "Get block down", "returnSilent", function (returnVal, id) {
                    if (returnVal != null) {
                        if (returnVal[0] != "false" && returnVal[1] != "nil" && returnVal[1] != "No block to inspect") {
                            setBlockDir("down", returnVal[1], id);
                        } else { setBlockDir("down", "minecraft|air", id); }
                        turtles[id].canAct = true;
                    }
                });
            } else { turtles[id].canAct = true; }
        });
    } else { console.log("You can't act right now."); }
}


function rerender() {
    //remove old world
    if (blocks[curid] != null) {
        for (let index = 0; index < blocks[curid].length; index++) {
            if (scene.getObjectByName("Cube, " + blocks[curid][index]) != null) { scene.remove(scene.getObjectByName("Cube, " + blocks[curid][index])); }
            if (scene.getObjectByName("Line, " + blocks[curid][index]) != null) { scene.remove(scene.getObjectByName("Line, " + blocks[curid][index])); }
        }
    }
    scene.remove(turtles[curid].model);
    //create new  world
    if (blocks[curid] != null) {
        for (let index = 0; index < blocks[curid].length; index++) {
            pos = blocks[curid][index].split(", ");
            if (blockDirections != null) {
                var cube = getCube(worlds[curid][pos[0]][pos[1]][pos[2]], blockDirections[curid][pos[0]][pos[1]][pos[2]]);
            } else { var cube = getCube(worlds[curid][pos[0]][pos[1]][pos[2]], null); }
            cube[0].position.x = pos[0];
            cube[0].position.y = pos[1];
            cube[0].position.z = -parseInt(pos[2]);
            cube[0].name = "Cube, " + blocks[curid][index];
            scene.add(cube[0]);
            if (cube[1] != null) {
                var edges = new THREE.EdgesGeometry(cube[1]);
                var line = new THREE.LineSegments(edges, lineMaterial);
                line.position.x = pos[0];
                line.position.y = pos[1];
                line.position.z = -parseInt(pos[2]);
                line.name = "Line, " + blocks[curid][index];
                scene.add(line);
            }
        }
    }
    //add turtle model back into the scene
    turtles[curid].model.position.set(turtles[curid].x, turtles[curid].y, turtles[curid].z);
    scene.add(turtles[curid].model);
}
function animate() {
    //every rerender the scene every frame
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}