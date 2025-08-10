import { RootState } from '@/redux/store'
import { useParams } from 'react-router-dom'
import { getCities, showCity } from '@/redux/slices/settings/cities'
import { cityStatusApi, createCityApi, deleteCityApi, updateCityApi } from '@/features/settings/cities/api'
import { useCreate, useDelete, useFetchData, useStatus, useUpdate } from '@/hooks'
import { handleChangeState, hasPermissions } from '@/helpers/helpers'
import { useEffect, useRef, useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'

export const useGetCities = (params?: any, cached?: boolean) => {
	const selector = (state: RootState) => state.citiesReducer
	const { loading, error, data, getPage, onSearch, search, active_data } = useFetchData(getCities, selector, params, cached)
	const { state_id } = useParams()
	const onSearchCity = (e: string) => {
		onSearch(e, { state_id: state_id })
	}
	return { loading, error, data, getPage, onSearchCity, search, active_data }
}

export const useUpdateCity = () => {
	const selector = (state: RootState) => state.citiesReducer
	const { state_id } = useParams()
	const { updateLoading, showLoading, showResponse, handleUpdateData, openEditModal, setOpenEditModal, handleOpenModal } = useUpdate({
		updateApi: updateCityApi,
		showSingleAction: showCity,
		selector: selector,
		allAction: () => getCities({ state_id: state_id as any })
	})
	// default values
	const values = {
		'name:ar': showResponse?.data?.name?.['ar'],
		'name:en': showResponse?.data?.name?.['en']
	}
	const [updatedData, setData] = useState<any>(values)
	const handleChange = (key: string, value: any) => {
		handleChangeState(setData, updatedData, key, value)
	}
	useEffect(() => {
		if (!showLoading) {
			setData(values)
		}
	}, [showLoading, showResponse])

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleUpdateData(updatedData, values)
	}
	return {
		updateLoading,
		handleSubmit,
		openEditModal,
		setOpenEditModal,
		handleOpenModal,
		showLoading,
		showResponse,
		updatedData,
		handleChange
	}
}

export const useCreateCity = () => {
	const [data, setData] = useState<any>({
		'name:ar': '',
		'name:en': ''
	})
	const { state_id } = useParams()
	const { createLoading, handleCreate, openModal, setOpenModal, handleChange } = useCreate({
		createApi: createCityApi,
		allAction: () => getCities({ state_id: state_id as any }),
		data: data,
		setData: setData
	})
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleCreate({ ...data, state_id })
	}
	return { createLoading, handleSubmit, handleChange, openModal, setOpenModal, data }
}

export const useDeleteCity = () => {
	const { state_id } = useParams()
	const { deleteLoading, handleDelete, setOpenDeleteModal, openDeleteModal, handleDeleteModal } = useDelete({
		deleteApi: deleteCityApi,
		allAction: () => getCities({ state_id: state_id as any })
	})
	return { deleteLoading, handleDelete, setOpenDeleteModal, openDeleteModal, handleDeleteModal }
}

export const useCitiesHook = () => {
	const { id: country_id, state_id } = useParams()
	// fetch all data
	const { loading, error, data, getPage, onSearchCity, search } = useGetCities({
		state_id: state_id
	})
	// delete
	const { deleteLoading, handleDelete, setOpenDeleteModal, openDeleteModal, handleDeleteModal } = useDeleteCity()
	// change status
	const { statusLoading, handleChangeStatusModal, handleOpenStatusModal, openStatusModal, setOpenStatusModal } = useStatus({
		statusApi: cityStatusApi,
		allAction: () => getCities({ state_id: state_id as any })
	})
	const permission = (type: string) => {
		return hasPermissions(data?.data?.permissions, type)
	}
	const tableRef = useRef(null)
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'cities',
		sheet: 'cities'
	})
	return {
		tableRef,
		search,
		onDownload,
		onSearchCity,
		permission,
		setOpenDeleteModal,
		openDeleteModal,
		handleDeleteModal,
		country_id,
		state_id,
		loading,
		error,
		data,
		getPage,
		deleteLoading,
		handleDelete,
		statusLoading,
		handleChangeStatusModal,
		handleOpenStatusModal,
		openStatusModal,
		setOpenStatusModal
	}
}
