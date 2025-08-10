import { useCreate, useDelete, useFetchData, useShowData, useStatus, useUpdate } from '@/hooks'
import { CountryStatusApi, createCountryApi, deleteCountryApi, updateCountryApi } from '@/features/settings/countries/api'
import { getCountries, showCountry } from '@/redux/slices/settings/countries'
import { RootState } from '@/redux/store'
import { handleChangeState, hasPermissions } from '@/helpers/helpers'
import { useEffect, useRef, useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'

export const useGetAllCountries = (params?: any, cached?: boolean) => {
	const selector = (state: RootState) => state.countriesReducer
	const { loading, error, data, getPage, onSearch, search, active_data } = useFetchData(getCountries, selector, params, cached)
	const permission = (type: string) => {
		return hasPermissions(data?.data?.permissions, type)
	}
	return { loading, error, data, getPage, onSearch, search, permission, active_data }
}

export const useShowSingleCountry = () => {
	const selector = (state: RootState) => state.countriesReducer
	const { showLoading, showError, showResponse } = useShowData(showCountry, selector)
	return { showLoading, showError, showResponse }
}

export const useCreateCountry = () => {
	const [data, setData] = useState<any>({
		'name:ar': '',
		'name:en': '',
		'currency:ar': '',
		'currency:en': '',
		country_code: '',
		dial_code: ''
	})
	const { createLoading, handleCreate, openModal, setOpenModal, handleChange } = useCreate({
		createApi: createCountryApi,
		allAction: getCountries,
		data: data,
		setData: setData
	})

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleCreate(data)
	}

	return { createLoading, handleSubmit, handleChange, data, openModal, setOpenModal }
}

export const useUpdateCountry = () => {
	const selector = (state: RootState) => state.countriesReducer
	const { updateLoading, showLoading, showResponse, openEditModal, setOpenEditModal, handleOpenModal, handleUpdateData } = useUpdate({
		updateApi: updateCountryApi,
		showSingleAction: showCountry,
		selector: selector,
		allAction: getCountries
	})
	// default values
	const data = {
		image: null,
		'name:ar': showResponse?.data?.name?.ar,
		'name:en': showResponse?.data?.name?.en,
		'currency:ar': showResponse?.data?.currency?.ar,
		'currency:en': showResponse?.data?.currency?.en,
		dial_code: showResponse?.data?.dial_code,
		country_code: showResponse?.data?.country_code
	}
	const [values, setData] = useState<any>(data)
	useEffect(() => {
		if (!showLoading) {
			setData(data)
		}
	}, [showLoading, showResponse])

	const handleChange = (key: string, value: any) => {
		handleChangeState(setData, values, key, value)
	}
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleUpdateData(values, data)
	}
	return {
		updateLoading,
		openEditModal,
		values,
		setOpenEditModal,
		handleOpenModal,
		showLoading,
		showResponse,
		handleSubmit,
		handleChange
	}
}

export const useDeleteCountry = () => {
	const { deleteLoading, handleDelete, handleDeleteModal, openDeleteModal, setOpenDeleteModal } = useDelete({
		deleteApi: deleteCountryApi,
		allAction: getCountries
	})

	return { deleteLoading, handleDelete, handleDeleteModal, openDeleteModal, setOpenDeleteModal }
}

export const useChangeCountryStatus = () => {
	const { statusLoading, handleChangeStatusModal, handleOpenStatusModal, openStatusModal, setOpenStatusModal } = useStatus({
		statusApi: CountryStatusApi,
		allAction: getCountries
	})
	return {
		statusLoading,
		handleChangeStatusModal,
		handleOpenStatusModal,
		openStatusModal,
		setOpenStatusModal
	}
}

export const useCountriesHook = () => {
	// delete
	const { deleteLoading, handleDelete, handleDeleteModal, openDeleteModal, setOpenDeleteModal } = useDeleteCountry()
	// change status
	const { statusLoading, handleChangeStatusModal, handleOpenStatusModal, openStatusModal, setOpenStatusModal } = useChangeCountryStatus()

	const tableRef = useRef(null)
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'countries',
		sheet: 'countries'
	})
	return {
		tableRef,
		onDownload,
		handleDeleteModal,
		openDeleteModal,
		setOpenDeleteModal,
		deleteLoading,
		handleDelete,
		statusLoading,
		handleChangeStatusModal,
		handleOpenStatusModal,
		openStatusModal,
		setOpenStatusModal
	}
}
