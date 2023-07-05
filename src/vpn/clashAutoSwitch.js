const HOST = "127.0.0.1:9090";
const SECRET = "secret";

async function getProxies() {
  const res = await fetch(`http://${HOST}/proxies`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${SECRET}`,
    },
  });
  const data = await res.json();
  return data;
}

async function switchProxy(name, selector = "PROXY") {
  console.log(`http://${HOST}/${selector}`, JSON.stringify({ name }));
  const res = await fetch(`http://${HOST}/proxies/${selector}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SECRET}`,
    },
    body: JSON.stringify({ name }),
  });
  return res.status; // not response body
}

(async () => {
  const res = await getProxies();
  const proxies = res.proxies.PROXY.all;
  console.log(`all proxies`, proxies);

  const name = proxies[Math.floor(Math.random() * proxies.length)];
  const status = await switchProxy(name);
  console.log(`change proxy status`, status, name);
})();
