import ApiService from './ApiService';

class ReservaService extends ApiService {

    constructor() {
        super('reserva');
    }

    solicitar(reserva) {
        return this.post('', reserva);
    }

    minhasReservas(idUsuario) {
        return this.get(`minhas-reservas?usuario=${idUsuario}`);
    }    

    atualizaSituacao(reserva){
        return this.put(`${reserva.id}/atualizar-situacao`, {situacao: reserva.situacao})
    }
    
}

export default ReservaService;