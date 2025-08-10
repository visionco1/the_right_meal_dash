import { APICore } from '../../../helpers/api/apiCore'

const api = new APICore()

function getShiftsApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/delivery-window?${queryString}`
	return api.get(baseUrl)
}
function createShiftApi(params: any) {
	const baseUrl = `/api/delivery-window`
	return api.createWithFile(baseUrl, params)
}
function updateShiftApi(id: ID, params: any) {
	const baseUrl = `/api/delivery-window/${id}`
	return api.update(baseUrl, params)
}
function deleteShiftApi(id: ID) {
	const baseUrl = `/api/delivery-window/${id}`
	return api.delete(baseUrl)
}
function showShiftApi(id: ID) {
	const baseUrl = `/api/delivery-window/${id}`
	return api.get(baseUrl)
}
function shiftStatusApi(id: ID) {
	const baseUrl = `/api/delivery-window/${id}/status`
	return api.create(baseUrl)
}

export { getShiftsApi, showShiftApi, createShiftApi, deleteShiftApi, updateShiftApi, shiftStatusApi }
