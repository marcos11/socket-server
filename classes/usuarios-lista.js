"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosLista = void 0;
class UsuariosLista {
    constructor() {
        this.lista = [];
    }
    // agregar usuario
    agregar(usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }
    actualizarNombre(id, nombre) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log("====== Actualizando Usuario ======");
        console.log(this.lista);
    }
    getLista() {
        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }
    // obtener usuario
    getUsuario(id) {
        return this.lista.find(usuario => usuario.id === id);
    }
    // obtener un usuario de una sala en particular
    getUsuariosEnSala(sala) {
        return this.lista.filter(usuario => usuario.sala == sala);
    }
    // borrar usuario
    borrarUsuario(id) {
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id != id);
        return tempUsuario;
    }
}
exports.UsuariosLista = UsuariosLista;
