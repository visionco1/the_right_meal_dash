import { APICore } from '@/helpers/api/apiCore'

const api = new APICore()

function getAdminsApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/admins?${queryString}`
	return api.get(baseUrl)
}
function createAdminApi(params: any) {
	const baseUrl = `/api/admins`
	return api.createWithFile(baseUrl, params)
}
function updateAdminApi(id: string | number, params: any) {
	const baseUrl = `/api/admins/${id}`
	if (params?.avatar) {
		return api.createWithFile(baseUrl, { _method: 'put', ...params })
	} else {
		return api.update(baseUrl, params)
	}
}
function deleteAdminApi(id: number | string) {
	const baseUrl = `/api/admins/${id}`
	return api.delete(baseUrl)
}
function forceDeleteAdminApi(id: ID) {
	const baseUrl = `/api/admins/${id}/force-delete`
	return api.delete(baseUrl)
}
function showAdminApi(id: ID) {
	const baseUrl = `/api/admins/${id}`
	return api.get(baseUrl)
}
function adminBlockApi(id: ID) {
	const baseUrl = `/api/admins/${id}/block`
	return api.create(baseUrl)
}
function adminUnblockApi(id: ID) {
	const baseUrl = `/api/admins/${id}/unblock`
	return api.create(baseUrl)
}
function adminRestoreApi(id: ID) {
	const baseUrl = `/api/admins/${id}/restore`
	return api.create(baseUrl)
}

export { getAdminsApi, showAdminApi, createAdminApi, deleteAdminApi, updateAdminApi, adminBlockApi, adminUnblockApi, adminRestoreApi, forceDeleteAdminApi }
