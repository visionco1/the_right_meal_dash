import { useDispatch } from 'react-redux'
import { useCallback, useState } from 'react'
import { AppDispatch } from '@/redux/store'
import Notify from '@/components/ui/custom-toastify'

type ChangeStatusParams = {
	blockApi: any
	allAction: any
}

const useBlock = ({ blockApi, allAction }: ChangeStatusParams) => {
	const dispatch = useDispatch<AppDispatch>()
	const [id, setId] = useState<ID>()
	const [openBlockModal, setOpenBlockModal] = useState<boolean>(false)
	const [blockLoading, setLoading] = useState<boolean>(false)

	const blockAction = async (id: ID) => {
		try {
			setLoading(true)
			const response = await blockApi(id)
			setLoading(false)
			Notify(response?.data?.message, 'success')
			if (response?.data?.success) {
				setOpenBlockModal(false)
				await dispatch(allAction())
			}
			return response?.data
		} catch (error: any) {
			Notify(error, 'error')
			setLoading(false)
			return
		}
	}

	const handleBlock = async (id: ID) => {
		if (id) {
			if (id) {
				blockAction(id)
			}
		}
	}

	const handleBlockModal = async () => {
		if (id) {
			if (id) {
				blockAction(id)
			}
		}
	}

	const handleOpenBlockModal = useCallback((id: ID) => {
		setOpenBlockModal(true)
		setId(id)
	}, [])

	return {
		blockLoading,
		handleBlock,
		handleBlockModal,
		handleOpenBlockModal,
		openBlockModal,
		setOpenBlockModal
	}
}
export default useBlock
