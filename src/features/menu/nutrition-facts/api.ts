import { APICore } from '../../../helpers/api/apiCore'

const api = new APICore()

function getNutritionFactsApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/nutrition-facts?${queryString}`
	return api.get(baseUrl)
}
function createNutritionFactApi(params: any) {
	const baseUrl = `/api/nutrition-facts`
	return api.createWithFile(baseUrl, params)
}
function updateNutritionFactApi(id: ID, params: any) {
	const baseUrl = `/api/nutrition-facts/${id}`
	return api.create(baseUrl, { _method: 'put', ...params })
}
function deleteNutritionFactApi(id: ID) {
	const baseUrl = `/api/nutrition-facts/${id}`
	return api.delete(baseUrl)
}
function showNutritionFactApi(id: ID) {
	const baseUrl = `/api/nutrition-facts/${id}`
	return api.get(baseUrl)
}
function NutritionFactStatusApi(id: ID) {
	const baseUrl = `/api/nutrition-facts/${id}/status`
	return api.create(baseUrl)
}

export { getNutritionFactsApi, showNutritionFactApi, createNutritionFactApi, deleteNutritionFactApi, updateNutritionFactApi, NutritionFactStatusApi }
