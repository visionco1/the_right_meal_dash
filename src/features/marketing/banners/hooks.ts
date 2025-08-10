import { handleChangeState, hasPermissions } from '@/helpers/helpers'
import { useCreate, useDelete, useFetchData, useShowData, useStatus, useUpdate } from '@/hooks'
import { BannerStatusApi, createBannerApi, deleteBannerApi, updateBannerApi } from '@/features/marketing/banners/api'
import { RootState } from '@/redux/store'
import { useEffect, useRef, useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { getBanners, showBanner } from '@/redux/slices/marketing/banners'
import { TCreateData } from './type'

export const useGetBanners = (params?: any) => {
	const selector = (state: RootState) => state.BannersReducer
	const { loading, error, data, getPage, onSearch, search } = useFetchData(getBanners, selector, params)
	return { loading, error, data, getPage, onSearch, search }
}

export const useShowBanner = () => {
	const selector = (state: RootState) => state.BannersReducer
	const { showError, showLoading, showResponse, setOpenShowModal, openShowModal, handleOpenShowModal } = useShowData(showBanner, selector)
	return {
		showError,
		showLoading,
		showResponse,
		openShowModal,
		setOpenShowModal,
		handleOpenShowModal
	}
}

export const useUpdateBanner = () => {
	const selector = (state: RootState) => state.BannersReducer
	const { updateLoading, openEditModal, setOpenEditModal, handleOpenModal, handleUpdateData, showResponse, showLoading } = useUpdate({
		updateApi: updateBannerApi,
		showSingleAction: showBanner,
		selector: selector,
		allAction: getBanners
	})
	// default values
	const values = {
		'title:ar': showResponse?.data?.title?.ar,
		'title:en': showResponse?.data?.title?.en,
		link: showResponse?.data?.link,
		image: showResponse?.data?.image?.url,
		date_from: showResponse?.data?.date_from,
		date_to: showResponse?.data?.date_to
	}
	const [updateData, setData] = useState<TCreateData>(values)

	useEffect(() => {
		if (showLoading == false) {
			setData(values)
		}
	}, [showLoading, showResponse])

	const handleUpdate = (key: string, value: any) => {
		handleChangeState(setData, updateData, key, value)
	}
	const handleUpdateBanner = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleUpdateData(updateData, values as any)
	}
	return {
		updateLoading,
		handleUpdate,
		openEditModal,
		setOpenEditModal,
		handleOpenModal,
		showLoading,
		showResponse,
		updateData,
		handleUpdateBanner
	}
}

export const useCreateBanner = () => {
	const { createLoading, handleCreate, openModal, setOpenModal } = useCreate({
		createApi: createBannerApi,
		allAction: getBanners
	})
	const [data, setData] = useState<TCreateData>({
		'title:ar': '',
		'title:en': '',
		link: '',
		image: null,
		date_from: '',
		date_to: ''
	})

	useEffect(() => {
		if (!openModal) {
			setData({
				'title:ar': '',
				'title:en': '',
				link: '',
				image: null,
				date_from: '',
				date_to: ''
			})
		}
	}, [openModal])

	const handleChange = (key: string, value: any) => {
		handleChangeState(setData, data, key, value)
	}
	const handleCreateBanner = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleCreate(data, ['link'])
	}
	return {
		createLoading,
		handleCreate,
		handleChange,
		openModal,
		setOpenModal,
		handleCreateBanner,
		data
	}
}

export const useDeleteBanner = () => {
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDelete({
		deleteApi: deleteBannerApi,
		allAction: getBanners
	})
	return { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal }
}

export const useChangeBannerStatus = () => {
	const { statusLoading, handleChangeStatusModal, handleOpenStatusModal, openStatusModal, setOpenStatusModal } = useStatus({
		statusApi: BannerStatusApi,
		allAction: getBanners
	})
	return {
		statusLoading,
		handleChangeStatusModal,
		handleOpenStatusModal,
		openStatusModal,
		setOpenStatusModal
	}
}

export const useBannersHook = () => {
	// fetch all data
	const { loading, error, data, getPage, onSearch, search } = useGetBanners()
	// show banner
	const { showLoading: singleLoading, showResponse: singleResponse, openShowModal, setOpenShowModal, handleOpenShowModal } = useShowBanner()
	// create a meal category
	const { createLoading, handleChange, openModal, setOpenModal, handleCreateBanner, data: createData } = useCreateBanner()
	// update a meal category
	const { updateLoading, handleUpdate, openEditModal, setOpenEditModal, handleOpenModal, showLoading, showResponse, updateData, handleUpdateBanner } = useUpdateBanner()
	// delete meal category
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDeleteBanner()
	// change status
	const { statusLoading, handleChangeStatusModal, handleOpenStatusModal, openStatusModal, setOpenStatusModal } = useChangeBannerStatus()

	const permission = (type: string) => {
		return hasPermissions(data?.data?.permissions, type)
	}
	const tableRef = useRef(null)
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'Banners',
		sheet: 'Banners'
	})

	return {
		tableRef,
		search,
		onDownload,
		permission,
		loading,
		error,
		data,
		getPage,
		showLoading,
		showResponse,
		createLoading,
		openModal,
		setOpenModal,
		updateLoading,
		handleUpdate,
		openEditModal,
		setOpenEditModal,
		handleOpenModal,
		deleteLoading,
		handleDelete,
		updateData,
		openDeleteModal,
		handleChange,
		handleCreateBanner,
		setOpenDeleteModal,
		handleDeleteModal,
		handleUpdateBanner,
		onSearch,
		statusLoading,
		handleChangeStatusModal,
		handleOpenStatusModal,
		openStatusModal,
		setOpenStatusModal,
		createData,
		singleLoading,
		singleResponse,
		openShowModal,
		setOpenShowModal,
		handleOpenShowModal
	}
}
