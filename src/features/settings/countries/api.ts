import { APICore } from '../../../helpers/api/apiCore'
import { TCreateCountry } from '../type'

const api = new APICore()

function getCountriesApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/countries?${queryString}`
	return api.get(baseUrl)
}
function createCountryApi(params: TCreateCountry) {
	const baseUrl = `/api/countries`
	return api.createWithFile(baseUrl, params)
}
function updateCountryApi(id: string, params: TCreateCountry) {
	const baseUrl = `/api/countries/${id}`
	return api.createWithFile(baseUrl, { ...params, _method: 'put' })
}
function deleteCountryApi(id: ID) {
	const baseUrl = `/api/countries/${id}`
	return api.delete(baseUrl)
}
function showCountryApi(id: ID) {
	const baseUrl = `/api/countries/${id}`
	return api.get(baseUrl)
}
function CountryStatusApi(id: ID) {
	const baseUrl = `/api/countries/${id}/status`
	return api.create(baseUrl)
}

export { getCountriesApi, showCountryApi, createCountryApi, deleteCountryApi, updateCountryApi, CountryStatusApi }
