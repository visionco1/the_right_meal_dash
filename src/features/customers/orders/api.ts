import { APICore } from '../../../helpers/api/apiCore'

const api = new APICore()

function getOrdersApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/reports?${queryString}`
	return api.get(baseUrl)
}
function assignOrderDeliveryApi(id: any, params: any) {
	const baseUrl = `/api/order-days/${id}`
	return api.create(baseUrl, { ...params, _method: 'put' })
}
function showOrderApi(id: ID) {
	const baseUrl = `/api/reports/${id}`
	return api.get(baseUrl)
}

export { getOrdersApi, showOrderApi, assignOrderDeliveryApi }
