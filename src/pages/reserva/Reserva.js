import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import currencyFormatter from 'currency-formatter'

import Card from '../../components/Card'
import FormGroup from '../../components/FormGroup'
import CardVeiculo from '../../components/CardIVeiculo'
import ReservaService from '../../service/ReservaService'
import VeiculoService from '../../service/VeiculoService'

import AuthService from '../../service/AuthService'

import * as messages from '../../components/Toastr'

function Reserva(props) {

    const history = useHistory();

    const [veiculo, setVeiculo] = useState({})
    const [dataInicio, setDataInicio] = useState('')
    const [dataFim, setDataFim] = useState('')
    const [valorTotal, setValorTotal] = useState('')

    useEffect(() => {

        const params = props.match.params
        const service = new VeiculoService()
        service.obterPorId(params.id)
            .then(response => {
                setVeiculo(response.data)
            })
            .catch(error => {
                messages.mensagemErro(error.response.data);
            })
    }, [props.match.params])

    function solicitar() {
        const usuario = AuthService.buscaUsuarioDaSessao()

        const reserva = { idVeiculo: veiculo.id, idUsuario: usuario.id, dataInicio, dataFim }

        if ( !dataInicio || !dataFim ) {
            messages.mensagemErro('Informe o período da reserva.')
            return false;
        }

        const service = new ReservaService()
        service.solicitar(reserva)
            .then(response => {
                messages.mensagemSucesso('Veículo reservado com sucesso!');
                history.push('/home')
            })
            .catch(error => {
                messages.mensagemErro(error.response.data);
            })
    }

    function calculaValorTotal() {

        if (!dataInicio || !dataFim) {
            messages.mensagemErro('Informe o período da reserva.')
            return false
        }

        let arData = dataInicio.split('-');
        const dInicio = new Date(arData[0], arData[1] - 1, arData[2])

        arData = dataFim.split('-');
        const dFim = new Date(arData[0], arData[1] - 1, arData[2])

        const timeDiff = Math.abs(dFim.getTime() - dInicio.getTime());

        const diffDays = timeDiff === 0 ? 1 : Math.ceil(timeDiff / (1000 * 3600 * 24));

        const valorTotalCalculado = currencyFormatter.format(diffDays * veiculo.valorDia, { locale: 'pt-BR' })

        setValorTotal(valorTotalCalculado)
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="bs-docs-section">
                    <Card title="Cadastro de Veículos">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <FormGroup htmlFor="inputDataInicio" label="Data Início *">
                                        <input type="date"
                                            className="form-control"
                                            id="inputDataInicio"
                                            name="dataInicio"
                                            value={dataInicio}
                                            onChange={e => setDataInicio(e.target.value)}
                                            placeholder="Escolha a data início da reserva" />
                                    </FormGroup>
                                    <FormGroup htmlFor="inputDataFim" label="Data Fim">
                                        <input type="date"
                                            className="form-control"
                                            id="inputDataFim"
                                            value={dataFim}
                                            onChange={e => setDataFim(e.target.value)}
                                            placeholder="Escolha a data fim da reserva" />
                                    </FormGroup>
                                    <FormGroup htmlFor="inputValorTotal" label="Valor Total">
                                        <input type="text"
                                            disabled
                                            className="form-control"
                                            id="inputValorTotal"
                                            value={valorTotal}
                                            placeholder="Valor Total"
                                        />
                                    </FormGroup>
                                    <br />
                                    <button onClick={calculaValorTotal} type="button" className="btn btn-info">Calcular</button>
                                    <button onClick={solicitar} type="button" className="btn btn-primary">Confirmar Reserva</button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            <div className="col-md-8">
                <CardVeiculo item={veiculo} />
            </div>
        </div>
    )
}

export default Reserva;