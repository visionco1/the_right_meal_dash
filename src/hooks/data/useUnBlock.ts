import { useDispatch } from 'react-redux'
import { useCallback, useState } from 'react'
import { AppDispatch } from '@/redux/store'
import Notify from '@/components/ui/custom-toastify'

type ChangeStatusParams = {
	unblockApi: any
	allAction: any
}

const useUnBlock = ({ unblockApi, allAction }: ChangeStatusParams) => {
	const dispatch = useDispatch<AppDispatch>()
	const [id, setId] = useState<ID>()
	const [unblockLoading, setLoading] = useState<boolean>(false)
	const [openUnBlockModal, setOpenUnBlockModal] = useState<boolean>(false)

	const unBlockAction = async (id: ID) => {
		try {
			setLoading(true)
			const response = await unblockApi(id)
			setLoading(false)
			Notify(response?.data?.message, 'success')
			if (response?.data?.success) {
				setOpenUnBlockModal(false)
				await dispatch(allAction())
			}
			return response?.data
		} catch (error: any) {
			Notify(error, 'error')
			setLoading(false)
			return
		}
	}

	const handleUnBlock = (id: ID) => {
		if (id) {
			if (id) {
				unBlockAction(id)
			}
		}
	}

	const handleUnBlockModal = () => {
		if (id) {
			if (id) {
				unBlockAction(id)
			}
		}
	}

	const handleOpenUnBlockModal = useCallback((id: ID) => {
		setOpenUnBlockModal(true)
		setId(id)
	}, [])

	return {
		unblockLoading,
		handleUnBlock,
		openUnBlockModal,
		setOpenUnBlockModal,
		handleOpenUnBlockModal,
		handleUnBlockModal
	}
}
export default useUnBlock
