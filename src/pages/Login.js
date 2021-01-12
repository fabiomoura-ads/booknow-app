import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'

import UsuarioService from '../service/UsuarioService';
import AuthService from '../service/AuthService'

import Card from '../components/Card';
import FormGroup from '../components/FormGroup';
import * as messages from '../components/Toastr'

function Login(props) {
    
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function logar() {

        if ( !email || !senha ) {
            messages.mensagemErro('Informe email e senha para continuar.')
            return
        }

        const service = new UsuarioService();
        service.autenticar({email, senha})
        .then(response => {
            AuthService.registraSessaoDoUsuario(response.data)
            messages.mensagemSucesso('Usuário autenticado!')
            history.push('/home')
        })
        .catch(error => {
            messages.mensagemErro(error.response.data)            
        })
    }
    
    function cadastrar(){
        history.push('/cadastro-usuario');
    }

    return (
        <div className="row">
            <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                <div className="bs-docs-section">
                    <Card title="Login">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <FormGroup htmlFor="inputEmail" label="Email *">
                                        <input type="email"
                                            className="form-control"
                                            id="inputEmail"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            placeholder="Digite seu Email" />
                                    </FormGroup>
                                    <FormGroup htmlFor="inputSenha" label="Senha *">
                                        <input type="password"
                                            className="form-control"
                                            id="inputSenha"
                                            value={senha}
                                            onChange={e => setSenha(e.target.value)}
                                            placeholder="Digite sua senha" />
                                    </FormGroup>
                                    <br />
                                    <button onClick={logar} type="button" className="btn btn-primary">Acessar</button>
                                    <button onClick={cadastrar} type="button" className="btn btn-danger">Cadastrar-se</button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Login;