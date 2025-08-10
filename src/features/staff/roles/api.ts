import { APICore } from '../../../helpers/api/apiCore'

const api = new APICore()

function getRolesApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/roles?${queryString}`
	return api.get(baseUrl)
}
function createRoleApi(params: any) {
	const baseUrl = `/api/roles`
	return api.create(baseUrl, params)
}
function updateRoleApi(id: ID, params: any) {
	const baseUrl = `/api/roles/${id}`
	return api.update(baseUrl, params)
}
function deleteRoleApi(id: ID) {
	const baseUrl = `/api/roles/${id}`
	return api.delete(baseUrl)
}
function showRoleApi(id: ID) {
	const baseUrl = `/api/roles/${id}`
	return api.get(baseUrl)
}
function blockRoleApi(id: ID) {
	const baseUrl = `/api/roles/${id}/block`
	return api.create(baseUrl)
}
function unblockRoleApi(id: ID) {
	const baseUrl = `/api/roles/${id}/unblock`
	return api.create(baseUrl)
}

export { getRolesApi, showRoleApi, createRoleApi, deleteRoleApi, updateRoleApi, blockRoleApi, unblockRoleApi }
