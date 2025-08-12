import { RootState } from '@/redux/store'
import { useParams } from 'react-router-dom'
import { getUsers, showUser, showCustomerHealth } from '@/redux/slices/customer/users'
import {
    useBlock,
    useCreate,
    useDelete,
    useFetchData,
    useShowData,
    useUnBlock,
    useUpdate
} from '@/hooks'
import {
    UserBlockApi,
    UserUnblockApi,
    createUserApi,
    deleteUserApi,
    updateUserApi
} from '@/features/customers/customers/api'
import { hasPermissions } from '@/helpers/helpers'
import { useEffect, useRef, useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'

export const useGetAllUsers = (params?: any) => {
    const selector = (state: RootState) => state.usersReducer
    const { data, loading, error, getPage, onSearch, search, active_data } = useFetchData(
        getUsers,
        selector,
        params
    )
    return { loading, error, data, getPage, onSearch, search, active_data }
}

export const useShowSingleUser = () => {
    const selector = (state: RootState) => state.usersReducer
    const { id } = useParams()
    const { showLoading, showError, showResponse } = useShowData(showUser, selector)
    return { showLoading, showError, showResponse, id }
}

export const useShowCustomerHealth = () => {
    const selector = (state: RootState) => state.usersReducer
    const { id } = useParams()
    const { showLoading, showError, showResponse } = useShowData(showCustomerHealth, selector)
    return { showLoading, showError, showResponse, id }
}

export const useCreateUser = () => {
    const [data, setData] = useState({
        f_name: '',
        l_name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: ''
    })
    const { createLoading, handleCreate, openModal, setOpenModal, handleChange } = useCreate({
        createApi: createUserApi,
        allAction: getUsers,
        data: data,
        setData: setData
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleCreate({
            ...data,
            dial_code: '+966'
        })
    }
    return { createLoading, handleSubmit, openModal, setOpenModal, data, handleChange }
}

export const useUpdateUser = () => {
    const selector = (state: RootState) => state.usersReducer
    // update
    const {
        updateLoading,
        openEditModal,
        setOpenEditModal,
        handleOpenModal,
        handleUpdateData,
        showLoading,
        showResponse
    } = useUpdate({
        updateApi: updateUserApi,
        allAction: getUsers,
        showSingleAction: showUser,
        selector: selector
    })

    const data = {
        f_name: showResponse?.data?.f_name,
        l_name: showResponse?.data?.l_name,
        phone: showResponse?.data?.phone,
        email: showResponse?.data?.email
    }

    const [values, setData] = useState<{ [key: string]: any }>(data)

    useEffect(() => {
        if (showResponse) {
            setData({
                f_name: showResponse?.data?.f_name,
                l_name: showResponse?.data?.l_name,
                phone: '+966' + showResponse?.data?.phone,
                email: showResponse?.data?.email
            })
        }
    }, [showResponse])

    const handleChange = (key: string, value: any) => {
        setData(old => ({
            ...old,
            [key]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const pass = values?.password && {
            password: values?.password,
            password_confirmation: values?.password_confirmation
        }

        const Data = {
            ...values,
            ...pass,
            dial_code: '+966'
        }
        handleUpdateData(Data, {})
    }

    return {
        updateLoading,
        showLoading,
        handleSubmit,
        handleChange,
        values,
        openEditModal,
        setOpenEditModal,
        handleOpenModal
    }
}

export const useDeleteUser = () => {
    // delete
    const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } =
        useDelete({
            deleteApi: deleteUserApi,
            allAction: getUsers
        })

    return { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal }
}

export const useChangeUserStatus = () => {
    // un block
    const {
        handleOpenUnBlockModal,
        handleUnBlockModal,
        openUnBlockModal,
        setOpenUnBlockModal,
        unblockLoading
    } = useUnBlock({
        unblockApi: UserUnblockApi,
        allAction: getUsers
    })
    // block
    const {
        blockLoading,
        handleBlockModal,
        handleOpenBlockModal,
        openBlockModal,
        setOpenBlockModal
    } = useBlock({
        blockApi: UserBlockApi,
        allAction: getUsers
    })

    const handleBlockStatus = (e: any, id: ID) => {
        const isChecked = e.target.checked
        if (isChecked) {
            handleOpenUnBlockModal(id)
        } else {
            handleOpenBlockModal(id)
        }
    }
    return {
        handleBlockStatus,
        blockLoading,
        handleBlockModal,
        handleOpenBlockModal,
        openBlockModal,
        setOpenBlockModal,
        handleUnBlockModal,
        openUnBlockModal,
        setOpenUnBlockModal,
        unblockLoading
    }
}

export const useUsersHook = () => {
    const { loading, error, data, getPage, onSearch, search } = useGetAllUsers()
    const { showLoading, showResponse } = useShowSingleUser()
    const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } =
        useDeleteUser()
    const {
        handleBlockStatus,
        blockLoading,
        handleBlockModal,
        handleOpenBlockModal,
        openBlockModal,
        setOpenBlockModal,
        handleUnBlockModal,
        openUnBlockModal,
        setOpenUnBlockModal,
        unblockLoading
    } = useChangeUserStatus()

    const permission = (type: string) => {
        return hasPermissions(data?.data?.permissions, type)
    }
    const tableRef = useRef(null)
    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'users',
        sheet: 'users'
    })
    return {
        search,
        onDownload,
        tableRef,
        showLoading,
        showResponse,
        handleDelete,
        deleteLoading,
        loading,
        error,
        data,
        getPage,
        handleBlockStatus,
        openDeleteModal,
        setOpenDeleteModal,
        handleDeleteModal,
        onSearch,
        permission,
        blockLoading,
        handleBlockModal,
        handleOpenBlockModal,
        openBlockModal,
        setOpenBlockModal,
        handleUnBlockModal,
        openUnBlockModal,
        setOpenUnBlockModal,
        unblockLoading
    }
}
