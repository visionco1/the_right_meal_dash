import { APICore } from '../../../helpers/api/apiCore'

const api = new APICore()

function getOutletsApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/outlets?${queryString}`
	return api.get(baseUrl)
}
function createOutletApi(params: any) {
	const baseUrl = `/api/outlets`
	return api.createWithFile(baseUrl, params)
}

function updateOutletApi(id: ID, params: any) {
	const baseUrl = `/api/outlets/${id}`
	if (params?.avatar) {
		return api.createWithFile(baseUrl, { _method: 'put', ...params })
	} else {
		return api.update(baseUrl, params)
	}
}

function deleteOutletApi(id: ID) {
	const baseUrl = `/api/outlets/${id}`
	return api.delete(baseUrl)
}
function forceDeleteOutletApi(id: ID) {
	const baseUrl = `/api/outlets/${id}/force-delete`
	return api.delete(baseUrl)
}
function showOutletApi(id: ID) {
	const baseUrl = `/api/outlets/${id}`
	return api.get(baseUrl)
}
function OutletBlockApi(id: ID) {
	const baseUrl = `/api/outlets/${id}/block`
	return api.create(baseUrl)
}
function OutletUnblockApi(id: ID) {
	const baseUrl = `/api/outlets/${id}/unblock`
	return api.create(baseUrl)
}
function OutletRestoreApi(id: ID) {
	const baseUrl = `/api/outlets/${id}/restore`
	return api.create(baseUrl)
}

export { getOutletsApi, showOutletApi, createOutletApi, deleteOutletApi, updateOutletApi, OutletBlockApi, OutletUnblockApi, OutletRestoreApi, forceDeleteOutletApi }
