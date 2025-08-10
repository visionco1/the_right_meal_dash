// import jwtDecode from 'jwt-decode'
import Notify from '@/components/ui/custom-toastify'
import Axios from './Axios'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useTranslation } from 'react-i18next'

// intercepting to capture errors
const AUTH_SESSION_KEY = 'right_meal_user'
Axios.interceptors.response.use(
	response => {
		return response
	},
	error => {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		let message

		if (error && error.response && error.response.status === 404) {
			// window.location.href = '/not-found';
		} else if (error && error.response && error.response.status === 403) {
			window.location.href = '/access-denied'
		} else {
			switch (error.response.status) {
				case 401:
					message = 'Invalid credentials'
					Notify(message, 'error')
					Cookies.remove(AUTH_SESSION_KEY)
					window.location.href = '/'
					break
				case 403:
					message = 'Access Forbidden'
					break
				case 404:
					message = 'Sorry! the data you are looking for could not be found'
					break
				default: {
					message = error.response && error.response.data ? error.response.data['message'] : error.message || error
				}
			}
			return Promise.reject(message)
		}
	}
)
// Use an Axios request interceptor to dynamically set the Authorization header

// Sets the default authorization
//  @param {*} token

class APICore {
	// Fetches data from given url
	get = (url: string, params?: any) => {
		let response
		if (params) {
			const queryString = params
				? Object.keys(params)
						.map(key => key + '=' + params[key])
						.join('&')
				: ''
			response = Axios.get(`${url}?${queryString}`, params)
		} else {
			response = Axios.get(`${url}`, params)
		}
		return response
	}

	getFile = (url: string, params: any) => {
		let response
		if (params) {
			const queryString = params
				? Object.keys(params)
						.map(key => key + '=' + params[key])
						.join('&')
				: ''
			response = Axios.get(`${url}?${queryString}`, { responseType: 'blob' })
		} else {
			response = Axios.get(`${url}`, { responseType: 'blob' })
		}
		return response
	}

	getMultiple = (urls: string, params: any) => {
		const reqs = []
		let queryString = ''
		if (params) {
			queryString = params
				? Object.keys(params)
						.map(key => key + '=' + params[key])
						.join('&')
				: ''
		}

		for (const url of urls) {
			reqs.push(Axios.get(`${url}?${queryString}`))
		}
		return axios.all(reqs)
	}

	//post given data to url
	create = (url: string, data?: any) => {
		return Axios.post(url, data)
	}

	// Updates patch data
	updatePatch = (url: string, data: any) => {
		return Axios.patch(url, data)
	}
	// post given data to url with file
	updatePatchWithFile = (url: string, data: any) => {
		const formData = new FormData()
		for (const k in data) {
			formData.append(k, data[k])
		}

		const config = {
			headers: {
				...Axios.defaults.headers,
				'content-type': 'multipart/form-data'
			}
		}
		return Axios.patch(url, formData, config as any)
	}
	// Updates data
	update = (url: string, data: any) => {
		return Axios.put(url, data)
	}

	// Deletes data
	delete = (url: string) => {
		return Axios.delete(url)
	}

	// post given data to url with file
	createWithFile = (url: string, data: any) => {
		const formData = new FormData()
		for (const k in data) {
			formData.append(k, data[k])
		}

		const config = {
			headers: {
				...Axios.defaults.headers,
				'content-type': 'multipart/form-data'
			}
		}
		return Axios.post(url, formData, config as any)
	}

	// post given data to url with file
	updateWithFile = (url: string, data: any) => {
		const formData = new FormData()
		for (const k in data) {
			formData.append(k, data[k])
		}

		const config = {
			headers: {
				...Axios.defaults.headers,
				'content-type': 'multipart/form-data'
			}
		}
		return Axios.put(url, formData, config as any)
	}

	isUserAuthenticated = () => {
		const user = this.getLoggedInUser()
		if (!user) {
			return false
		} else {
			return true
		}
		// if(user?.token){
		// 	const decoded: any = jwtDecode(user?.token)
		// 	const currentTime = Date.now() / 1000
		// 	if (decoded.exp < currentTime) {
		// 		console.warn('access token expired')
		// 		return false
		// 	} else {
		// 		return true
		// 	}
		// }
	}

	setLoggedInUser = (session: any) => {
		try {
			if (session) {
				Cookies.set(AUTH_SESSION_KEY, JSON.stringify(session))
				// sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session))
			} else {
				Cookies.remove(AUTH_SESSION_KEY)
				// sessionStorage.removeItem(AUTH_SESSION_KEY)
			}
		} catch (e) {
			return
		}
	}

	getUserFromCookie = () => {
		// const user = sessionStorage.getItem(AUTH_SESSION_KEY)
		const user = Cookies.get(AUTH_SESSION_KEY)
		return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null
	}

	// set authorization
	setAuthorization = (token: string | null) => {
		// if (token) Axios.defaults.headers.common['Authorization'] = 'JWT ' + token
		if (token) Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
		else delete Axios.defaults.headers.common['Authorization']
	}

	// Returns the logged in user
	getLoggedInUser = () => {
		return this.getUserFromCookie()
	}

	setUserInSession = (modifiedUser: any) => {
		// const userInfo = sessionStorage.getItem(AUTH_SESSION_KEY)
		const userInfo = Cookies.get(AUTH_SESSION_KEY)
		if (userInfo) {
			const { token, user } = JSON.parse(userInfo)
			this.setLoggedInUser({ token, ...user, ...modifiedUser })
		}
	}
}

// Check if token available in session

const api = new APICore()
const user = api.getUserFromCookie()

if (user) {
	const { token } = user
	if (token) {
		api.setAuthorization(token)
	}
}
export { APICore }
