//download node.js
//download yarn
//cmd: yarn init
//cmd: yarn ws

const WebSocket = require('ws')
const http = require("http");
const fs = require('fs');
const { networkInterfaces } = require('os');
const url = require('url');

var minecraftWSs = [];
var turtlealive = [];
var browserWS = false;
var parameters = null;
var Pinging = false;

var ipAddr = null;

//WebSocket
const socketport = "{port}";
wss = new WebSocket.Server({ port: socketport })
console.log("Websocket is running on ws://localhost:" + socketport);

wss.on('connection', websocket => {
	websocket.on('close', function (reasonCode, description) {
		if (reasonCode == 1006) {
			if (browserWS != null) {
				if (!Pinging) {
					Pinging = true;
					//how many times we should loop
					var turtleindexes = [];
					for (let index = 0; index < minecraftWSs.length; index++) { if (minecraftWSs[index] != null) {turtleindexes.push(index); } }
					for (let index = 0; index < turtleindexes.length; index++) {
						if (minecraftWSs[turtleindexes[index]] != null) {
							turtlealive[turtleindexes[index]] = false;
							minecraftWSs[turtleindexes[index]].send("{\"type\":\"ping\", \"id\":\"" + turtleindexes[index] + "\"}");
						}
					}
					setTimeout(function () {
						for (let index = 0; index < turtleindexes.length; index++) {
							if (turtlealive[turtleindexes[index]] == false) {
								minecraftWSs[turtleindexes[index]] = null;
								console.log("turtle" + (turtleindexes[index] + 1) + " disconnected.")
								browserWS.send("{\"disconnection\":\"" + (turtleindexes[index] + 1) + "\"}");
							} else { turtlealive[turtleindexes[index]] = false; }
						}
						Pinging = false;
					}, 250);
				}
			}
		}
	});
	websocket.on('message', message => {
		var msg = JSON.parse(message);
		if (msg.type == "connection") {
			if (msg.connection == "turtle") {
				var length = minecraftWSs.length;
				if (length == undefined) { length = 0; }
				var foundSpace = false;
				var _id = length;
				for (let index = 0; index < length + 1; index++) {
					if (foundSpace == false) {
						if (minecraftWSs[index] == null) {
							minecraftWSs[index] = websocket;
							foundSpace = true;
							_id = index;
						}
					}
				}
				if (browserWS != false) {
					browserWS.send("{\"connection\":\"" + (parseInt(_id) + 1) + "\"}");
				}
				console.log("Connected to turtle" + (parseInt(_id) + 1) + ".");
			} else if (msg.connection == "browser") {
				console.log("Connected to browser.");
				browserWS = websocket;
				for (let index = 0; index < minecraftWSs.length; index++) {
					if (minecraftWSs[index] != null) { browserWS.send("{\"connection\":\"" + (index + 1) + "\"}"); }
				}
			}
		} else if (msg.type == "send") {
			if (minecraftWSs[msg.turtle - 1] != null) { minecraftWSs[msg.turtle - 1].send(msg.cmd); }
		} else if (msg.type == "return") {
			browserWS.send(message);
		} else if (msg.type = "reply") {
			turtlealive[msg.id] = true;
			console.log("turtle" + (parseInt(msg.id)+1) + " is alive.")
		}
	});
})

function getIp() {
	const nets = networkInterfaces();
	const results = Object.create(null); // Or just '{}', an empty object

	for (const name of Object.keys(nets)) {
		for (const net of nets[name]) {
			// Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
			if (net.family === 'IPv4' && !net.internal) {
				if (!results[name]) {
					results[name] = [];
				}
				results[name].push(net.address);
			}
		}
	}
	if (results["Ethernet"] != null) {
		ipAddr = results["Ethernet"][0];
		console.log("Ip is: " + ipAddr + ".\n");
	} else if (results["Wi-Fi"] != null) {
		ipAddr = results["Wi-Fi"][0];
		console.log("Ip is: " + ipAddr + ".\n");
	} return results;
}

//Web server
const host = '0.0.0.0';
const serverport = 80; //I would suggest leaving these options

var allowedPaths = [
	//main files
	"js/Main.js",
	"js/Actions.js",
	"js/Tools.js",
	//three.js + camera control
	"js/three.js",
	"js/OrbitControls.js",
	//3d model
	"model/turtle.obj",
	//OBJLoader
	"js/OBJLoader/OBJLoader2.js",
	"js/OBJLoader/OBJLoader2Parser.js",
	"js/OBJLoader/MeshReceiver.js",
	"js/OBJLoader/MaterialHandler.js",
	//TextureLoader
	"js/TextureLoader/Cache.js",
	"js/TextureLoader/constants.js",
	"js/TextureLoader/ImageLoader.js",
	"js/TextureLoader/Loader.js",
	"js/TextureLoader/LoadingManager.js",
	"js/TextureLoader/Texture.js",
	"js/TextureLoader/TextureLoader.js",
	"js/SceneUtils.js",
]

const requestListener = function (req, res) {
	_url = url.parse(req.url, true);
	var path = (_url.pathname).substring(1).split("&")[0];
	if (path == "favicon.ico") { return; }
	if (!allowedPaths.includes(path) && path.split("/")[0] != "textures" && path.split("/")[0] != "UI") {
		parameters = _url.query;
		path = "index" + path + ".html"
	}
	if (fs.existsSync(path)) {
		if (path.split(".")[1] == "png") {
			//png file
			res.writeHead(200, { 'Content-Type': 'image/png' });
			var s = fs.createReadStream(path);
			s.on('open', function () { s.pipe(res); });
		} else {
			//other
			res.writeHead(200);
			fs.readFile(path, "utf8", function (err, data) {
				if (err) {
					console.log(err);
				} else {
					if (ipAddr == null) { ipAddr = getIp(); }
					data = data.replace("{ipAddr}", ipAddr);
					res.write(data)
					res.end();
				}
			});
		}

	} else { console.log(path + " doesnt exist") }
};
const server = http.createServer(requestListener);
server.listen(serverport, host, () => {
	console.log(`Web server is running on http://${host}:${serverport}`);
	getIp();
});