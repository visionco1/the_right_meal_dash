export type TCreateShift = {
	'name:ar': string
	'name:en': string
	start_at: string
	end_at: string
}
export type TShift = {
	id: number
	name: {
		en: string
		ar: string
	}
	localized_name: string
	from: string
	to: string
	new_from: string
	new_to: string
	is_active: boolean
}

type PaginationLink = {
	url: string | null
	label: string
	active: boolean
}

type Meta = {
	current_page: number
	from: number
	last_page: number
	links: PaginationLink[]
	path: string
	per_page: number
	to: number
	total: number
}

type Links = {
	first: string
	last: string
	prev: string | null
	next: string | null
}

export type TDataResponse = {
	data: TShift[]
	links: Links
	meta: Meta
	permissions: string[]
}
