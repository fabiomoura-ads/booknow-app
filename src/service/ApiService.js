import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'https://booknow-api.herokuapp.com/'
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

    put(url, objeto) {
        const requestUrl = `${this.apiUrl}/${url}`
        console.log('REQ_PUT ' + requestUrl )        
        return httpClient.put(requestUrl, objeto);
    }

    delete(url) {
        const requestUrl = `${this.apiUrl}/${url}`
        console.log('REQ_DELET ' + requestUrl )
        return httpClient.delete(requestUrl);
    }
}

export default ApiService