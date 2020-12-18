import ApiService from './ApiService';

class VeiculoService extends ApiService {

    constructor() {
        super('veiculos');
    }

    cadastrar(veiculo) {
        return this.post('', veiculo);
    }
    
    marcas(){
        return this.get('marcas');
    }

    situacoes(){
        return this.get('situacoes');
    }

    listar(){
        return this.get('')
    }

    deletar(id){
        return this.delete(`/${id}`)
    }

}

export default VeiculoService;