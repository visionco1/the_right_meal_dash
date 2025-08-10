export interface TState {
	data: any
	loading: boolean
	error: string | null
	created: boolean
	createLoading: boolean
	createResponse: any
	createError: string | null
	updated: boolean
	updateLoading: boolean
	updateResponse: any
	updateError: string | null
	showLoading: boolean
	showResponse: any | null
	showError: string | null
	deleteLoading: boolean
	deleteResponse: any
	deleteError: string | null
	deleted: boolean
	statusLoading: boolean
	statusResponse: any
	statusError: string | null
	statusUpdated: boolean
}
