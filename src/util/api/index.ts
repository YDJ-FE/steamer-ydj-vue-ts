import http from './http';
import axios from 'axios';

export default {
    getPackage() {
        return http.get('/posts/1', {}, 'https://jsonplaceholder.typicode.com');
    },

    http: http,
    axios: axios
};
