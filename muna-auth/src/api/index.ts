import axios from 'axios'

const getAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000' // url base on orang2 pake apa
    timeout: 1000,
})

export { getAPI }