import { APICore } from '../../../helpers/api/apiCore'

const api = new APICore()

function getContactUsApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/contact-us?${queryString}`
	return api.get(baseUrl)
}
function createContactUsApi(params: any) {
	const baseUrl = `/api/contact-us`
	return api.createWithFile(baseUrl, params)
}
function updateContactUsApi(id: ID, params: any) {
	const baseUrl = `/api/contact-us/${id}`
	return api.createWithFile(baseUrl, { ...params, _method: 'put' })
}
function deleteContactUsApi(id: ID) {
	const baseUrl = `/api/contact-us/${id}`
	return api.delete(baseUrl)
}
function showContactUsApi(id: ID) {
	const baseUrl = `/api/contact-us/${id}`
	return api.get(baseUrl)
}
function ContactUsStatusApi(id: ID) {
	const baseUrl = `/api/contact-us/${id}/status`
	return api.create(baseUrl)
}

export { getContactUsApi, showContactUsApi, createContactUsApi, deleteContactUsApi, updateContactUsApi, ContactUsStatusApi }
