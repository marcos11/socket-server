import bodyParser from "body-parser";
import router from "./routes/router";
import Servidor from "./classes/server";

const server = Servidor.instance;

// body parser

server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());


server.app.use('/', router)

server.start(()=>{
    console.log(`servidor corriendo por el puerto ${server.port}`);
})