import React from 'react'
import currencyFormatter from 'currency-formatter'
import Moment from 'moment';
Moment.locale('pt');

export function Acoes(props) {

    const situacao = props.reserva.situacao

    let label = ''
    let acaoAtualiza = ''

    if (situacao === 'PENDENTE') {
        label = 'Confirmar'
        acaoAtualiza = 'CONFIRMADA'

    } else if (situacao === 'CONFIRMADA') {
        label = 'Efetivar'
        acaoAtualiza = 'EFETIVADA'

    } else if (situacao === 'EFETIVADA') {
        label = 'Concluir'
        acaoAtualiza = 'CONCLUIDA'
    }

    return (
        <div>
            <button type="button"
                title={label}
                className="btn btn-success"
                onClick={() => props.actionAtualiza(props.reserva, acaoAtualiza)}>
                {label}
            </button>
            <button type="button"
                title="Cancelar"
                className="btn btn-danger"
                onClick={() => props.actionAtualiza(props.reserva, "CANCELADA")}>
                Cancelar
            </button>
        </div>
    )

}
const ListaReservas = props => {

    const sitaucaoDesconsiderar = props.sitaucaoDesconsiderar || [''];

    const reservas = props.lista.filter(item => (sitaucaoDesconsiderar.indexOf(item.situacao) === -1));

    const linhas = reservas.map((reserva, index) => {
        return (
            <tr key={index}>
                <th scope="row">{reserva.veiculo.nome}</th>
                <td>{Moment(new Date(reserva.dataInicio)).format('DD/MM/yyyy')}</td>
                <td>{Moment(new Date(reserva.dataFim)).format('DD/MM/yyyy')}</td>
                <td>{currencyFormatter.format(reserva.valorDia, { locale: 'pt-BR' })}</td>
                <td>{currencyFormatter.format(reserva.valorTotal, { locale: 'pt-BR' })}</td>
                <td>{reserva.situacao}</td>
                { props.exibeAcoes
                    ?
                    <td><Acoes reserva={reserva} actionAtualiza={props.actionAtualizaSituacao} /></td>
                    :
                    false
                }
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Veículo</th>
                    <th scope="col">Início</th>
                    <th scope="col">Fim</th>
                    <th scope="col">Valor x Dia</th>
                    <th scope="col">Valor Total</th>
                    <th scope="col">Situação</th>
                    {props.exibeAcoes
                        ?
                        <th scope="col">Ações</th>
                        :
                        false
                    }
                </tr>
            </thead>
            <tbody>
                {linhas}
            </tbody>
        </table>

    )
}

export default ListaReservas;