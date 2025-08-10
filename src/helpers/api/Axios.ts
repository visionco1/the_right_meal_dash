import axios from 'axios'
import Cookies from 'js-cookie'

const AUTH_SESSION_KEY = 'right_meal_user'

const getUserFromCookie = () => {
	const user = Cookies.get(AUTH_SESSION_KEY)
	return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null
}

const Axios = axios.create({
	// baseURL: config.API_URL,
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		Accept: 'application/json',
		// 'Accept-Language': 'en',
		Authorization: getUserFromCookie()?.token ? `Bearer ${getUserFromCookie()?.token}` : ''
	}
})

export default Axios
