import { APICore } from '@/helpers/api/apiCore'

const api = new APICore()

function getBannersApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/banners?${queryString}`
	return api.get(baseUrl)
}
function createBannerApi(params: any) {
	const baseUrl = `/api/banners`
	return api.createWithFile(baseUrl, params)
}
function updateBannerApi(id: ID, params: any) {
	const baseUrl = `/api/banners/${id}`
	return api.createWithFile(baseUrl, { ...params, _method: 'put' })
}
function deleteBannerApi(id: ID) {
	const baseUrl = `/api/banners/${id}`
	return api.delete(baseUrl)
}
function showBannerApi(id: ID) {
	const baseUrl = `/api/banners/${id}`
	return api.get(baseUrl)
}
function BannerStatusApi(id: ID) {
	const baseUrl = `/api/banners/${id}/status`
	return api.create(baseUrl)
}

export { getBannersApi, showBannerApi, createBannerApi, deleteBannerApi, updateBannerApi, BannerStatusApi }
