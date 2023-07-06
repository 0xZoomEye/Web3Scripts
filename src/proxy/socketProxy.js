const { HttpsProxyAgent } = require("https-proxy-agent");

const WS_URL = "";
const HTTPS_URL = "";

const agent = new HttpsProxyAgent(HTTPS_URL);

const ws = new WebSocket(WS_URL, { agent });
ws.on("close", function () {
  console.log("close");
});

ws.on("error", function () {
  console.log("error");
});

ws.on("message", function message(data) {
  console.log(data.toString());
});
