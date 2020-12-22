import { useHistory } from 'react-router-dom'
import currencyFormatter from 'currency-formatter'

function CardVeiculo(props) {

    const history = useHistory()

    function irParaReserva(item) {
        history.push(`/reserva/${item.id}`);
    }

    function exibeLinkReserva() {
        const page = history.location.pathname
        return page.indexOf('reserva/') === -1
    }

    function exibeDetalhes() {
        const page = history.location.pathname
        return page.indexOf('reserva/') !== -1
    }

    function exibeNavegacao() {
        const page = history.location.pathname
        return page.indexOf('lista-veiculos') !== -1
    }

    return (
        <div className="card mb-6">
            <h3 className="card-header">{props.item.nome} </h3>
            <div className="card-body">
                <h5 className="card-title">{props.item.marca}</h5>
                <h6 className="card-subtitle text-muted">{props.item.descricao}</h6>
            </div>
            <div className="row" style={{ justifyContent: "space-evenly" }}>

                {exibeNavegacao() ?
                    <ul className="pagination pagination-lg">
                        <div className="col-md-2" style={{ textAlign: "center" }}>
                            {props.isFirstItem
                                ?
                                <li className="page-item disabled">
                                    <button className="page-link" onClick={() => props.actionItem(props.item, 'P')}> &laquo; </button>
                                </li>
                                :
                                <li className="page-item">
                                    <button className="page-link" onClick={() => props.actionItem(props.item, 'P')}> &laquo; </button>
                                </li>

                            }
                        </div>
                        <div className="col-md-8" style={{ textAlign: "center", width: 800 }}>
                            <img src={props.item.imagem}
                                height="200"
                                aria-label="Placeholder: Image cap" />
                        </div>

                        <div className="col-md-2" style={{ textAlign: "center" }}>
                            {props.isLastItem
                                ?
                                <li className="page-item disabled">
                                    <button className="page-link" onClick={() => props.actionItem(props.item, 'N')}>  &raquo; </button>
                                </li>
                                :
                                <li className="page-item">
                                    <button className="page-link" onClick={() => props.actionItem(props.item, 'N')}>  &raquo;</button>
                                </li>
                            }
                        </div>
                    </ul>
                    :

                    <div className="col-md-8" style={{ textAlign: "center", width: 800 }}>
                        <img src={props.item.imagem}
                            height="200"
                            aria-label="Placeholder: Image cap" />
                    </div>
                }

            </div>
            <br />
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Preço x Dia: {currencyFormatter.format(props.item.valorDia, { locale: 'pt-BR' })}</li>
                {exibeDetalhes()
                    ?
                    <li className="list-group-item">Placa do Veículo: {props.item.placa}</li>
                    : false}
            </ul>
            {
                exibeLinkReserva() ?
                    <div className="card-body">
                        <button onClick={() => irParaReserva(props.item)} className="btn btn-info">Reservar</button>
                    </div>
                    : false
            }
            <div className="card-footer text-muted">Atualizado em {props.item.dataCadastro}</div>
        </div >
    )
}

export default CardVeiculo