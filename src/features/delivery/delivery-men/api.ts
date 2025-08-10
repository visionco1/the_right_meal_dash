import { APICore } from '@/helpers/api/apiCore'

const api = new APICore()

function getDeliveriesApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/deliveries?${queryString}`
	return api.get(baseUrl)
}
function createDeliveryApi(params: any) {
	const baseUrl = `/api/deliveries`
	return api.createWithFile(baseUrl, params)
}
function updateDeliveryApi(id: ID, params: any) {
	const baseUrl = `/api/deliveries/${id}`
	return api.createWithFile(baseUrl, { ...params, _method: 'put' })
}
function deleteDeliveryApi(id: ID) {
	const baseUrl = `/api/deliveries/${id}`
	return api.delete(baseUrl)
}
function forceDeleteDeliveryApi(id: ID) {
	const baseUrl = `/api/deliveries/${id}/force-delete`
	return api.delete(baseUrl)
}
function showDeliveryApi(id: ID) {
	const baseUrl = `/api/deliveries/${id}`
	return api.get(baseUrl)
}
function DeliveryBlockApi(id: ID) {
	const baseUrl = `/api/deliveries/${id}/block`
	return api.create(baseUrl)
}
function DeliveryUnblockApi(id: ID) {
	const baseUrl = `/api/deliveries/${id}/unblock`
	return api.create(baseUrl)
}
function DeliveryRestoreApi(id: ID) {
	const baseUrl = `/api/deliveries/${id}/restore`
	return api.create(baseUrl)
}

export { getDeliveriesApi, showDeliveryApi, createDeliveryApi, deleteDeliveryApi, updateDeliveryApi, DeliveryBlockApi, DeliveryUnblockApi, DeliveryRestoreApi, forceDeleteDeliveryApi }
