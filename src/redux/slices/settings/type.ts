// system settings types
type Location = {
	address: string
	lat: string
	lng: string
}

type SocialLinks = {
	facebook: string
	linkedin: string
	twitter: string
	tiktok: string
	snapchat: string
}

type StaticPages = {
	policy: {
		en: string
		ar: string
	}
	about: {
		en: string
		ar: string
	}
	terms: {
		en: string
		ar: string
	}
}

type Seo = {
	facebook_pixel: string
	snapchat_pixel: string
	tiktok_pixel: string
	google_ads_pixel: string
	google_analytics: string
	google_tag_manager_pixel: string
}

export type TSystemSettings = {
	data: {
		name: {
			en: string
			ar: string
		}
		description: {
			en: string
			ar: string
		}
		our_vision: {
			en: string
			ar: string
		}
		our_mission: {
			en: string
			ar: string
		}
		our_tasks: {
			en: string
			ar: string
		}
		trade_register: string
		email: string
		phone: string
		mobile: string
		whats_app: string
		location: Location
		social: SocialLinks
		static_pages: StaticPages
		seo: Seo
		logo: string
		favicon: string
		loginLogo: string
		loginBackground: string
		permissions: string[]
	}
	message: string
	success: boolean
}

// countries types
interface Country {
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
	states: State[]
}

interface State {
	id: number
	name: {
		en: string
		ar: string
	}
	localized_name: string
	is_active: boolean
}

export interface TShowResponse {
	success: boolean
	data: Country
	message: string
}

export interface TState {
	data: any
	loading: boolean
	error: string | null
	showLoading: boolean
	showResponse: any | null
	showError: string | null
}
