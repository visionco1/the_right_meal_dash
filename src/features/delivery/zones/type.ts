import { AxiosResponse } from 'axios'

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

export type TData = {
	'name:ar': string
	'name:en': string
	country_id: number
	state_id: number
	branch_id: number
	delivery_window_ids: any[]
	waypoints: any
}

export type TZone = {
	id: number
	name: {
		en: string
		ar: string
	}
	localized_name: string
	is_active: boolean
	city: {
		id: number
		name: {
			en: string
			ar: string
		}
		localized_name: string
		is_active: boolean
	}
	branch: {
		id: number
		name: {
			en: string
			ar: string
		}
		localized_name: string
		address: string
		lat: string
		long: string
		is_active: boolean
		country: {
			id: number
			name: string
		}
		state: {
			id: number
			name: string
		}
		city: {
			id: number
			name: string
		}
	}
	country: {
		id: number
		name: {
			en: string
			ar: string
		}
		localized_name: string
		currency: {
			en: string
			ar: string
		}
		localized_currency: string
		is_active: boolean
		country_code: string
		dial_code: string
		image: {
			id: number
			url: string
		}
	}
	deliveryWindows: {
		id: number
		from: string
		to: string
		new_from: string
		new_to: string
		is_active: number
	}[]
	waypoints: {
		lat: string
		long: string
	}[]
}

export type TZoneResponse = AxiosResponse<TZone>
