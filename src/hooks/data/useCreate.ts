import { useEffect, useState } from 'react'
import Notify from '@/components/ui/custom-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { filterEmptyKeys, handleChangeState, resetState } from '@/helpers/helpers'

type CreateDataParams = {
	createApi?: any
	redirectTo?: string
	allAction?: any
	sideActions?: () => void
	setData?: React.Dispatch<React.SetStateAction<any>>
	data?: any
}

const useCreate = ({ createApi, redirectTo, allAction, sideActions, data, setData }: CreateDataParams) => {
	const Navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>()
	const [openModal, setOpenModal] = useState<boolean>(false)
	const [createLoading, setLoading] = useState<boolean>(false)
	const [createResponse, setResponse] = useState<any>(null)
	const handleChange = (key: string, value: any) => {
		if (setData && data) {
			handleChangeState(setData, data, key, value)
		}
	}
	useEffect(() => {
		if (!openModal && setData && data) {
			resetState(data, setData)
		}
	}, [openModal])
	// Handle creation of data
	const create = async (data: any) => {
		try {
			setLoading(true)
			setResponse(null)
			const response = await createApi(data)
			setLoading(false)
			setResponse(response?.data)
			Notify(response?.data?.message, 'success')
			if (response?.data?.success) {
				setOpenModal(false)
				if (allAction) {
					await dispatch(allAction())
				}
				if (redirectTo) {
					Navigate(redirectTo)
				}
				if (sideActions) {
					sideActions()
				}
			}
			return response?.data
		} catch (error: any) {
			Notify(error, 'error')
			setLoading(false)
			return
		}
	}

	const handleCreate = async (data: any, excludeKeys: string[] = [], skipValidation = false) => {
		// If skipValidation is true, bypass all validation and dispatch action

		if (skipValidation) {
			const Data = filterEmptyKeys(data)
			create(Data)
			return
		}
		// Iterate through all keys in the `data` object
		for (const key in data) {
			if (Object.prototype.hasOwnProperty.call(data, key)) {
				// Skip validation if the key is in the excludeKeys array
				if (excludeKeys?.includes(key)) {
					continue
				}
				// Check if the value is empty (you can extend this check as needed)
				if (!data[key]) {
					Notify(`Please fill the ${key}`, 'warning')
					return // Stop further execution if validation fails
				}
			}
		}
		create(data)
	}

	return { createLoading, handleCreate, openModal, setOpenModal, createResponse, create, handleChange }
}
export default useCreate
