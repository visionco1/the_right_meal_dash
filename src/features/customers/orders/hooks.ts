import { useRef, useState } from 'react'
import { RootState } from '@/redux/store'
import { handleChangeState, hasPermissions } from '@/helpers/helpers'
import { useFetchData, useShowData } from '@/hooks'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { getOrders, showOrder } from '@/redux/slices/customer/orders'
import { useParams } from 'react-router-dom'
import Notify from '@/components/ui/custom-toastify'
import { assignOrderDayDeliveryApi } from '@/features/customers/subscriptions/api'
import { assignOrderDeliveryApi } from '@/features/customers/orders/api'

export const useGetOrders = (params?: any) => {
	const selector = (state: RootState) => state.OrdersReducer
	const { loading, error, data, getPage, onSearch, search, handleFetch, active_data } = useFetchData(getOrders, selector, params)
	const [filter_data, set_filter_data] = useState<any>({
		order_type: '',
		order_status: '',
		country: '',
		zone: '',
		captin: ''
	})
	// Filter out keys with empty values
	const finalFilters = Object.fromEntries(Object.entries(filter_data).filter(([_, value]) => value))
	const handleChangeFilter = (key: string, value: any) => {
		handleChangeState(set_filter_data, filter_data, key, value)
	}
	const handleSearch = () => {
		handleFetch(finalFilters)
	}
	return { loading, error, data, getPage, onSearch, search, handleChangeFilter, handleSearch, filter_data, active_data }
}

export const useShowOrder = () => {
	const selector = (state: RootState) => state.OrdersReducer
	const { showError, showLoading, showResponse, setOpenShowModal, openShowModal, handleOpenShowModal, handleShow } = useShowData(showOrder, selector)
	return {
		showError,
		showLoading,
		showResponse,
		openShowModal,
		setOpenShowModal,
		handleOpenShowModal,
		handleShow
	}
}

export const useAssignDeliveryToOrder = () => {
	const { id } = useParams()
	const { handleShow } = useShowOrder()

	const handleAssignStatus = async (status: string) => {
		try {
			const response = await assignOrderDeliveryApi(id, { status: status })
			if (response?.data?.success) {
				Notify(response?.data?.message, 'success')
				handleShow(id as any)
			}
			return response?.data
		} catch (error: any) {
			Notify(error, 'error')
			return error
		}
	}
	const handleAssignDelivery = async (delivery_id: ID) => {
		if (id) {
			try {
				const response = await assignOrderDayDeliveryApi({ delivery_id, order_day_id: id })
				Notify(response?.data?.data, 'success')
				if (response?.data?.success) {
					handleShow(id as any)
				}
				return response?.data
			} catch (error: any) {
				Notify(error, 'error')
				return error
			}
		}
	}
	return { handleAssignStatus, handleAssignDelivery }
}

export const useOrdersHook = () => {
	// fetch all data
	const { loading, error, data, getPage, onSearch, search, handleChangeFilter, handleSearch, filter_data } = useGetOrders()
	// show Order
	const { showLoading: singleLoading, showResponse: singleResponse, openShowModal, setOpenShowModal, handleOpenShowModal } = useShowOrder()

	const permission = (type: string) => {
		return hasPermissions(data?.data?.permissions, type)
	}
	const tableRef = useRef(null)
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'Orders',
		sheet: 'Orders'
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
		onSearch,
		singleLoading,
		singleResponse,
		openShowModal,
		setOpenShowModal,
		handleOpenShowModal,
		handleChangeFilter,
		handleSearch,
		filter_data
	}
}
