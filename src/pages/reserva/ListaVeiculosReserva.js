import { useEffect, useState } from "react";
import CardVeiculo from '../../components/CardIVeiculo'

import VeiculoService from '../../service/VeiculoService'

import * as messages from '../../components/Toastr'

function ListaVeiculosReserva(props) {

    const [lista, setLista] = useState([])
    const [item, setItem] = useState({});

    useEffect(() => {

        const service = new VeiculoService()
        service.listar()
            .then(response => {
                console.log(response.data)
                if (response.data && response.data instanceof Array) {
                    setLista(response.data)
                    setItem(response.data[0])
                }
            })
            .catch(error => {
                console.log(error.response.data)
                messages.mensagemErro(error.response.data)
            })

    }, [])

    function actionItem(item, action) {

        if ((action === 'P' && isFirstItem()) || (action === 'N' && isLastItem())) {
            return false
        }

        const posicao = lista.indexOf(item);

        if (action === 'P') {
            setItem(lista[posicao - 1])
        } else {
            setItem(lista[posicao + 1])
        }
    }

    function isFirstItem() {
        if (lista.length && item) {
            return lista[0].id === item.id
        }
        return false
    }

    function isLastItem() {
        if (lista.length && item) {
            return lista[lista.length - 1].id === item.id
        }
        return false
    }

    return (
        <div className="jumbotron" style={{ paddingTop: 5 }}>


            <CardVeiculo item={item} isFirstItem={isFirstItem()} isLastItem={isLastItem()} actionItem={actionItem} />

        </div>
    )
}


export default ListaVeiculosReserva;

/*
<ul className="pagination pagination">
                {isFirstItem()
                    ?
                    <li className="page-item disabled">
                        <button className="page-link" onClick={() => actionItem(item, 'P')}> &laquo; </button>
                    </li>
                    :
                    <li className="page-item">
                        <button className="page-link" onClick={() => actionItem(item, 'P')}> &laquo; </button>
                    </li>
                }
                &nbsp;&nbsp;&nbsp;&nbsp;
                {isLastItem()
                    ?
                    <li className="page-item disabled">
                        <button className="page-link" onClick={() => actionItem(item, 'N')}>  &raquo; </button>
                    </li>
                    :
                    <li className="page-item">
                        <button className="page-link" onClick={() => actionItem(item, 'N')}>  &raquo;</button>
                    </li>
                }
            </ul>
*/