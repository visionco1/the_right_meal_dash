import { APICore } from '../../../helpers/api/apiCore'

const api = new APICore()

function getSectionMealsApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/section-meals?${queryString}`
	return api.get(baseUrl)
}
function createSectionMealApi(params: any) {
	const baseUrl = `/api/section-meals`
	return api.create(baseUrl, params)
}
function updateSectionMealApi(id: ID, params: any) {
	const baseUrl = `/api/section-meals/${id}`
	return api.create(baseUrl, { ...params, _method: 'put' })
}
function deleteSectionMealApi(id: ID) {
	const baseUrl = `/api/section-meals/${id}`
	return api.delete(baseUrl)
}
function showSectionMealApi(id: ID) {
	const baseUrl = `/api/section-meals/${id}`
	return api.get(baseUrl)
}
function sectionMealsStatusApi(id: ID) {
	const baseUrl = `/api/section-meals/${id}/status`
	return api.create(baseUrl)
}

export { getSectionMealsApi, showSectionMealApi, createSectionMealApi, deleteSectionMealApi, updateSectionMealApi, sectionMealsStatusApi }
