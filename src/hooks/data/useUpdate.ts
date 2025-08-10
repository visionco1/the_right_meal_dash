import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect, useCallback } from 'react'
import { AppDispatch, RootState } from '@/redux/store'
import Notify from '@/components/ui/custom-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { filterUpdatedData } from '@/helpers/helpers'

type UpdateDataParams = {
	selector: (state: RootState) => any
	showSingleAction?: (id: ID) => any
	redirectTo?: string
	updateApi?: any
	showSingleApi?: any
	allAction?: any
	sideActions?: () => void
}

const useUpdate = ({ selector, showSingleAction, redirectTo, updateApi, allAction, sideActions }: UpdateDataParams) => {
	const Navigate = useNavigate()
	const { id: params_id }: any = useParams()
	const dispatch = useDispatch<AppDispatch>()
	const { showResponse, showLoading } = useSelector(selector)

	const [openEditModal, setOpenEditModal] = useState<boolean>(false)
	const [id, setId] = useState<ID>()

	const [updateLoading, setLoading] = useState<boolean>(false)

	const updateAction = async (id: ID, data: any) => {
		try {
			setLoading(true)
			const response = await updateApi(id, data)
			setLoading(false)
			Notify(response?.data?.message, 'success')
			if (response?.data?.success) {
				setOpenEditModal(false)
				if (!redirectTo) {
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
			setLoading(false)
			Notify(error, 'error')
			return
		}
	}

	const handleUpdateWithId = async (id: ID, data: any) => {
		updateAction(id, data)
	}

	const handleUpdate = async (data: any) => {
		try {
			setLoading(true)
			const response = await updateApi(data)
			setLoading(false)
			Notify(response?.data?.message, 'success')
			if (response?.data?.success) {
				setOpenEditModal(false)
				if (!redirectTo) {
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
			setLoading(false)
			Notify(error, 'error')
			return
		}
	}

	const handleUpdateData = (data: Record<string, any>, values: Record<string, any>, Id?: ID) => {
		// If there are any differences, send the data for update
		const updatedData = filterUpdatedData(data, values)
		// console.log(updatedData)
		if (Object.keys(updatedData).length > 0) {
			if (Id) {
				handleUpdateWithId(Id, updatedData)
			} else if (id) {
				handleUpdateWithId(id, updatedData)
			} else {
				handleUpdate(updatedData)
			}
		} else {
			Notify('Change something to update', 'warning')
		}
	}

	useEffect(() => {
		if (showSingleAction && params_id) {
			dispatch(showSingleAction(params_id))
		}
	}, [params_id, showSingleAction])

	const handleOpenModal = useCallback((id: ID) => {
		setOpenEditModal(true)
		if (showSingleAction) {
			dispatch(showSingleAction(id))
		}
		setId(id)
	}, [])

	return {
		showResponse,
		showLoading,
		updateLoading,
		handleUpdate,
		openEditModal,
		setOpenEditModal,
		handleOpenModal,
		handleUpdateData,
		handleUpdateWithId
	}
}
export default useUpdate
