import { useState, useEffect } from 'react'
import VeiculoTable from './VeiculoTable'

import VeiculoService from '../../service/VeiculoService'

import * as messages from '../../components/Toastr'

function ConsultarVeiculos() {

    const [lista, setLista] = useState([])

    useEffect(() => {

        function consultaVeiculos() {
            const service = new VeiculoService()
            service.listar()
                .then(response => setLista(response.data))
                .catch(error => messages.mensagemErro(error.response.data))
        }

        consultaVeiculos()

    }, [lista])

    function deletar(veiculo) {
        const service = new VeiculoService()
        service.deletar(veiculo.id)
            .then(response => {
                messages.mensagemSucesso("Veículo deletado com sucesso!");
                const posicao = lista.indexOf(veiculo)
                const veiculos = lista.splice(posicao, 1)
                setLista(veiculos);
            })
            .catch(error => messages.mensagemErro(error.response.data))

    }

    return (
        <>
            <VeiculoTable lista={lista} deleteAction={deletar} />
        </>
    )
}

export default ConsultarVeiculos