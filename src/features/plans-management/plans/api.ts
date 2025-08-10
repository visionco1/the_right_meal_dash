import { APICore } from '../../../helpers/api/apiCore'

const api = new APICore()

function getSubscriptionPlansApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/plans?${queryString}`
	return api.get(baseUrl)
}
function createSubscriptionPlanApi(params: any) {
	const baseUrl = `/api/plans`
	return api.createWithFile(baseUrl, params)
}
function updateSubscriptionPlanApi(id: ID, params: any) {
	const baseUrl = `/api/plans/${id}`
	return api.createWithFile(baseUrl, { ...params, _method: 'put' })
}
function deleteSubscriptionPlanApi(id: ID) {
	const baseUrl = `/api/plans/${id}`
	return api.delete(baseUrl)
}
function showSubscriptionPlanApi(id: ID) {
	const baseUrl = `/api/plans-show-dash/${id}`
	return api.get(baseUrl)
}
function SubscriptionPlanStatusApi(id: ID) {
	const baseUrl = `/api/plans/${id}/status`
	return api.create(baseUrl)
}

export { getSubscriptionPlansApi, showSubscriptionPlanApi, createSubscriptionPlanApi, deleteSubscriptionPlanApi, updateSubscriptionPlanApi, SubscriptionPlanStatusApi }
