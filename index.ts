import bodyParser from "body-parser";
import Server from "./classes/server";
import router from "./routes/router";
import cors from "cors";

const server = new Server();

// body parser

server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());


server.app.use(cors({origin:true,credentials:true}));


server.app.use('/', router)

server.start(()=>{
    console.log(`servidor corriendo por el puerto ${server.port}`);
})