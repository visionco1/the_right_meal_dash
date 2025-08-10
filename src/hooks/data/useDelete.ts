import { useCallback, useState } from 'react'
import Notify from '@/components/ui/custom-toastify'
import { AppDispatch } from '@/redux/store'
import { useDispatch } from 'react-redux'

type DeleteDataParams = {
	deleteApi: any
	allAction?: any
}

const useDelete = ({ deleteApi, allAction }: DeleteDataParams) => {
	const dispatch = useDispatch<AppDispatch>()
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
	const [id, setId] = useState<string | number>()
	const [deleteLoading, setLoading] = useState<boolean>(false)
	const [response, setResponse] = useState<any>(null)

	const handleDelete = async () => {
		if (id) {
			if (id) {
				try {
					setLoading(true)
					const response = await deleteApi(id)
					setLoading(false)
					if (response?.data?.success) {
						Notify(response?.data?.message, 'success')
						setResponse(response)
						setOpenDeleteModal(false)
						if (allAction) {
							dispatch(allAction())
						}
					} else {
						Notify('There is a problem', 'error')
					}
					return response?.data
				} catch (error: any) {
					Notify(error, 'error')
					setLoading(false)
					return
				}
			}
		}
	}

	const handleDeleteModal = useCallback((Id: number) => {
		setOpenDeleteModal(true)
		setId(Id)
	}, [])

	return { deleteLoading, handleDelete, handleDeleteModal, openDeleteModal, setOpenDeleteModal, response }
}
export default useDelete
