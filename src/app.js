import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars"
import { Server } from "socket.io";

import ProductRouter from "./routes/products.router.js"
import routerV from "./routes/views.router.js";
import cartRouter from "./routes/carts.router.js"
import socketProducts from "./listeners/socketProducts.js";

const app = express();
const PORT = 8080;

app.use(express.static(__dirname + "/public"))

//handlebars
app.engine("handlebars",handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine","handlebars") 

//rutas
app.use("/api",ProductRouter)
app.use("/api",cartRouter)
app.use("/",routerV)

 
const httpServer=app.listen(PORT, () => {
    try {
        console.log(`listening to the port ${PORT}\nAcceder a:`);
        console.log(`\t1). htpp://localhost:${PORT}/api/products`)
        console.log(`\t2). htpp://localhost:${PORT}/api/carts`);
    }
    catch (error) {
        console.log(error);
    }
});

const socketServer = new Server (httpServer)

socketProducts(socketServer)