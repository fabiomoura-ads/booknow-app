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
                if (response.data && response.data instanceof Array) {
                    setLista(response.data)
                    setItem(response.data[0])
                }
            })
            .catch(error => {
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

            <CardVeiculo item={item} 
                    isFirstItem={isFirstItem()}
                    isLastItem={isLastItem()} 
                    actionItem={actionItem} />

        </div>
    )
}


export default ListaVeiculosReserva;