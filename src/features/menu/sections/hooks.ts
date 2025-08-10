import { hasPermissions } from '@/helpers/helpers'
import { useCreate, useDelete, useFetchData, useShowData, useStatus, useUpdate } from '@/hooks'
import { SectionStatusApi, createSectionApi, deleteSectionApi, updateSectionApi } from '@/features/menu/sections/api'

import { getSections, showSection } from '@/redux/slices/menu/sections'
import { RootState } from '@/redux/store'
import { useRef } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'

export const useGetSections = (params?: any) => {
	const selector = (state: RootState) => state.sectionsReducer
	const { loading, error, data, getPage, onSearch, active_data } = useFetchData(getSections, selector, params)
	return { loading, error, data, getPage, onSearch, active_data }
}

export const useShowSingleSection = () => {
	const selector = (state: RootState) => state.sectionsReducer
	const { showLoading, showError, showResponse } = useShowData(showSection, selector)
	return { showLoading, showError, showResponse }
}

export const useCreateSection = () => {
	const { createLoading, handleCreate, openModal, setOpenModal } = useCreate({
		createApi: createSectionApi,
		allAction: getSections
	})
	return { createLoading, handleCreate, openModal, setOpenModal }
}

export const useUpdateSection = () => {
	const selector = (state: RootState) => state.sectionsReducer
	const {
		updateLoading,
		showLoading: sectionLoading,
		showResponse,
		handleUpdate,
		openEditModal,
		setOpenEditModal,
		handleOpenModal
	} = useUpdate({
		updateApi: updateSectionApi,
		showSingleAction: showSection,
		selector: selector,
		allAction: getSections
	})

	const values = {
		'name:ar': showResponse?.data?.name?.['ar'],
		'name:en': showResponse?.data?.name?.['en']
	}
	return {
		updateLoading,
		sectionLoading,
		handleUpdate,
		openEditModal,
		setOpenEditModal,
		handleOpenModal,
		values
	}
}

export const useDeleteSection = () => {
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDelete({
		deleteApi: deleteSectionApi,
		allAction: getSections
	})
	return { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal }
}

export const useChangeSectionStatus = () => {
	const { statusLoading, handleChangeStatus } = useStatus({
		statusApi: SectionStatusApi,
		allAction: getSections
	})
	return { statusLoading, handleChangeStatus }
}

export const useSectionHook = () => {
	// fetch all data
	const { loading, error, data, getPage, onSearch } = useGetSections()
	// show single
	const { showLoading, showError, showResponse } = useShowSingleSection()
	// create
	const { createLoading, handleCreate, openModal, setOpenModal } = useCreateSection()
	// update
	const { updateLoading, handleUpdate, openEditModal, setOpenEditModal, handleOpenModal } = useUpdateSection()
	// delete meal category
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDeleteSection()
	// change status
	const { statusLoading, handleChangeStatus } = useChangeSectionStatus()

	const values = {
		'name:ar': showResponse?.data?.name?.['ar'],
		'name:en': showResponse?.data?.name?.['en']
	}
	const permission = (type: string) => {
		return hasPermissions(data?.data?.permissions, type)
	}
	const tableRef = useRef(null)
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'Section',
		sheet: 'Section'
	})
	return {
		tableRef,
		onDownload,
		permission,
		loading,
		error,
		data,
		getPage,
		showLoading,
		showError,
		showResponse,
		createLoading,
		handleCreate,
		openModal,
		setOpenModal,
		updateLoading,
		handleUpdate,
		openEditModal,
		setOpenEditModal,
		handleOpenModal,
		deleteLoading,
		handleDelete,
		statusLoading,
		handleChangeStatus,
		values,
		openDeleteModal,
		setOpenDeleteModal,
		handleDeleteModal,
		onSearch
	}
}
