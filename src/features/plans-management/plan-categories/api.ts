import { APICore } from '@/helpers/api/apiCore'

const api = new APICore()

function getPlanCategoriesApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/plan-categories?${queryString}`
	return api.get(baseUrl)
}
function createPlanCategoryApi(params: any) {
	const baseUrl = `/api/plan-categories`
	return api.createWithFile(baseUrl, params)
}
function updatePlanCategoryApi(id: string | number, params: any) {
	const baseUrl = `/api/plan-categories/${id}`
	return api.createWithFile(baseUrl, { ...params, _method: 'put' })
}
function deletePlanCategoryApi(id: ID) {
	const baseUrl = `/api/plan-categories/${id}`
	return api.delete(baseUrl)
}
function showPlanCategoryApi(id: ID) {
	const baseUrl = `/api/plan-categories/${id}`
	return api.get(baseUrl)
}
function planCategoryStatusApi(id: ID) {
	const baseUrl = `/api/plan-categories/${id}/status`
	return api.create(baseUrl)
}

export { getPlanCategoriesApi, showPlanCategoryApi, createPlanCategoryApi, deletePlanCategoryApi, updatePlanCategoryApi, planCategoryStatusApi }
