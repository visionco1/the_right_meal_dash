import { APICore } from '@/helpers/api/apiCore'

const api = new APICore()

function getAllergensApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/allergens?${queryString}`
	return api.get(baseUrl)
}
function createAllergenApi(params: any) {
	const baseUrl = `/api/allergens`
	return api.createWithFile(baseUrl, params)
}
function updateAllergenApi(id: ID, params: any) {
	const baseUrl = `/api/allergens/${id}`
	return api.createWithFile(baseUrl, { ...params, _method: 'put' })
}
function deleteAllergenApi(id: ID) {
	const baseUrl = `/api/allergens/${id}`
	return api.delete(baseUrl)
}
function showAllergenApi(id: ID) {
	const baseUrl = `/api/allergens/${id}`
	return api.get(baseUrl)
}
function allergenStatusApi(id: ID) {
	const baseUrl = `/api/allergens/${id}/status`
	return api.create(baseUrl)
}

export { getAllergensApi, showAllergenApi, createAllergenApi, deleteAllergenApi, updateAllergenApi, allergenStatusApi }
