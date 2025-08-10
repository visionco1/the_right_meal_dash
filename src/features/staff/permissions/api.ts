import { APICore } from '../../../helpers/api/apiCore'

const api = new APICore()

function getPermissionsApi() {
	const baseUrl = `/api/permissions`
	return api.get(baseUrl)
}

export { getPermissionsApi }
