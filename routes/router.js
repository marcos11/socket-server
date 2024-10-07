"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_1 = __importDefault(require("../classes/server"));
const socket_1 = require("../sockets/socket");
const router = (0, express_1.Router)();
router.get('/mensajes', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'todo bien'
    });
});
// servicio para obtener todos los ids de los usuarios a travez de los sockets v.4
router.get('/usuarios', (req, res) => {
    const server = server_1.default.instance;
    server.io.fetchSockets().then((sockets) => {
        const clientes = [];
        sockets.forEach((socket) => clientes.push(socket.id));
        res.json({
            ok: true,
            clientes
        });
    }).catch((err) => {
        return res.json({
            ok: false,
            err
        });
    });
});
// obtener usuarios y sus nombres
router.get('/usuarios/detalle', (req, res) => {
    res.json({
        ok: true,
        clientes: socket_1.usuariosConectados.getLista()
    });
});
router.post('/mensajes', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const payload = {
        de,
        cuerpo
    };
    const server = server_1.default.instance;
    server.io.emit('mensaje-nuevo', payload);
    res.json({
        ok: true,
        cuerpo,
        de
    });
});
router.post('/mensajes/:id', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    const payload = {
        de,
        cuerpo
    };
    const server = server_1.default.instance;
    server.io.in(id).emit('mensaje-privado', payload);
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});
exports.default = router;
