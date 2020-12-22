import React from 'react'
import currencyFormatter from 'currency-formatter'
import Moment from 'moment';
Moment.locale('pt');

export function ActionTableReserva(props) {
    return (
        <button {...props}
            type="button"
            onClick={() => props.actionAtualiza(props.reserva, props.situacao)}>
            {props.title}
        </button>
    )
}

export function Acoes(props) {

    const situacao = props.reserva.situacao

    if (situacao === 'PENDENTE') {
        return (
            <div>
                <button type="button"
                    title="Confirmar"
                    className="btn btn-success"
                    onClick={() => props.actionAtualiza(props.reserva, "CONFIRMADA")}>
                    Confirmar
                </button>
                <button type="button"
                    title="Cancelar"
                    className="btn btn-danger"
                    onClick={() => props.actionAtualiza(props.reserva, "CANCELADA")}>
                    Cancelar
                </button>
            </div>
        )
    } else if (situacao === 'CONFIRMADA') {
        return (
            <div>
                <ActionTableReserva
                    title={'Efetivar'}
                    className={'btn btn-success'}
                    situacao={"EFETIVADA"}
                    {...props}
                />
                <ActionTableReserva
                    title={'Cancelar'}
                    className={'btn btn-danger'}
                    situacao={"CANCELADA"}
                    {...props}
                />
            </div>
        )
    } else if (situacao === 'EFETIVADA') {
        return (
            <div>
                <ActionTableReserva
                    title={'Concluir'}
                    className={'btn btn-success'}
                    situacao={"CONCLUIDA"}
                    {...props}
                />
                <ActionTableReserva
                    title={'Cancelar'}
                    className={'btn btn-danger'}
                    situacao={"CANCELADA"}
                    {...props}
                />
            </div>
        )
    }

    return false
}
const ListaReservas = props => {

    const reservas = props.lista.filter(item => (item.situacao !== "CONCLUIDA" && item.situacao !== "CANCELADA"));

    const linhas = reservas.map((reserva, index) => {
        return (
            <tr key={index}>
                <th scope="row">{reserva.veiculo.nome}</th>
                <td>{Moment(new Date(reserva.dataInicio)).format('DD/MM/yyyy')}</td>
                <td>{Moment(new Date(reserva.dataFim)).format('DD/MM/yyyy')}</td>
                <td>{currencyFormatter.format(reserva.valorDia, { locale: 'pt-BR' })}</td>
                <td>{currencyFormatter.format(reserva.valorTotal, { locale: 'pt-BR' })}</td>
                <td>{reserva.situacao}</td>
                <td>
                    <Acoes reserva={reserva} actionAtualiza={props.actionAtualizaSituacao} />
                </td>
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
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {linhas}
            </tbody>
        </table>

    )
}

export default ListaReservas;