import { APICore } from '@/helpers/api/apiCore'
import { TCreateBranchApi } from '../type'

const api = new APICore()

function getBranchesApi(params: any) {
	const queryString = new URLSearchParams(params)?.toString()
	const baseUrl = `/api/branches?${queryString}`
	return api.get(baseUrl)
}
function createBranchApi(params: TCreateBranchApi) {
	const baseUrl = `/api/branches`
	return api.create(baseUrl, params)
}
function updateBranchApi(id: ID, params: TCreateBranchApi) {
	const baseUrl = `/api/branches/${id}`
	return api.create(baseUrl, { ...params, _method: 'put' })
}
function deleteBranchApi(id: ID) {
	const baseUrl = `/api/branches/${id}`
	return api.delete(baseUrl)
}
function showBranchApi(id: ID) {
	const baseUrl = `/api/branches/${id}`
	return api.get(baseUrl)
}
function branchStatusApi(id: ID) {
	const baseUrl = `/api/branches/${id}/status`
	return api.create(baseUrl)
}

export { getBranchesApi, createBranchApi, updateBranchApi, deleteBranchApi, showBranchApi, branchStatusApi }
