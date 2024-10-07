import { Router,Request,Response } from "express";
import Servidor from "../classes/server";
import { Socket } from "socket.io";
import { usuariosConectados } from "../sockets/socket";

const router = Router();

router.get('/mensajes',(req: Request,res: Response)=>{
    res.json({
        ok: true,
        mensaje: 'todo bien'
    })
})

// servicio para obtener todos los ids de los usuarios a travez de los sockets v.4
router.get('/usuarios',(req: Request,res: Response)=>{
    const server = Servidor.instance;
    server.io.fetchSockets().then((sockets:any)=>{
        const clientes : object[] = [];
        sockets.forEach((socket: { id: object; }) => clientes.push(socket.id));
        res.json({
            ok: true,
            clientes
        })
    }).catch((err:any)=>{
        return res.json({
            ok: false,
            err
        })
    })
})


// obtener usuarios y sus nombres
router.get('/usuarios/detalle',(req: Request,res: Response)=>{
    res.json({
        ok: true,
        clientes:usuariosConectados.getLista()
    })
})


router.post('/mensajes',(req: Request,res: Response)=>{
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const payload = {
        de,
        cuerpo
    }
    const server = Servidor.instance;
    server.io.emit('mensaje-nuevo',payload);
    res.json({
        ok: true,
        cuerpo,
        de
    })
})


router.post('/mensajes/:id',(req: Request,res: Response)=>{
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    }

    const server = Servidor.instance;
    server.io.in(id).emit('mensaje-privado',payload);


    res.json({
        ok: true,
        cuerpo,
        de,
        id
    })
})

export default router;