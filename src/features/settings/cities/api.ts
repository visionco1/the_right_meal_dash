import { APICore } from '../../../helpers/api/apiCore'
import { TCreateCity } from '../type'

const api = new APICore()

function getCitiesApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/cities?${queryString}`
	return api.get(baseUrl)
}
function createCityApi(params: TCreateCity) {
	const baseUrl = `/api/cities`
	return api.create(baseUrl, params)
}
function updateCityApi(id: string, params: TCreateCity) {
	const baseUrl = `/api/cities/${id}`
	return api.create(baseUrl, { ...params, _method: 'put' })
}
function deleteCityApi(id: ID) {
	const baseUrl = `/api/cities/${id}`
	return api.delete(baseUrl)
}
function showCityApi(id: ID) {
	const baseUrl = `/api/cities/${id}`
	return api.get(baseUrl)
}
function cityStatusApi(id: ID) {
	const baseUrl = `/api/cities/${id}/status`
	return api.create(baseUrl)
}

export { getCitiesApi, createCityApi, updateCityApi, deleteCityApi, showCityApi, cityStatusApi }
