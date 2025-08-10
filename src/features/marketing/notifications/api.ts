import { APICore } from '../../../helpers/api/apiCore'

const api = new APICore()

function getNotificationsApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/notifications?${queryString}`
	return api.get(baseUrl)
}
function getUserTypesApi() {
	const baseUrl = `/api/admin/user-types`
	return api.get(baseUrl)
}
function getUserByTypeApi(user: string) {
	const baseUrl = `/api/admin/user-types/${user}`
	return api.get(baseUrl)
}
function createNotificationApi(params: any) {
	const baseUrl = `/api/notifications`
	return api.create(baseUrl, params)
}
function deleteNotificationApi(id: ID) {
	const baseUrl = `/api/notifications/${id}`
	return api.delete(baseUrl)
}
function showNotificationApi(id: ID) {
	const baseUrl = `/api/notifications/${id}`
	return api.get(baseUrl)
}

export { getNotificationsApi, createNotificationApi, getUserTypesApi, getUserByTypeApi, deleteNotificationApi, showNotificationApi }
