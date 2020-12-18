import AuthService from '../service/AuthService'

function Navbar(props) {

    function logout() {
        AuthService.removeSessaoDoUsuario()
    }

    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary" >
            <div className="container">
                <a href="#" className="navbar-brand">Book Now</a>
                <button className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarResponsive"
                    aria-controls="navbarResponsive"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#/home">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#/cadastro-usuario">Usuários</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#/cadastro-veiculo">Cadastrar Veículo</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#/consultar-veiculos">Consultar Veículos</a>
                        </li>
                        <li className="nav-item">
                            <a onClick={logout} className="nav-link" href="#/login">Logout</a>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    );
}

export default Navbar;