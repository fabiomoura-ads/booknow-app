import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'http://localhost:8080/api/'
})


class ApiService {

    constructor(resource) {
        this.apiUrl = resource;
    }

    post(url, objeto) {
        const requestUrl = `${this.apiUrl}/${url}`
        console.log('REQ_POST ' + requestUrl )
        return httpClient.post(requestUrl, objeto);
    }

    get(url) {
        const requestUrl = `${this.apiUrl}/${url}`
        console.log('REQ_GET ' + requestUrl )        
        return httpClient.get(requestUrl);

    }

    put(url) {

    }

    delete(url) {
        const requestUrl = `${this.apiUrl}/${url}`
        console.log('REQ_DELET ' + requestUrl )
        return httpClient.delete(requestUrl);
    }
}

export default ApiService