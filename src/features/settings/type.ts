export type TCreateCountry = {
	'name:ar': string
	'name:en': string
	'currency:ar': string
	'currency:en': string
	dial_code: string
	image: any
}
export type TCreateBranchApi = {
	'name:ar': string
	'name:en': string
	address: string
	lat: string
	long: string
	city_id: string | number
}
export type TCreateBranch = {
	'name:ar': string
	'name:en': string
	address: string
	lat: string
	long: string
	city_id: number | string
}
export type TCountryParams = {
	is_paginated?: number
	per_page?: number
	page?: number
	country_id?: number | string
	state_id?: number | string
	name?: string
}
export type TCreateCity = {
	state_id: number
	'name:ar': string
	'name:en': string
}
