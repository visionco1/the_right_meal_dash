import { APICore } from '@/helpers/api/apiCore'

const api = new APICore()

function getReportsApi(params: any) {
    const queryString = new URLSearchParams(params)?.toString()
    const baseUrl = `/api/reports?${queryString}`
    return api.get(baseUrl)
}
function exportReportApi(params: any) {
    const baseUrl = `/api/export-orders`
    return api.get(baseUrl, params)
}
export function exportFinanceApi(data: any) {
    const baseUrl = `/api/orders/exports`
    return api.create(baseUrl, data)
}
function exportSingleReportApi(date: string) {
    const baseUrl = `/api/single_export-orders?date=${date}`
    return api.get(baseUrl)
}
function exportNoteOrdersApi(params: any) {
    const baseUrl = `/api/note_export-orders`
    return api.get(baseUrl, params)
}
function exportMealCountApi(params: any) {
    const baseUrl = `api/export-meal-count`
    return api.get(baseUrl, params)
}
function exportDeliveryNotesApi(params: any) {
    const baseUrl = `api/delivery-note-orders`
    return api.get(baseUrl, params)
}
function exportQualityApi(params: any) {
    const baseUrl = `api/export-quality`
    return api.get(baseUrl, params)
}
function createReportApi(params: any) {
    const baseUrl = `/api/report-orders`
    return api.createWithFile(baseUrl, params)
}
function updateReportApi(id: ID, params: any) {
    const baseUrl = `/api/report-orders/${id}`
    return api.createWithFile(baseUrl, { ...params, _method: 'put' })
}
function deleteReportApi(id: ID) {
    const baseUrl = `/api/report-orders/${id}`
    return api.delete(baseUrl)
}
function showReportApi(id: ID) {
    const baseUrl = `/api/report-orders/${id}`
    return api.get(baseUrl)
}
function ReportStatusApi(id: ID) {
    const baseUrl = `/api/report-orders/${id}/status`
    return api.create(baseUrl)
}

export {
    getReportsApi,
    exportReportApi,
    showReportApi,
    createReportApi,
    deleteReportApi,
    updateReportApi,
    ReportStatusApi,
    exportSingleReportApi,
    exportNoteOrdersApi,
    exportMealCountApi,
    exportDeliveryNotesApi,
    exportQualityApi
}
