import net, { Socket } from "net";

const observablePort = 5000;

const clients: Socket[] = [];

const observableServer = net.createServer((socket) => {
  console.log("New client!");
  clients.push(socket);
});

const observerClient1 = net.createConnection(
  observablePort,
  "localhost",
  () => {
    console.log(`Connected to observable server at ${observablePort}`);
  }
);

observerClient1.on("data", (data) => {
  const _data = data.toString();
  console.log("observerClient1: Got data from server", _data);
});

setTimeout(() => {
  clients.forEach((client) => {
    client.write("Important message");
  });
}, 2000);

setTimeout(() => {
  const observerClient2 = net.createConnection(
    observablePort,
    "localhost",
    () => {
      console.log(`Connected to observable server at ${observablePort}`);
    }
  );

  observerClient2.on("data", (data) => {
    const _data = data.toString();
    console.log("observerClient2: Got data from server", _data);
  });
}, 2200);

setTimeout(() => {
  clients.forEach((client) => {
    client.write("Another message");
  });
}, 2500);

observableServer.listen(observablePort, () => {
  console.log(
    `Observable server listening at http://localhost:${observablePort}`
  );
});
