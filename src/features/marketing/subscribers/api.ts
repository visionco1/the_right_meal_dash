import { APICore } from '../../../helpers/api/apiCore'

const api = new APICore()

function getSubscribersApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/subscribers?${queryString}`
	return api.get(baseUrl)
}
function deleteSubscriberApi(id: ID) {
	const baseUrl = `/api/subscribers/${id}`
	return api.delete(baseUrl)
}

export { getSubscribersApi, deleteSubscriberApi }
