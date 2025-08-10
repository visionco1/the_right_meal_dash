import { useCallback, useState } from 'react'
import Notify from '@/components/ui/custom-toastify'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'

type ChangeStatusParams = {
	statusApi: any
	allAction: any
}
const useStatus = ({ statusApi, allAction }: ChangeStatusParams) => {
	const dispatch = useDispatch<AppDispatch>()
	const [id, setId] = useState<ID>()
	const [openStatusModal, setOpenStatusModal] = useState<boolean>(false)
	const [statusLoading, setLoading] = useState<boolean>(false)
	const [response, setResponse] = useState<any>(null)

	const statusAction = async (id: ID) => {
		try {
			setLoading(true)
			setResponse(null)
			const response = await statusApi(id)
			setLoading(false)
			setResponse(response?.data)
			if (response?.data?.success) {
				Notify(response?.data?.message, 'success')
				setOpenStatusModal(false)
				await dispatch(allAction())
			}
			return response?.data
		} catch (error: any) {
			Notify(error, 'error')
			setLoading(false)
			return
		}
	}

	const handleChangeStatus = async (id: ID) => {
		console.log(id, 'id')
		if (id) {
			statusAction(id)
		}
	}

	const handleChangeStatusModal = async () => {
		if (id) {
			statusAction(id)
		}
	}

	const handleOpenStatusModal = useCallback((id: ID) => {
		setOpenStatusModal(true)
		setId(id)
	}, [])

	return {
		handleChangeStatus,
		statusLoading,
		openStatusModal,
		setOpenStatusModal,
		handleChangeStatusModal,
		handleOpenStatusModal
	}
}
export default useStatus
