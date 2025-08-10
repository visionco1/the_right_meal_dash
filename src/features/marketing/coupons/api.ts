import { APICore } from '../../../helpers/api/apiCore'

const api = new APICore()

function getCouponsApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/coupones?${queryString}`
	return api.get(baseUrl)
}
function createCouponApi(params: any) {
	const baseUrl = `/api/coupones`
	return api.create(baseUrl, params)
}
function updateCouponApi(id: ID, params: any) {
	const baseUrl = `/api/coupones/${id}`
	return api.create(baseUrl, { ...params, _method: 'put' })
}
function deleteCouponApi(id: ID) {
	const baseUrl = `/api/coupones/${id}`
	return api.delete(baseUrl)
}
function showCouponApi(id: ID) {
	const baseUrl = `/api/coupones/${id}`
	return api.get(baseUrl)
}
function couponStatusApi(id: ID) {
	const baseUrl = `/api/coupones/${id}/status`
	return api.create(baseUrl)
}

export { getCouponsApi, showCouponApi, createCouponApi, deleteCouponApi, updateCouponApi, couponStatusApi }
