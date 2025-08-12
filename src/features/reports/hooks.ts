import { exportSingleReportApi } from '@/features/reports/api'
import { convertToFormData, dateHelper, handleChangeState, hasPermissions } from '@/helpers/helpers'
import { useFetchData, useShowData } from '@/hooks'
import { getReports, showReport } from '@/redux/slices/reports/reports'
import { RootState } from '@/redux/store'
import { useRef, useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { TExportData } from './types'
import Notify from '@/components/ui/custom-toastify'
import { useTranslation } from 'react-i18next'

type TData = {
    customer_name: any
    country_id: any
    state_id: any
    city_id: any
    plan_id: any
    order_status: any
    zone_id: any
    captain_id: any
    date: any
}

export const useGetReports = () => {
    const selector = (state: RootState) => state.ReportsReducer
    const date = dateHelper.getToday()
    const [filter_data, set_filter_data] = useState<TData>({
        customer_name: '',
        country_id: '',
        state_id: '',
        city_id: '',
        plan_id: '',
        order_status: '',
        zone_id: '',
        captain_id: '',
        date: date
    })
    const { loading, error, data, getPage, onSearch, handleFetch } = useFetchData(
        getReports,
        selector,
        { date: filter_data?.date }
    )

    // Filter out keys with empty values
    const finalFilters = Object.fromEntries(
        Object.entries(filter_data).filter(([_, value]) => value)
    )

    const handleSearch = () => {
        handleFetch(finalFilters)
    }

    const handleChangeFilter = (key: string, value: any) => {
        handleChangeState(set_filter_data, filter_data, key, value)
    }
    return {
        loading,
        error,
        data,
        getPage,
        onSearch,
        handleChangeFilter,
        filter_data,
        handleSearch
    }
}

export const useShowSingleReport = () => {
    const selector = (state: RootState) => state.ReportsReducer
    const { showLoading, showError, showResponse } = useShowData(showReport, selector)
    return { showLoading, showError, showResponse }
}

export const useExportReports = (date: string) => {
    const [loadingSingle, setSingleLoading] = useState<boolean>(false)
    const exportMealPdf = async () => {
        try {
            setSingleLoading(true)
            const response = await exportSingleReportApi(date)
            setSingleLoading(false)
            if (response?.data?.success) {
                window.open(response?.data?.url)
            }
        } catch (error: any) {
            setSingleLoading(false)
            return error
        }
    }

    return {
        exportMealPdf,
        loadingSingle
    }
}

export const useExport = ({ api, date, keys }: { api: any; date: string; keys: string[] }) => {
    const { t } = useTranslation()

    const [open, setOpenModal] = useState(false)
    const [loading, setLoading] = useState<boolean>(false)

    const [data, setData] = useState<TExportData>({
        list: keys,
        date: date,
        date_of_day: date
    })

    const handleChange = (key: string, value: any) => {
        setData(old => ({
            ...old,
            [key]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = convertToFormData(data)

        try {
            setLoading(true)
            const response = await api(formData)

            if (response?.data?.success) {
                setOpenModal(false)
                window.open(response?.data?.url)
                Notify(response?.data?.message || t('export success'), 'success')
            }
        } catch (error: any) {
            Notify(error, 'error')
            return error
        } finally {
            setLoading(false)
        }
    }

    return { handleSubmit, handleChange, loading, data, setOpenModal, keys, open }
}

export const useReportHook = () => {
    const {
        loading,
        error,
        data,
        getPage,
        onSearch,
        handleChangeFilter,
        filter_data,
        handleSearch
    } = useGetReports()

    const permission = (type: string) => {
        return hasPermissions(data?.data?.permissions, type)
    }
    const tableRef = useRef(null)
    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Report',
        sheet: 'Report'
    })
    return {
        tableRef,
        onDownload,
        permission,
        loading,
        error,
        data,
        getPage,
        onSearch,
        handleChangeFilter,
        filter_data,
        handleSearch
    }
}
