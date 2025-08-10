import { APICore } from '../../../helpers/api/apiCore'

const api = new APICore()

function getMealCategoriesApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/meal-categories?${queryString}`
	return api.get(baseUrl)
}
function createMealCategoryApi(params: any) {
	const baseUrl = `/api/meal-categories`
	return api.create(baseUrl, params)
}
function updateMealCategoryApi(id: ID, params: any) {
	const baseUrl = `/api/meal-categories/${id}`
	return api.create(baseUrl, { _method: 'put', ...params })
}
function deleteMealCategoryApi(id: ID) {
	const baseUrl = `/api/meal-categories/${id}`
	return api.delete(baseUrl)
}
function showMealCategoryApi(id: ID) {
	const baseUrl = `/api/meal-categories/${id}`
	return api.get(baseUrl)
}
function mealCategoryStatusApi(id: ID) {
	const baseUrl = `/api/meal-categories/${id}/status`
	return api.create(baseUrl)
}

export { getMealCategoriesApi, showMealCategoryApi, createMealCategoryApi, deleteMealCategoryApi, updateMealCategoryApi, mealCategoryStatusApi }
