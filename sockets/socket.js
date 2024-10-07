"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerUsuarios = exports.configurarUsuario = exports.mensaje = exports.desconectar = exports.conectarCliente = exports.usuariosConectados = void 0;
const usuario_1 = require("../classes/usuario");
const usuarios_lista_1 = require("../classes/usuarios-lista");
exports.usuariosConectados = new usuarios_lista_1.UsuariosLista();
const conectarCliente = (cliente, io) => {
    const usuario = new usuario_1.Usuario(cliente.id);
    exports.usuariosConectados.agregar(usuario);
};
exports.conectarCliente = conectarCliente;
const desconectar = (cliente, io) => {
    cliente.on('disconnect', () => {
        console.log('cliente desconectado');
        exports.usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
exports.desconectar = desconectar;
// escuchar mensajes
const mensaje = (cliente, io) => {
    cliente.on('mensaje', (payload) => {
        console.log(payload);
        io.emit('mensaje-nuevo', payload);
    });
};
exports.mensaje = mensaje;
// configuar Usuario
const configurarUsuario = (cliente, io) => {
    cliente.on('configurar-usuario', (payload, callback) => {
        exports.usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });
    });
};
exports.configurarUsuario = configurarUsuario;
// ObtenerUsuarios
const obtenerUsuarios = (cliente, io) => {
    cliente.on('obtener-usuarios', () => {
        io.to(cliente.id).emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
exports.obtenerUsuarios = obtenerUsuarios;
