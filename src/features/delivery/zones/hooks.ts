import { useMapHook } from '@/components/map/hook'
import { createZoneApi, deleteZoneApi, updateZoneApi, ZoneStatusApi } from '@/features/delivery/zones/api'
import { handleChangeState, hasPermissions } from '@/helpers/helpers'
import { useCreate, useDelete, useFetchData, useShowData, useStatus, useUpdate } from '@/hooks'
import { getZones, setRectangleCoords, showZone } from '@/redux/slices/delivery/zones'
import { RootState } from '@/redux/store'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { useParams } from 'react-router-dom'
import { useGetAllCountries } from '../../settings/countries/hooks'
import { useGetStates } from '../../settings/states/hooks'
import { useGetCities } from '../../settings/cities/hooks'
import { useGetBranches } from '../../settings/branches/hooks'
import { useGetAllShifts } from '../delivery-periods/hooks'
import { useDispatch } from 'react-redux'
import { TData } from './type'
import { useTranslation } from 'react-i18next'

export const useGetAllZones = (params?: any, cached?: boolean) => {
	const selector = (state: RootState) => state.zonesReducer
	const { data, loading, error, getPage, onSearch, search, active_data } = useFetchData(getZones, selector, params, cached)
	return { loading, error, data, getPage, onSearch, search, active_data }
}

export const useShowSingleZone = () => {
	const selector = (state: RootState) => state.zonesReducer
	const { id } = useParams()
	const { showLoading, showError, showResponse } = useShowData(showZone, selector)
	return { showLoading, showError, showResponse, id }
}

export const useCreateZone = () => {
	const { createLoading: loading, handleCreate } = useCreate({
		createApi: createZoneApi,
		redirectTo: '/delivery-management/zones'
	})
	const { rectangleCoords } = useMapHook()

	const [data, setData] = useState<any>({
		'name:ar': '',
		'name:en': '',
		city_id: '',
		branch_id: '',
		state_id: '',
		country_id: '',
		delivery_window_ids: [],
		waypoints: rectangleCoords
	})

	const handleChange = (key: string, value: any) => {
		handleChangeState(setData, data, key, value)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const transformedCoords = rectangleCoords?.map(([lat, long]: any) => ({
			lat: lat.toString(),
			long: long.toString()
		}))
		handleCreate({
			...data,
			waypoints: transformedCoords
		})
	}
	return {
		loading,
		handleSubmit,
		data,
		handleChange
	}
}

export const useUpdateZone = () => {
	const selector = (state: RootState) => state.zonesReducer
	const dispatch = useDispatch()
	const { id } = useParams()
	const {
		updateLoading: loading,
		openEditModal,
		setOpenEditModal,
		handleOpenModal,
		showLoading,
		showResponse,
		handleUpdateWithId
	} = useUpdate({
		updateApi: updateZoneApi,
		showSingleAction: showZone,
		selector: selector,
		redirectTo: '/delivery-management/zones'
	})
	const { rectangleCoords } = useMapHook()

	const values = useMemo(
		() => ({
			'name:ar': showResponse?.data?.name?.ar,
			'name:en': showResponse?.data?.name?.en,
			country_id: showResponse?.data?.country?.id,
			branch_id: showResponse?.data?.branch?.id,
			city_id: showResponse?.data?.city?.id,
			state_id: showResponse?.data?.state?.id,
			delivery_window_ids: showResponse?.data?.deliveryWindows?.map((item: any) => item?.id),
			waypoints: rectangleCoords
		}),
		[showResponse, showLoading]
	)
	const [data, setData] = useState<TData>(values)

	useEffect(() => {
		if (showLoading === false) {
			setData(values)
		}
		const waypoints = showResponse?.data?.waypoints
		if (Array.isArray(waypoints)) {
			const reverseTransform = waypoints.map((point: any) => [parseFloat(point.lat), parseFloat(point.long)])
			dispatch(setRectangleCoords(reverseTransform))
		}
	}, [values, showResponse, showLoading])

	const handleChange = (key: string, value: any) => {
		setData((prevState: any) => ({
			...prevState,
			[key]: value
		}))
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const transformedCoords = rectangleCoords?.map(([lat, long]: any) => ({
			lat: lat.toString(),
			long: long.toString()
		}))
		if (id) {
			handleUpdateWithId(id as any, {
				...data,
				waypoints: transformedCoords
			})
		}
	}

	return {
		loading,
		openEditModal,
		setOpenEditModal,
		handleOpenModal,
		handleSubmit,
		values,
		data,
		handleChange,
		showLoading
	}
}

export const useZoneForm = (Hook: any) => {
	const { t } = useTranslation()
	const { loading, handleSubmit, data, handleChange, showLoading } = Hook()
	const { active_data: countries } = useGetAllCountries({ is_paginated: 0 })
	const { active_data: states } = useGetStates({ is_paginated: 0, country_id: data?.country_id })
	const { active_data: cities } = useGetCities({ is_paginated: 0, state_id: data?.state_id })
	const { active_data: branches } = useGetBranches({ is_paginated: 0 })
	const { active_data: periods } = useGetAllShifts({ is_paginated: 0 })
	const { handlePlaceChange } = useMapHook()
	const handleChangeCountry = (e: any) => {
		handleChange('country_id', e?.id)
		handlePlaceChange(e?.localized_name)
	}
	const handleChangeState = (e: any) => {
		handleChange('state_id', e?.id)
		handlePlaceChange(e?.localized_name)
	}
	const handleChangeCity = (e: any) => {
		handleChange('city_id', e?.id)
		handlePlaceChange(e?.localized_name)
	}
	const handleChangeBranch = (e: any) => {
		handleChange('branch_id', e?.id)
	}
	const handleChangePeriods = (e: any) => {
		handleChange(
			'delivery_window_ids',
			e?.map((item: any) => item?.id)
		)
	}
	return {
		handleChange,
		handleSubmit,
		loading,
		showLoading,
		data,
		handleChangeBranch,
		handleChangeCity,
		handleChangeCountry,
		handleChangePeriods,
		countries,
		cities,
		states,
		t,
		branches,
		periods,
		handleChangeState
	}
}

export const useDeleteZone = () => {
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDelete({
		deleteApi: deleteZoneApi,
		allAction: getZones
	})

	return { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal }
}

export const useChangeZoneStatus = () => {
	const { statusLoading, handleChangeStatusModal, handleOpenStatusModal, openStatusModal, setOpenStatusModal } = useStatus({
		statusApi: ZoneStatusApi as any,
		allAction: getZones
	})
	return {
		statusLoading,
		handleChangeStatusModal,
		handleOpenStatusModal,
		openStatusModal,
		setOpenStatusModal
	}
}

export const useZoneHook = () => {
	const { loading, error, data, getPage, onSearch, search } = useGetAllZones()
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDeleteZone()
	const { statusLoading, handleChangeStatusModal, handleOpenStatusModal, openStatusModal, setOpenStatusModal } = useChangeZoneStatus()
	const { showLoading, showError, showResponse } = useShowSingleZone()

	const permission = (type: string) => {
		return hasPermissions(data?.data?.permissions, type)
	}
	const tableRef = useRef(null)
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'shifts',
		sheet: 'shifts'
	})
	return {
		loading,
		error,
		data,
		getPage,
		onSearch,
		search,
		alert,
		handleDelete,
		showLoading,
		showError,
		showResponse,
		openDeleteModal,
		setOpenDeleteModal,
		handleDeleteModal,
		deleteLoading,
		permission,
		onDownload,
		statusLoading,
		handleChangeStatusModal,
		handleOpenStatusModal,
		openStatusModal,
		setOpenStatusModal
	}
}
