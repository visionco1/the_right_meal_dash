import { APICore } from '../../../helpers/api/apiCore'

const api = new APICore()

function getWhyUsApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/why-us?${queryString}`
	return api.get(baseUrl)
}
function createWhyUsApi(params: any) {
	const baseUrl = `/api/why-us`
	return api.createWithFile(baseUrl, params)
}
function updateWhyUsApi(id: ID, params: any) {
	const baseUrl = `/api/why-us/${id}`
	return api.createWithFile(baseUrl, { ...params, _method: 'put' })
}
function deleteWhyUsApi(id: ID) {
	const baseUrl = `/api/why-us/${id}`
	return api.delete(baseUrl)
}
function showWhyUsApi(id: ID) {
	const baseUrl = `/api/why-us/${id}`
	return api.get(baseUrl)
}
function WhyUsStatusApi(id: ID) {
	const baseUrl = `/api/why-us/${id}/status`
	return api.create(baseUrl)
}

export { getWhyUsApi, showWhyUsApi, createWhyUsApi, deleteWhyUsApi, updateWhyUsApi, WhyUsStatusApi }
