import { Switch, HashRouter, Route } from 'react-router-dom';

import Login from '../pages/Login'
import Home from '../pages/Home'
import CadastroUsuario from '../pages/CadastroUsuario'
import ListaVeiculosReserva from '../pages/reserva/ListaVeiculosReserva'
import Reserva from '../pages/reserva/Reserva'
import HistoricoReservas from '../pages/reserva/HistoricoReservas'

function Rotas() {

    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuario" component={CadastroUsuario} />                
                <Route path="/lista-veiculos" component={ListaVeiculosReserva} />
                <Route path="/reserva/:id" component={Reserva} />
                <Route path="/historico-reservas" component={HistoricoReservas} />
            </Switch>
        </HashRouter>
    )
}

export default Rotas;