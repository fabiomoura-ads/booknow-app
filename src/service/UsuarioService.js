import ApiService from './ApiService';

class UsuarioService extends ApiService {

    constructor() {
        super('usuarios');
    }

    autenticar(usuario) {
        return this.post('autenticar', usuario);
    }

    cadastrar(usuario) {
        return this.post('', usuario);
    }    


}

export default UsuarioService;