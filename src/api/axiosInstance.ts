import axios from 'axios';
import AuthToken from './services/auth_token'

const token = "Bearer " + AuthToken()
const axiosPrivateInstance = axios.create({
    baseURL: 'http://localhost:5001/api/model-app',
    headers: {
        Authorization: token
    }
})

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001/api/model-app'
})

export {axiosInstance, axiosPrivateInstance}