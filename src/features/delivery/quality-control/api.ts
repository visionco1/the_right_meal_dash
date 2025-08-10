import { APICore } from '../../../helpers/api/apiCore'

const api = new APICore()

function getQualityControlsApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/qualities?${queryString}`
	return api.get(baseUrl)
}
function createQualityControlApi(params: any) {
	const baseUrl = `/api/qualities`
	return api.createWithFile(baseUrl, params)
}

function updateQualityControlApi(id: ID, params: any) {
	const baseUrl = `/api/qualities/${id}`
	if (params?.avatar) {
		return api.createWithFile(baseUrl, { _method: 'put', ...params })
	} else {
		return api.update(baseUrl, params)
	}
}

function deleteQualityControlApi(id: ID) {
	const baseUrl = `/api/qualities/${id}`
	return api.delete(baseUrl)
}
function forceDeleteQualityControlApi(id: ID) {
	const baseUrl = `/api/qualities/${id}/force-delete`
	return api.delete(baseUrl)
}
function showQualityControlApi(id: ID) {
	const baseUrl = `/api/qualities/${id}`
	return api.get(baseUrl)
}
function QualityControlBlockApi(id: ID) {
	const baseUrl = `/api/qualities/${id}/block`
	return api.create(baseUrl)
}
function QualityControlUnblockApi(id: ID) {
	const baseUrl = `/api/qualities/${id}/unblock`
	return api.create(baseUrl)
}
function QualityControlRestoreApi(id: ID) {
	const baseUrl = `/api/qualities/${id}/restore`
	return api.create(baseUrl)
}

export {
	getQualityControlsApi,
	showQualityControlApi,
	createQualityControlApi,
	deleteQualityControlApi,
	updateQualityControlApi,
	QualityControlBlockApi,
	QualityControlUnblockApi,
	QualityControlRestoreApi,
	forceDeleteQualityControlApi
}
