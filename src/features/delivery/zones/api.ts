import { APICore } from '../../../helpers/api/apiCore'

const api = new APICore()

function getZonesApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/zones?${queryString}`
	return api.get(baseUrl)
}
function createZoneApi(params: any) {
	const baseUrl = `/api/zones`
	return api.create(baseUrl, params)
}
function updateZoneApi(id: ID, params: any) {
	const baseUrl = `/api/zones/${id}`
	return api.create(baseUrl, { ...params, _method: 'put' })
}
function deleteZoneApi(id: ID) {
	const baseUrl = `/api/zones/${id}`
	return api.delete(baseUrl)
}
function showZoneApi(id: ID) {
	const baseUrl = `/api/zones/${id}`
	return api.get(baseUrl)
}
function ZoneStatusApi(id: ID) {
	const baseUrl = `/api/zones/${id}/status`
	return api.create(baseUrl)
}

export { getZonesApi, showZoneApi, createZoneApi, deleteZoneApi, updateZoneApi, ZoneStatusApi }
