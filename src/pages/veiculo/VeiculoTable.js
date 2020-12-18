import React from 'react'
import currencyFormatter from 'currency-formatter'

const VeiculoTable = props => {

    const linhas = props.lista.map((veiculo, index) => {
        return (
            <tr key={veiculo.id}>
                <th scope="row">{veiculo.nome}</th>
                <td>{veiculo.marca}</td>
                <td>{veiculo.placa}</td>
                <td>{veiculo.ano}</td>
                <td>{currencyFormatter.format(veiculo.valorDia, { locale: 'pt-BR' })}</td>
                <td>{veiculo.situacao}</td>
                <td>
                    <button type="button"
                        title="Reservar"
                        className="btn btn-success"
                        onClick={() => props.updateStatusAction(veiculo, 'EFETIVADO')}>
                        <i className="pi pi-check" />
                    </button>
                    <button type="button"
                        title="Excluir"
                        className="btn btn-danger"
                        onClick={() => props.deleteAction(veiculo)}>
                        <i className="pi pi-trash" />
                    </button>                    
                </td>
            </tr>
        )

    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Placa</th>
                    <th scope="col">Ano</th>
                    <th scope="col">Valor/dia</th>
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

export default VeiculoTable;