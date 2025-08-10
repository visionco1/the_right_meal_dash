export interface TState {
	data: any
	loading: boolean
	error: string | null
	showLoading: boolean
	showResponse: any | null
	showError: string | null
}
export interface TZoneState {
	data: any
	loading: boolean
	error: string | null
	showLoading: boolean
	showResponse: any | null
	showError: string | null
	selectedPlace: any
	mapCenter: any
	rectangleCoords: any
}
