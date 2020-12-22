import { Switch, HashRouter, Route } from 'react-router-dom';

import Login from '../pages/Login'
import Home from '../pages/Home'
import CadastroUsuario from '../pages/CadastroUsuario'
import CadastroVeiculo from '../pages/veiculo/CadastroVeiculo'
import ConsultarVeiculos from '../pages/veiculo/ConsultarVeiculos'
import ListaVeiculosReserva from '../pages/reserva/ListaVeiculosReserva'
import Reserva from '../pages/reserva/Reserva'

/**
 <Route path="/cadastro-usuario" component={CadastroUsuario} />
 <Route path="/cadastro-veiculo" component={CadastroVeiculo} />
 <Route path="/consultar-veiculos" component={ConsultarVeiculos} />
 */
function Rotas() {

    return (
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/lista-veiculos" component={ListaVeiculosReserva} />
                <Route path="/reserva/:id" component={Reserva} />
            </Switch>
        </HashRouter>
    )
}

export default Rotas;