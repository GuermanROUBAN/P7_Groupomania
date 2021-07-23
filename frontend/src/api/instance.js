import axios from 'axios'
import store from '@/store/index'

let instance = axios.create()

instance.interceptors.request.use(function (config) {
	config.headers['Authorization'] = store.state.auth.token

	return config
})

export default instance