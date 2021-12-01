const express = require("express");
const server = express();
const routes = require("./routes");

// middleware - habilita os arquivos estáticos (public)
server.use(express.static("public"));

// routes
server.use(routes);

// server
const PORT = 3000;
server.listen(PORT, () => console.log(`Server is running on PORT ${PORT} 🚀`));
