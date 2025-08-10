import { APICore } from '../../../helpers/api/apiCore'
import { TCreateCountry } from '../type'

const api = new APICore()

function getStatesApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/states?${queryString}`
	return api.get(baseUrl)
}
function createStateApi(params: TCreateCountry) {
	console.log(params)
	const baseUrl = `/api/states`
	return api.create(baseUrl, params)
}
function updateStateApi(id: ID, params: TCreateCountry) {
	const baseUrl = `/api/states/${id}`
	return api.update(baseUrl, params)
}
function deleteStateApi(id: ID) {
	const baseUrl = `/api/states/${id}`
	return api.delete(baseUrl)
}
function showStateApi(id: ID) {
	const baseUrl = `/api/states/${id}`
	return api.get(baseUrl)
}
function stateStatusApi(id: ID) {
	const baseUrl = `/api/states/${id}/status`
	return api.create(baseUrl)
}

export { getStatesApi, createStateApi, updateStateApi, deleteStateApi, showStateApi, stateStatusApi }
