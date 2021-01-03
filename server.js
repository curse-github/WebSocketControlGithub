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
const socketport = "{port you want to host it on}";
wss = new WebSocket.Server({ port: socketport })
console.log("Websocket is running on ws://localhost:" + socketport);

wss.on('connection', websocket => {
	websocket.on('close', function (reasonCode, description) {
		if (reasonCode == 1006) {
			if (browserWS != null) {
				if (!Pinging) {
					Pinging = true;
					for (let index = 0; index < minecraftWSs.length; index++) {
						if (minecraftWSs[index] != null) {
							turtlealive[index] = false;
							minecraftWSs[index].send("{\"type\":\"ping\", \"id\":\"" + index + "\"}");
						}
					}
					setTimeout(function () {
						for (let index = 0; index < minecraftWSs.length; index++) {
							if (turtlealive[index] == false) {
								minecraftWSs[index] = null;
								console.log("turtle" + (index + 1) + " disconnected.")
								browserWS.send("disconnect:turtle:" + (index + 1));
							} else { turtlealive[index] = false; }
						}
						Pinging = false;
					}, 250);
				}
			}
		}
	});
	websocket.on('message', message => {
		//console.log(message)
		message = message.split(':');
		if (message[0] == "connect") {
			if (message[1] == "turtle") {
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
					browserWS.send("connection:turtle:" + (parseInt(_id) + 1).toString());
				}
				console.log("Connected to turtle" + (parseInt(_id) + 1).toString() + ".");
			} else if (message[1] == "browser") {
				console.log("Connected to browser.");
				browserWS = websocket;
				for (let index = 0; index < minecraftWSs.length; index++) {
					if (minecraftWSs[index] != null) { browserWS.send("connection:turtle:" + (index + 1)); }
				}
			}
		} else if (message[0] == "turtle") {
			var cmd = message[2];
			for (let index = 3; index < message.length; index++) { cmd = cmd + ":" + message[index]; }
			if (minecraftWSs[parseInt(message[1]) - 1] != null) { minecraftWSs[parseInt(message[1]) - 1].send(cmd); }
		} else if (message[0] == "id") {
			var cmd = message[0];
			for (let index = 1; index < message.length; index++) { cmd = cmd + ":" + message[index]; }
			browserWS.send(cmd);
		} else if (message[0] == "reply") {
			turtlealive[parseInt(message[1])] = true;
			console.log("turtle" + (parseInt(message[1]) + 1) + " is alive.")
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
	"js/tools.js",
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
	if (!allowedPaths.includes(path) && path.split("/")[0] != "textures") {
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