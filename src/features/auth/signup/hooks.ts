import Notify from '@/components/ui/custom-toastify'
import { handleChangeState } from '@/helpers/helpers'
import { resetAuth, sendVerificationCode, signupUser } from '@/redux/slices/auth/auth'
import { AppDispatch, RootState } from '@/redux/store'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useSignup = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { userSignUp, loading, error, verificationSent } = useSelector((state: RootState) => state.authReducer)

	const [data, setData] = useState<any>({})
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch(
			signupUser({
				...data,
				avatar: data?.avatar?.[0],
				preferred_locale: 'ar',
				dial_code: data?.phone?.slice(0, data?.phone?.indexOf(' ')),
				device_token: 'mm'
			})
		)
	}
	const handleChange = (key: string, value: any) => {
		handleChangeState(setData, data, key, value)
	}

	if (userSignUp) {
		dispatch(sendVerificationCode())
	}

	useEffect(() => {
		if (error && loading === false) {
			Notify(error, 'error')
			dispatch(resetAuth())
		}
	}, [error, loading])

	return { userSignUp, loading, verificationSent, handleSubmit, handleChange, data }
}
