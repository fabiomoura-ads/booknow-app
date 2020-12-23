import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'https://booknow-api.herokuapp.com/'
    //baseURL: 'http://localhost:8080/'
})


class ApiService {

    constructor(resource) {
        this.apiUrl = resource;
    }

    post(url, objeto) {
        const requestUrl = `${this.apiUrl}/${url}`
        return httpClient.post(requestUrl, objeto);
    }

    get(url) {
        const requestUrl = `${this.apiUrl}/${url}`   
        return httpClient.get(requestUrl);
    }

    put(url, objeto) {
        const requestUrl = `${this.apiUrl}/${url}`   
        return httpClient.put(requestUrl, objeto);
    }

    delete(url) {
        const requestUrl = `${this.apiUrl}/${url}`
        return httpClient.delete(requestUrl);
    }
}

export default ApiService