import axios from 'axios'
import store from '@/store/index'

let instance = axios.create()

// Pour passer le token dans toutes les requetes
instance.interceptors.request.use(function (config) {
	config.headers['Authorization'] = store.state.auth.token

	return config
})

export default instance