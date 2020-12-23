import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import currencyFormatter from 'currency-formatter'

import AuthService from '../service/AuthService'
import ReservaService from '../service/ReservaService'
import ListaReservas from "./reserva/ListaReservas";

import * as messages from '../components/Toastr'

function Home(props) {

    const history = useHistory();
    const [usuario, setUsuario] = useState({});
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        const usuario = AuthService.buscaUsuarioDaSessao()

        if (usuario) {

            const service = new ReservaService()
            service.minhasReservas(usuario.id)
                .then(response => {
                    setReservas(response.data)
                })
                .catch(error => {
                    messages.mensagemAlerta("Não foi possível obter a lista de reservas, tente novamente mais tarde!");
                })

            setUsuario(usuario);

        } else {
            history.push('/login');
        }

    }, [])

    function onAtualizaSituacao(reserva, situacao) {
        const service = new ReservaService()
        reserva.situacao = situacao;
        service.atualizaSituacao(reserva)
            .then(response => {
                const posicao = reservas.indexOf(reserva)
                const cloneReservas = [...reservas]
                cloneReservas[posicao] = response.data;
                setReservas(cloneReservas);
                messages.mensagemSucesso(`Reserva ${situacao} com sucesso!`);
            })
            .catch(error => {
                messages.mensagemErro(error.response.data);
            })
    }

    function retornaCustoMesReservas() {
        let custoTotal = 0

        reservas.forEach(function (item) {
            if (item.situacao !== 'CANCELADA') {
                custoTotal += item.valorTotal
            }
        })
        return currencyFormatter.format(custoTotal, { locale: 'pt-BR' });
    }

    function irParaHistoricoReservas() {
        history.push('/historico-reservas')
    }

    return (

        <div className="jumbotron" style={{ paddingTop: 10 }}>
            <h1 className="display-4" >Bem vindo {usuario.nome}!</h1>
            <p className="lead">Esse é sua área de reservas.</p>
            <p className="lead">Seu custo total com reservas este mês é de: {retornaCustoMesReservas()} </p>
            <hr className="my-4" />
            <p>Você possui {reservas.filter(r => r.situacao !== "CONCLUIDA" && r.situacao !== "CANCELADA").length} reserva(s) pendente(s).</p>

            <ListaReservas lista={reservas}
                exibeAcoes={true}
                actionAtualizaSituacao={onAtualizaSituacao}
                sitaucaoDesconsiderar={['CANCELADA', 'CONCLUIDA']} />

            <p className="lead">
                <a className="btn btn-primary btn-lg"
                    href="#/lista-veiculos"
                    role="button">
                    <i className="fa fa-users"></i>Nova Reserva
                    </a>

                <button className="btn btn-primary btn-lg"
                    onClick={irParaHistoricoReservas} >Histórico
                    </button>
            </p>
        </div>
    )
}

export default Home;