import ApiService from './ApiService';

class UsuarioService extends ApiService {

    constructor() {
        super('api/usuarios');
    }

    autenticar(usuario) {
        return this.post('autenticar', usuario);
    }

    cadastrar(usuario) {
        return this.post('', usuario);
    }    


}

export default UsuarioService;