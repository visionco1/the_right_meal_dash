import { APICore } from '../../../helpers/api/apiCore'

const api = new APICore()

function getMenusApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/menus?${queryString}`
	return api.get(baseUrl)
}
function createMenuApi(params: any) {
	const baseUrl = `/api/menus`
	return api.createWithFile(baseUrl, params)
}
function updateMenuApi(id: ID, params: any) {
	const baseUrl = `/api/menus/${id}`
	return api.createWithFile(baseUrl, { ...params, _method: 'put' })
}
function deleteMenuApi(id: ID) {
	const baseUrl = `/api/menus/${id}`
	return api.delete(baseUrl)
}
function showMenuApi(id: ID) {
	const baseUrl = `/api/menus/${id}`
	return api.get(baseUrl)
}
function MenuStatusApi(id: ID) {
	const baseUrl = `/api/menus/${id}/status`
	return api.create(baseUrl)
}
function chefChoiceApi(id: number | string, data: { is_chef_choice: number }) {
	const baseUrl = `/api/section-meals/${id}`
	return api.create(baseUrl, { ...data, _method: 'put' })
}
function deleteSectionMealApi(id: ID) {
	const baseUrl = `/api/section-meals/${id}`
	return api.delete(baseUrl)
}
function getWorkDaysApi() {
	const baseUrl = '/api/work-days'
	return api.get(baseUrl)
}
export { getMenusApi, getWorkDaysApi, showMenuApi, createMenuApi, deleteMenuApi, updateMenuApi, MenuStatusApi, chefChoiceApi, deleteSectionMealApi }
