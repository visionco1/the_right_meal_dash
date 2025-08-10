import { TCompanyData } from '@/pages/settings/types'
import { APICore } from '../../../helpers/api/apiCore'

const api = new APICore()
// account
function getSettingsApi() {
	const baseUrl = '/api/settings'
	return api.get(baseUrl)
}

function updateSettingsApi(params: TCompanyData) {
	const baseUrl = '/api/settings'
	return api.createWithFile(`${baseUrl}`, { _method: 'put', ...params })
}

export { getSettingsApi, updateSettingsApi }
