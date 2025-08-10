import { resetAuth, verifyCode, forgotPassword, passwordVerifyCode, resetPassword } from '@/redux/slices/auth/auth'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { APICore } from '@/helpers/api/apiCore'
import { useLocation } from 'react-router-dom'
import Notify from '@/components/ui/custom-toastify'
import Cookies from 'js-cookie'
import { login, logout } from '@/helpers'
import { handleChangeState } from '@/helpers/helpers'

export const useConfirmEmailHook = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { verifiedUser, loading, error } = useSelector((state: RootState) => state.authReducer)
	const [data, setData] = useState<any>({})
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch(verifyCode(data))
	}
	const handleChange = (key: string, value: any) => {
		handleChangeState(setData, data, key, value)
	}
	const location = useLocation()
	const redirectUrl = location?.search?.slice(6) || '/'
	const api = new APICore()
	const loggedInUser = api.getLoggedInUser()

	useEffect(() => {
		if (error && loading === false) {
			Notify(error, 'error')
			dispatch(resetAuth())
		}
	}, [error, loading])

	return { verifiedUser, loading, handleSubmit, redirectUrl, loggedInUser, handleChange, data }
}

export const useLoginHook = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<any>(null)
	const [response, setResponse] = useState<any>(null)
	// handle form submission
	const [data, setData] = useState<{ username: string; password: string }>({
		username: '',
		password: ''
	})
	const handleChange = (key: string, value: any) => {
		handleChangeState(setData, data, key, value)
	}
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (data?.username == '' || data?.password == '') {
			Notify('Please fill the data', 'warning')
		} else {
			try {
				setLoading(true)
				setError(null)
				const response = await login(data)
				const api = new APICore()
				const res = response?.data
				setResponse(res)
				api.setAuthorization(res.token)
				api.setLoggedInUser(res)
				setLoading(false)
				return res
			} catch (error: any) {
				setLoading(false)
				setResponse(null)
				setError(error)
				Notify(error, 'error')
				return error
			}
		}
	}

	const location = useLocation()
	useEffect(() => {
		if (response?.success && loading == false) {
			window.location.pathname = location?.search?.slice(6) || '/'
		}
	}, [loading, response])

	const redirectUrl = location?.search?.slice(6) || '/'

	return { response, loading, error, onSubmit, redirectUrl, handleChange, data }
}

export const useLogoutHook = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [response, setResponse] = useState<any>(null)

	const logoutFn = async () => {
		try {
			setLoading(true)
			const res = await logout()
			const api = new APICore()
			api.setAuthorization(null)
			api.setLoggedInUser(null)
			setResponse(res)
			setLoading(false)
		} catch (error: any) {
			setResponse(null)
			setLoading(false)
			Notify(error, error)
		}
	}

	useEffect(() => {
		logoutFn()
	}, [])

	useEffect(() => {
		if (response?.data?.success && loading == false) {
			Notify('Logged Out', 'success')
		}
	}, [loading])
}

export const useRecoverPassword = () => {
	const { passwordCodeSent, forgotPasswordResponse, loading, error } = useSelector((state: RootState) => state.authReducer)
	const dispatch = useDispatch<AppDispatch>()
	const redirectUrl = '/auth/verify-code'

	const [data, setData] = useState<any>({})
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		Cookies.set('emailSent', data.username)
		dispatch(forgotPassword(data.username))
	}
	const handleChange = (key: string, value: any) => {
		handleChangeState(setData, data, key, value)
	}

	useEffect(() => {
		if (loading == false && passwordCodeSent && forgotPasswordResponse) {
			Notify(forgotPasswordResponse?.message, 'success')
			dispatch(resetAuth())
		} else if (loading == false && passwordCodeSent == false && error) {
			Cookies.remove('emailSent')
			Notify(error, 'error')
			dispatch(resetAuth())
		}
	}, [loading, passwordCodeSent, forgotPasswordResponse])

	return { loading, passwordCodeSent, handleChange, handleSubmit, data, redirectUrl }
}

export const usePasswordVerifyCodeHook = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { passwordVerifyCodeResponse: response, loading, error, passwordCodeVerified } = useSelector((state: RootState) => state.authReducer)
	const [data, setData] = useState<any>({})
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const email = Cookies.get('emailSent')
		dispatch(passwordVerifyCode({ username: email, ...data }))
	}
	const handleChange = (key: string, value: any) => {
		handleChangeState(setData, data, key, value)
	}

	const redirectUrl = '/auth/reset-password'
	const api = new APICore()
	const loggedInUser = api.getLoggedInUser()

	useEffect(() => {
		if (loading == false && response && passwordCodeVerified) {
			Cookies.remove('emailSent')
			Notify(response?.message, 'success')
		} else if (error && loading === false && passwordCodeVerified == false) {
			Notify(error, 'error')
			dispatch(resetAuth())
		}
	}, [error, loading, response, passwordCodeVerified])

	return { response, loading, handleSubmit, handleChange, data, redirectUrl, loggedInUser }
}

export const useResetPassword = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { passwordVerifyCodeResponse, loading, error, passwordResetSuccess, resetPasswordResponse: response }: any = useSelector((state: RootState) => state.authReducer)

	const [data, setData] = useState<any>({})
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch(resetPassword({ token: passwordVerifyCodeResponse?.data?.reset_token, ...data }))
	}
	const handleChange = (key: string, value: any) => {
		handleChangeState(setData, data, key, value)
	}

	const redirectUrl = '/auth/login'
	const api = new APICore()
	const loggedInUser = api.getLoggedInUser()

	useEffect(() => {
		if (loading == false && response && passwordResetSuccess) {
			Notify(response?.message, 'success')
			dispatch(resetAuth())
		} else if (error && loading === false && passwordResetSuccess == false) {
			Notify(error, 'error')
			dispatch(resetAuth())
		}
	}, [error, loading, response, passwordResetSuccess])

	return { response, loading, handleChange, handleSubmit, data, redirectUrl, passwordResetSuccess }
}
