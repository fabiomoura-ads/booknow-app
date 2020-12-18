import React, { useEffect, useState } from 'react';
import Card from '../../components/Card'
import FormGroup from '../../components/FormGroup'
import SelectItem from '../../components/SelectItem'

import VeiculoService from '../../service/VeiculoService'

import * as messages from '../../components/Toastr'

function CadastroVeiculo() {

    const [nome, setNome] = useState('');
    const [marca, setMarca] = useState('');
    const [placa, setPlaca] = useState('');
    const [ano, setAno] = useState('');
    const [valorDia, setValorDia] = useState(0);
    const [situacao, setSituacao] = useState('');

    const [marcasDeVeiculos, setMarcasDeVeiculos] = useState([]);
    const [situacoesDeVeiculos, setSituacoesDeVeiculos] = useState([]);

    useEffect(() => {

        const service = new VeiculoService();

        function consultaMarcasDeVeiculos() {
            service.marcas()
                .then(response => {
                    setMarcasDeVeiculos(response.data)
                });
        }

        function consultaSituacoesDeVeiculos() {
            service.situacoes()
                .then(response => {
                    setSituacoesDeVeiculos(response.data)
                });
        }

        consultaMarcasDeVeiculos()
        consultaSituacoesDeVeiculos()
    }, [])

    function cadastrar() {
        const service = new VeiculoService()
        service.cadastrar({ nome, marca, placa, ano, valorDia, situacao })
            .then(response => {
                messages.mensagemSucesso('Veículo cadastrado com sucesso!');
            })
            .catch(error => {
                messages.mensagemErro(error.response.data);
            })
    }

    return (
        <div className="row">
            <div className="col-md-8">
                <div className="bs-docs-section">
                    <Card title="Cadastro de Veículos">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <FormGroup htmlFor="inputNome" label="Nome *">
                                        <input type="text"
                                            className="form-control"
                                            id="inputNome"
                                            name="nome"
                                            value={nome}
                                            onChange={e => setNome(e.target.value)}
                                            placeholder="Digite o Nome do Veículo" />
                                    </FormGroup>
                                    <FormGroup htmlFor="selectMarca" label="Marca *">
                                        <SelectItem className="form-control"
                                            id="selectMarca"
                                            lista={marcasDeVeiculos}
                                            value={marca}
                                            onChange={e => setMarca(e.target.value)} />
                                    </FormGroup>
                                    <FormGroup htmlFor="inputPlaca" label="Placa *">
                                        <input type="text"
                                            className="form-control"
                                            id="inputPlaca"
                                            value={placa}
                                            onChange={e => setPlaca(e.target.value)}
                                            placeholder="Digite a Placa do Veículo" />
                                    </FormGroup>
                                    <FormGroup htmlFor="inputAno" label="Ano *">
                                        <input type="texto"
                                            className="form-control"
                                            id="inputAno"
                                            name="inputAno"
                                            value={ano}
                                            onChange={e => setAno(e.target.value)}
                                            placeholder="Digite o Ano do Veículo" />
                                    </FormGroup>
                                    <FormGroup htmlFor="inputValorDia" label="Valor/dia *">
                                        <input type="text"
                                            className="form-control"
                                            id="inputValorDia"
                                            value={valorDia}
                                            onChange={e => setValorDia(e.target.value)}
                                            placeholder="Digite o Valor/dia do Veículo" />
                                    </FormGroup>
                                    <FormGroup htmlFor="selectSituacao" label="Situação *">
                                        <SelectItem className="form-control"
                                            id="selectSituacao"
                                            lista={situacoesDeVeiculos}
                                            value={situacao}
                                            onChange={e => setSituacao(e.target.value)} />
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

export default CadastroVeiculo;