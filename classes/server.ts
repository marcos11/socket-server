import express from 'express';
import { SERVER_PORT } from '../global/environment';
import { createServer } from 'node:http';
import { Server, Socket }  from "socket.io";
import * as socket from '../sockets/socket';


export default class Servidor{
    private static _instance: Servidor;
    public app: express.Application;
    public port: number;
    public io;
    public server;
  

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        this.server = createServer(this.app);

        this.io = require("socket.io")(this.server,{
            cors:{
                origin:true,
                credentials:true
            },
        });

        this.escucharSockets();
    }

    public static get instance(){
        return this._instance || (this._instance = new this());
    }


    private escucharSockets(){
        this.io.on('connection',(cliente:Socket) => {
            console.log(cliente.id);

            // conectar cliente();
            socket.conectarCliente(cliente,this.io);

            // configurar usuario
            socket.configurarUsuario(cliente,this.io);

            // obtener usuarios activos
            socket.obtenerUsuarios(cliente,this.io);

            socket.mensaje(cliente,this.io);
            // desconectar socket
            socket.desconectar(cliente,this.io);

            
        })
    }


    start(callback:Function){
        this.server.listen(this.port,callback as any);
    }

}