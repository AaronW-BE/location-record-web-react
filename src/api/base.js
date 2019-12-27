import axios from 'axios';

const service = axios.create();
service.defaults.timeout = 5000;
service.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
service.defaults.withCredentials = true;
service.interceptors.request.use(config => {
    let token = sessionStorage.getItem("token");
    if (token) {
        config.headers['Authorization'] = token;
    }
    return config;
});

service.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const response = error.response;
        if (response.status === 401) {
            window.location = "/login";
        }
        return Promise.reject(error);
    });

export const GET = (url, data = {}, config = {}) => {
    return service.get(url, {
        params: data,
        ...config
    })
};

export const POST = (url, data = {}, config = {}) => {
    return service.post(url, data, config);
};

export const PUT = (url, data = {}, config = {}) => {
    return service.put(url, data, config);
};