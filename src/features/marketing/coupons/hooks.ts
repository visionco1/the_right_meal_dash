import { handleChangeState, hasPermissions } from '@/helpers/helpers'
import { useCreate, useDelete, useFetchData, useShowData, useStatus, useUpdate } from '@/hooks'
import { couponStatusApi, createCouponApi, deleteCouponApi, updateCouponApi } from '@/features/marketing/coupons/api'
import { RootState } from '@/redux/store'
import { useEffect, useRef, useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { getCoupons, showCoupon } from '@/redux/slices/marketing/coupons'
import { TCreateData } from './type'
import { useParams } from 'react-router-dom'

export const useGetCoupons = (params?: any) => {
	const selector = (state: RootState) => state.CouponsReducer
	const { loading, error, data, getPage, onSearch, search } = useFetchData(getCoupons, selector, params)
	return { loading, error, data, getPage, onSearch, search }
}

export const useShowCoupon = () => {
	const selector = (state: RootState) => state.CouponsReducer
	const { showError, showLoading, showResponse, setOpenShowModal, openShowModal, handleOpenShowModal } = useShowData(showCoupon, selector)
	return {
		showError,
		showLoading,
		showResponse,
		openShowModal,
		setOpenShowModal,
		handleOpenShowModal
	}
}

export const useUpdateCoupon = () => {
	const { id } = useParams()
	const selector = (state: RootState) => state.CouponsReducer
	const { updateLoading, handleUpdateData, showResponse, showLoading } = useUpdate({
		updateApi: updateCouponApi,
		showSingleAction: showCoupon,
		selector: selector,
		redirectTo: '/marketing-management/coupons'
	})
	// default values
	const values = {
		name: showResponse?.data?.name,
		code: showResponse?.data?.code,
		discount: showResponse?.data?.discount,
		min_amount: showResponse?.data?.min_amount,
		max_amount: showResponse?.data?.max_amount,
		start_date: showResponse?.data?.start_date,
		end_date: showResponse?.data?.end_date,
		no_of_uses: showResponse?.data?.no_of_uses,
		is_active: showResponse?.data?.is_active,
		outlet_status: showResponse?.data?.outlet_status,
		meal_ids: showResponse?.data?.meals?.map((item: any) => item?.id),
		plan_ids: showResponse?.data?.plans?.map((item: any) => item?.id)
	}
	const [data, setData] = useState<TCreateData>(values)

	useEffect(() => {
		if (showLoading == false) {
			setData(values)
		}
	}, [showLoading, showResponse])

	const handleChange = (key: string, value: any) => {
		handleChangeState(setData, data, key, value)
	}
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const combinedData = {
			...data,
			meal_ids: data?.meal_ids?.some((item: any) => item === 'all') ? 'all' : data?.meal_ids,
			plan_ids: data?.plan_ids?.some((item: any) => item === 'all') ? 'all' : data?.plan_ids
		}
		const combinedValues = {
			...values,
			meal_ids: values?.meal_ids?.some((item: any) => item === 'all') ? 'all' : values?.meal_ids,
			plan_ids: values?.plan_ids?.some((item: any) => item === 'all') ? 'all' : values?.plan_ids
		}
		handleUpdateData(combinedData, combinedValues, id as any)
	}

	return {
		updateLoading,
		handleChange,
		showLoading,
		showResponse,
		data,
		handleSubmit
	}
}

export const useCreateCoupon = () => {
	const { createLoading, handleCreate } = useCreate({
		createApi: createCouponApi,
		redirectTo: '/marketing-management/coupons'
	})
	const [data, setData] = useState<TCreateData>({
		name: '',
		code: '',
		discount: '',
		min_amount: '',
		max_amount: '',
		start_date: '',
		end_date: '',
		no_of_uses: '',
		is_active: false,
		outlet_status: false,
		meal_ids: [],
		plan_ids: []
	})

	const handleChange = (key: string, value: any) => {
		handleChangeState(setData, data, key, value)
	}
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const combined = {
			...data,
			meal_ids: data?.meal_ids?.some((item: any) => item == 'all') ? 'all' : data?.meal_ids,
			plan_ids: data?.plan_ids?.some((item: any) => item == 'all') ? 'all' : data?.plan_ids
		}
		handleCreate(combined, [], true)
	}

	return {
		createLoading,
		handleCreate,
		handleChange,
		handleSubmit,
		data
	}
}

export const useDeleteCoupon = () => {
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDelete({
		deleteApi: deleteCouponApi,
		allAction: getCoupons
	})
	return { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal }
}

export const useChangeCouponStatus = () => {
	const { statusLoading, handleChangeStatusModal, handleOpenStatusModal, openStatusModal, setOpenStatusModal } = useStatus({
		statusApi: couponStatusApi,
		allAction: getCoupons
	})
	return {
		statusLoading,
		handleChangeStatusModal,
		handleOpenStatusModal,
		openStatusModal,
		setOpenStatusModal
	}
}

export const useCouponsHook = () => {
	// fetch all data
	const { loading, error, data, getPage, onSearch, search } = useGetCoupons()
	// delete meal category
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDeleteCoupon()
	// change status
	const { statusLoading, handleChangeStatusModal, handleOpenStatusModal, openStatusModal, setOpenStatusModal } = useChangeCouponStatus()

	const permission = (type: string) => {
		return hasPermissions(data?.data?.permissions, type)
	}
	const tableRef = useRef(null)
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'Coupons',
		sheet: 'Coupons'
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
		deleteLoading,
		handleDelete,
		openDeleteModal,
		setOpenDeleteModal,
		handleDeleteModal,
		onSearch,
		statusLoading,
		handleChangeStatusModal,
		handleOpenStatusModal,
		openStatusModal,
		setOpenStatusModal
	}
}
