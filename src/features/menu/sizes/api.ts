import { APICore } from '../../../helpers/api/apiCore'

const api = new APICore()

function getSizesApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/sizes?${queryString}`
	return api.get(baseUrl)
}
function createSizeApi(params: any) {
	const baseUrl = `/api/sizes`
	return api.createWithFile(baseUrl, params)
}
function updateSizeApi(id: ID, params: any) {
	const baseUrl = `/api/sizes/${id}`
	return api.createWithFile(baseUrl, { ...params, _method: 'put' })
}
function deleteSizeApi(id: ID) {
	const baseUrl = `/api/sizes/${id}`
	return api.delete(baseUrl)
}
function showSizeApi(id: ID) {
	const baseUrl = `/api/sizes/${id}`
	return api.get(baseUrl)
}
function SizeStatusApi(id: ID) {
	const baseUrl = `/api/sizes/${id}/status`
	return api.create(baseUrl)
}

export { getSizesApi, showSizeApi, createSizeApi, deleteSizeApi, updateSizeApi, SizeStatusApi }
