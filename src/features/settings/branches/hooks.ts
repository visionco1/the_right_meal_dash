import { RootState } from '@/redux/store'
import { branchStatusApi, createBranchApi, deleteBranchApi, updateBranchApi } from '@/features/settings/branches/api'
import { getBranches, showBranch } from '@/redux/slices/settings/branches'
import { useCreate, useDelete, useFetchData, useShowData, useStatus, useUpdate } from '@/hooks'
import { handleChangeState, hasPermissions } from '@/helpers/helpers'
import { useEffect, useRef, useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { TCreateData } from './type'
import { useDispatch, useSelector } from 'react-redux'
import { setAddressInfo } from '@/redux/slices/settings/settings'
import { useParams } from 'react-router-dom'

export const useGetBranches = (params?: any, cached?: boolean) => {
	const selector = (state: RootState) => state.branchesReducer
	const { loading, error, data, getPage, onSearch, search, active_data } = useFetchData(getBranches, selector, params, cached)
	return { loading, error, data, getPage, onSearch, search, active_data }
}

export const useShowBranch = () => {
	const selector = (state: RootState) => state.branchesReducer
	// show single
	const { showLoading, showResponse, openShowModal, setOpenShowModal, handleOpenShowModal } = useShowData(showBranch, selector)

	return { showLoading, showResponse, openShowModal, setOpenShowModal, handleOpenShowModal }
}

export const useUpdateBranch = () => {
	const selector = (state: RootState) => state.branchesReducer
	const dispatch = useDispatch()
	const { id } = useParams()
	const { updateLoading, showLoading, showResponse, handleUpdateData } = useUpdate({
		updateApi: updateBranchApi,
		showSingleAction: showBranch,
		selector: selector,
		allAction: getBranches,
		redirectTo: '/settings/branches'
	})
	// default values
	const values = {
		'name:ar': showResponse?.data?.name?.['ar'],
		'name:en': showResponse?.data?.name?.['en'],
		address: showResponse?.data?.address,
		city_id: showResponse?.data?.city,
		country_id: showResponse?.data?.country,
		state_id: showResponse?.data?.state
	}
	const [data, setData] = useState<TCreateData>(values)
	useEffect(() => {
		if (!showLoading) {
			setData(values)
			dispatch(setAddressInfo({ address: showResponse?.data?.address, lat: 0, lng: 0 }))
		}
	}, [showResponse, showLoading])

	const handleChange = (key: string, value: any) => {
		handleChangeState(setData, data, key, value)
	}
	// handle update branch
	const handleUpdateBranch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleUpdateData(
			{
				...data,
				city_id: data?.city_id?.id,
				country_id: data?.country_id?.id,
				state_id: data?.state_id?.id
			},
			values,
			id as any
		)
	}
	return {
		updateLoading,
		handleUpdateBranch,
		data,
		showLoading,
		showResponse,
		handleChange
	}
}

export const useCreateBranch = () => {
	const selector = (state: RootState) => state.settingsReducer
	const { addressInfo } = useSelector(selector)

	const { createLoading, handleCreate } = useCreate({
		createApi: createBranchApi,
		allAction: getBranches,
		redirectTo: '/settings/branches'
	})
	const [createData, setData] = useState<TCreateData>({
		'name:ar': '',
		'name:en': '',
		address: '',
		country_id: '',
		state_id: '',
		city_id: ''
	})
	const handleChange = (key: string, value: any) => {
		handleChangeState(setData, createData, key, value)
	}
	useEffect(() => {
		if (addressInfo) {
			handleChange('address', addressInfo?.address)
		}
	}, [addressInfo])
	const handleCreateBranch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleCreate({
			...createData,
			city_id: createData?.city_id?.id,
			country_id: createData?.country_id?.id,
			state_id: createData?.state_id?.id
		})
	}
	return { createLoading, handleCreateBranch, handleChange, createData }
}

export const useDeleteBranch = () => {
	const { deleteLoading, handleDelete, setOpenDeleteModal, openDeleteModal, handleDeleteModal } = useDelete({
		deleteApi: deleteBranchApi,
		allAction: getBranches
	})
	return { deleteLoading, handleDelete, setOpenDeleteModal, openDeleteModal, handleDeleteModal }
}

export const useChangeBranchStatus = () => {
	const { statusLoading, handleChangeStatusModal, handleOpenStatusModal, openStatusModal, setOpenStatusModal } = useStatus({
		statusApi: branchStatusApi,
		allAction: getBranches
	})
	return {
		statusLoading,
		handleChangeStatusModal,
		handleOpenStatusModal,
		openStatusModal,
		setOpenStatusModal
	}
}

export const useBranchesHook = () => {
	// fetch all data
	const { loading, error, data, getPage, onSearch, search } = useGetBranches()
	// show
	const { openShowModal, setOpenShowModal, handleOpenShowModal, showLoading, showResponse } = useShowBranch()
	// delete
	const { deleteLoading, handleDelete, setOpenDeleteModal, openDeleteModal, handleDeleteModal } = useDeleteBranch()
	// change status
	const { statusLoading, handleChangeStatusModal, handleOpenStatusModal, openStatusModal, setOpenStatusModal } = useChangeBranchStatus()

	const permission = (type: string) => {
		return hasPermissions(data?.data?.permissions, type)
	}
	const tableRef = useRef(null)
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'branches',
		sheet: 'branches'
	})
	return {
		search,
		loading,
		error,
		data,
		getPage,
		deleteLoading,
		handleDelete,
		statusLoading,
		setOpenDeleteModal,
		openDeleteModal,
		handleDeleteModal,
		onSearch,
		permission,
		tableRef,
		onDownload,
		handleChangeStatusModal,
		handleOpenStatusModal,
		openStatusModal,
		setOpenStatusModal,
		openShowModal,
		setOpenShowModal,
		handleOpenShowModal,
		showLoading,
		showResponse
	}
}
