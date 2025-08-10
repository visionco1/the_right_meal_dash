import { APICore } from '../../../helpers/api/apiCore'

const api = new APICore()

function getSectionsApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/sections?${queryString}`
	return api.get(baseUrl)
}
function createSectionApi(params: any) {
	const baseUrl = `/api/sections`
	return api.createWithFile(baseUrl, params)
}
function updateSectionApi(id: string | number, params: any) {
	const baseUrl = `/api/sections/${id}`
	return api.createWithFile(baseUrl, { ...params, _method: 'put' })
}
function deleteSectionApi(id: number | string) {
	const baseUrl = `/api/sections/${id}`
	return api.delete(baseUrl)
}
function showSectionApi(id: ID) {
	const baseUrl = `/api/sections/${id}`
	return api.get(baseUrl)
}
function SectionStatusApi(id: ID) {
	const baseUrl = `/api/sections/${id}/status`
	return api.create(baseUrl)
}

export { getSectionsApi, showSectionApi, createSectionApi, deleteSectionApi, updateSectionApi, SectionStatusApi }
