import { APICore } from '../../../helpers/api/apiCore'

const api = new APICore()

function getSubscriptionsApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/subscriptions?${queryString}`
	return api.get(baseUrl)
}
function createSubscriptionApi(params: any) {
	const baseUrl = `/api/subscriptions`
	return api.createWithFile(baseUrl, params)
}
function assignDeliveryToSubscriptionApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/subscriptions/assign-delivery?${queryString}`
	return api.create(baseUrl, params)
}
function assignOrderDayDeliveryApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/assign-order-day-delivery?${queryString}`
	return api.create(baseUrl, params)
}
function updateSubscriptionApi(id: ID, params: any) {
	const baseUrl = `/api/subscriptions/${id}`
	return api.createWithFile(baseUrl, { ...params, _method: 'put' })
}
function deleteSubscriptionApi(id: ID) {
	const baseUrl = `/api/subscriptions/${id}`
	return api.delete(baseUrl)
}
function showSubscriptionApi(id: ID) {
	const baseUrl = `/api/subscriptions/${id}`
	return api.get(baseUrl)
}
function SubscriptionStatusApi(id: ID) {
	const baseUrl = `/api/subscriptions/${id}/status`
	return api.create(baseUrl)
}

export {
	assignDeliveryToSubscriptionApi,
	getSubscriptionsApi,
	showSubscriptionApi,
	createSubscriptionApi,
	deleteSubscriptionApi,
	updateSubscriptionApi,
	SubscriptionStatusApi,
	assignOrderDayDeliveryApi
}
