
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup'
import SelectItem from '../../components/SelectItem'

import AuthService from '../../service/AuthService'
import ReservaService from '../../service/ReservaService'
import ListaReservas from './ListaReservas';

import * as messages from '../../components/Toastr'

function HistoricoReservas() {

    const [dataInicioPesq, setDataInicioPesq] = useState('');
    const [dataFimPesq, setDataFimPesq] = useState('');
    const [nomeVeiculoPesq, setNomeVeiculoPesq] = useState('');
    const [situacaoPesq, setSituacaoPesq] = useState('');

    const history = useHistory();
    const [reservas, setReservas] = useState([]);
    const [reservasFilter, setReservasFilter] = useState([]);

    function listaSituacaoReserva() {
        return ['PENDENTE', 'CONFIRMADA', 'EFETIVADA', 'CONCLUIDA', 'CANCELADA']
    }

    useEffect(() => {
        const usuario = AuthService.buscaUsuarioDaSessao()

        if (usuario) {

            const service = new ReservaService()
            service.minhasReservas(usuario.id)
                .then(response => {
                    setReservas(response.data)
                    setReservasFilter(response.data)
                })
                .catch(error => {
                    messages.mensagemAlerta("Não foi possível obter a lista de reservas, tente novamente mais tarde!");
                })

        } else {
            history.push('/login');
        }

    }, [history])

    function pesquisar() {

        let timeDataInicioPesq;
        let timeDataFimPesq;
        let existeSituacaoPesq;

        if (dataInicioPesq) {
            timeDataInicioPesq = new Date(dataInicioPesq).getTime();
        }
        if (dataFimPesq) {
            timeDataFimPesq = new Date(dataFimPesq).getTime();
        }
        if (listaSituacaoReserva().indexOf(situacaoPesq) !== -1) {
            existeSituacaoPesq = situacaoPesq
        }

        const reservasFiltradas = reservas.filter(reserva => {
            let retornaItem = true
            if (timeDataInicioPesq) {
                if (new Date(reserva.dataInicio).getTime() < timeDataInicioPesq) {
                    retornaItem = false
                }
            }

            if (timeDataFimPesq) {
                if (new Date(reserva.dataFim).getTime() > timeDataFimPesq) {
                    retornaItem = false
                }
            }

            if (nomeVeiculoPesq && reserva.veiculo.nome.toString().toUpperCase().indexOf(nomeVeiculoPesq.toString().toUpperCase()) === -1) {
                retornaItem = false
            }

            if (existeSituacaoPesq && reserva.situacao !== situacaoPesq) {
                retornaItem = false
            }

            return retornaItem
        })

        setReservasFilter(reservasFiltradas);

    }

    return (
        <div>
            <div className="row">
                <div className="col-md-12" >
                    <div>
                        <Card title="Pesquisa">
                            <div className="row">
                                <div className="col-lg-3">
                                    <FormGroup htmlFor="inputDataInicioPesq" label="Data Início">
                                        <input type="date"
                                            className="form-control"
                                            id="inputDataInicioPesq"
                                            value={dataInicioPesq}
                                            onChange={e => setDataInicioPesq(e.target.value)}
                                            placeholder="Digite a data início da reserva" />
                                    </FormGroup>
                                    <button onClick={pesquisar} type="button" className="btn btn-primary">Pesquisar</button>
                                </div>
                                <div className="col-lg-3">
                                    <FormGroup htmlFor="inputDataFimPesq" label="Data Fim">
                                        <input type="date"
                                            className="form-control"
                                            id="inputDataFimPesq"
                                            value={dataFimPesq}
                                            onChange={e => setDataFimPesq(e.target.value)}
                                            placeholder="Digite a data fim da reserva" />
                                    </FormGroup>
                                </div>
                                <div className="col-lg-3">
                                    <FormGroup htmlFor="inputNomeVeiculoPesq" label="Veículo">
                                        <input type="text"
                                            className="form-control"
                                            id="inputNomeVeiculoPesq"
                                            value={nomeVeiculoPesq}
                                            onChange={e => setNomeVeiculoPesq(e.target.value)}
                                            placeholder="Digite o nome do veículo da reserva" />
                                    </FormGroup>
                                </div>
                                <div className="col-lg-3">
                                    <FormGroup htmlFor="inputSituacaoPesq" label="Situação">
                                        <SelectItem className="form-control"
                                            id="inputSituacaoPesq"
                                            value={situacaoPesq}
                                            lista={listaSituacaoReserva()}
                                            onChange={e => setSituacaoPesq(e.target.value)}
                                            placeholder="Escolha a situação" />
                                    </FormGroup>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            <div className="jumbotron" style={{ paddingTop: 10 }}>
                <p className="lead">Seu histórico de reservas</p>
                <hr className="my-4" />
                <ListaReservas lista={reservasFilter} exibeAcoes={false} />
            </div>
        </div>
    )
}

export default HistoricoReservas;