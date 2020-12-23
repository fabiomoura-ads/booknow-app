import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Card from '../components/Card'
import FormGroup from '../components/FormGroup'

import UsuarioService from '../service/UsuarioService'

import * as messages from '../components/Toastr'

function CadastroUsuario() {

    const history = useHistory();
    
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmacaoDeSenha, setConfirmacaoDeSenha] = useState('');

    function cadastrar(){
        const service = new UsuarioService()
        service.cadastrar({nome, email, senha})
        .then(response => {
            messages.mensagemSucesso('Usuário cadastrado com sucesso!');
            history.push('/login')
        })
        .catch(error => {
            messages.mensagemErro(error.response.data);
        })
    }

    return (
        <div className="row">
            <div className="col-md-8">
                <div className="bs-docs-section">
                    <Card title="Cadastro de Usuário">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <FormGroup htmlFor="inputNome" label="Nome *">
                                        <input type="nome"
                                            className="form-control"
                                            id="inputNome"
                                            value={nome}
                                            onChange={e => setNome(e.target.value)}
                                            placeholder="Digite seu Nome" />
                                    </FormGroup>
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
                                    <FormGroup htmlFor="inputConfirmacaoDeSenha" label="Confirmação de Senha *">
                                        <input type="password"
                                            className="form-control"
                                            id="inputConfirmacaoDeSenha"
                                            value={confirmacaoDeSenha}
                                            onChange={e => setConfirmacaoDeSenha(e.target.value)}
                                            placeholder="Repita sua senha" />
                                    </FormGroup>
                                    <br />
                                    <button onClick={cadastrar} type="button" className="btn btn-primary">Cadastrar</button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default CadastroUsuario;