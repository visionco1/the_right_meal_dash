import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import { AppDispatch, RootState } from '@/redux/store'

const useShowData = (action: (id: ID) => any, selector: (state: RootState) => any) => {
	const { id }: any = useParams()
	const dispatch = useDispatch<AppDispatch>()
	const [openShowModal, setOpenShowModal] = useState<boolean>(false)
	const { showLoading, showError, showResponse } = useSelector(selector)

	const memoizedShowData = useMemo(() => {
		return (id: ID) => dispatch(action(id))
	}, [dispatch, action])

	useEffect(() => {
		if (id) {
			memoizedShowData(id)
		}
	}, [id, memoizedShowData])

	const handleOpenShowModal = (id: ID) => {
		setOpenShowModal(true)
		memoizedShowData(id)
	}
	const handleShow = (id: ID) => {
		memoizedShowData(id)
	}

	return {
		showLoading,
		showError,
		showResponse,
		openShowModal,
		setOpenShowModal,
		handleOpenShowModal,
		handleShow
	}
}
export default useShowData
