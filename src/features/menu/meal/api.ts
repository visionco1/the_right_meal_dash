import { APICore } from '../../../helpers/api/apiCore'

const api = new APICore()

function getMealsApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/meals?${queryString}`
	return api.get(baseUrl)
}
function createMealApi(params: any) {
	const baseUrl = `/api/meals`
	return api.createWithFile(baseUrl, params)
}
function updateMealApi(id: ID, params: any) {
	const baseUrl = `/api/meals/${id}`
	return api.createWithFile(baseUrl, { ...params, _method: 'put' })
}
function deleteMealApi(id: ID) {
	const baseUrl = `/api/meals/${id}`
	return api.delete(baseUrl)
}
function showMealApi(id: ID) {
	const baseUrl = `/api/meals/${id}`
	return api.get(baseUrl)
}
function MealStatusApi(id: ID) {
	const baseUrl = `/api/meals/${id}/status`
	return api.create(baseUrl)
}

export { getMealsApi, showMealApi, createMealApi, deleteMealApi, updateMealApi, MealStatusApi }
