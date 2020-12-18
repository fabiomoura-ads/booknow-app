
export const _USUARIO_LOGADO = "_usuario_logado";

class AuthService {

    static registraSessaoDoUsuario(usuario) {        
        localStorage.setItem(_USUARIO_LOGADO, JSON.stringify(usuario))
    }

    static buscaUsuarioDaSessao() {
        const usuario = localStorage.getItem(_USUARIO_LOGADO)
        if ( usuario ) {
            return JSON.parse(usuario)
        }
        return null;
    }

    static removeSessaoDoUsuario(){
        localStorage.removeItem(_USUARIO_LOGADO)
    }

}

export default AuthService;