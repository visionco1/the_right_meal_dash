import { APICore } from '../../../helpers/api/apiCore'

const api = new APICore()

function getUsersApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/users?${queryString}`
	return api.get(baseUrl)
}
function createUserApi(params: any) {
	const baseUrl = `/api/users`
	return api.createWithFile(baseUrl, params)
}

function updateUserApi(id: ID, params: any) {
	const baseUrl = `/api/users/${id}`
	if (params?.avatar) {
		return api.createWithFile(baseUrl, { _method: 'put', ...params })
	} else {
		return api.update(baseUrl, params)
	}
}

function deleteUserApi(id: ID) {
	const baseUrl = `/api/users/${id}`
	return api.delete(baseUrl)
}
function forceDeleteUserApi(id: ID) {
	const baseUrl = `/api/users/${id}/force-delete`
	return api.delete(baseUrl)
}
function showUserApi(id: ID) {
	const baseUrl = `/api/users/${id}`
	return api.get(baseUrl)
}
function showCustomerHealthApi(id: ID) {
	const baseUrl = `/api/customer-health/${id}`
	return api.get(baseUrl)
}
function UserBlockApi(id: ID) {
	const baseUrl = `/api/users/${id}/block`
	return api.create(baseUrl)
}
function UserUnblockApi(id: ID) {
	const baseUrl = `/api/users/${id}/unblock`
	return api.create(baseUrl)
}
function UserRestoreApi(id: ID) {
	const baseUrl = `/api/users/${id}/restore`
	return api.create(baseUrl)
}

export { showCustomerHealthApi, getUsersApi, showUserApi, createUserApi, deleteUserApi, updateUserApi, UserBlockApi, UserUnblockApi, UserRestoreApi, forceDeleteUserApi }
