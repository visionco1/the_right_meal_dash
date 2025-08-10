import { APICore } from '../../../helpers/api/apiCore'

const api = new APICore()

function getComplaintsApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/complaints?${queryString}`
	return api.get(baseUrl)
}
function createComplaintApi(params: any) {
	const baseUrl = `/api/complaints`
	return api.createWithFile(baseUrl, params)
}
function updateComplaintApi(id: ID, params: any) {
	const baseUrl = `/api/complaints/${id}`
	return api.createWithFile(baseUrl, { ...params, _method: 'put' })
}
function deleteComplaintApi(id: ID) {
	const baseUrl = `/api/complaints/${id}`
	return api.delete(baseUrl)
}
function showComplaintApi(id: ID) {
	const baseUrl = `/api/complaints/${id}`
	return api.get(baseUrl)
}

export { getComplaintsApi, showComplaintApi, createComplaintApi, deleteComplaintApi, updateComplaintApi }
