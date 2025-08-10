type SocialMediaLinks = {
	facebook?: string
	linkedin?: string
	twitter?: string
	tiktok?: string
	snapchat?: string
}

type Pixels = {
	facebook_pixel?: string
	tiktok_pixel?: string
	snapchat_pixel?: string
	google_ads_pixel?: string
	google_analytics?: string
	google_tag_manager_pixel?: string
}

type Logos = {
	logo: Record<string, unknown>
	favicon: Record<string, unknown>
	loginLogo: Record<string, unknown>
	loginBackground: Record<string, unknown>
}

export type TCompanyData = {
	'name:ar': string
	'name:en': string
	'description:ar': string
	'description:en': string
	'our_vision:ar': string
	'our_vision:en': string
	'our_mission:ar': string
	'our_mission:en': string
	'our_tasks:ar': string
	'our_tasks:en': string
	trade_register: string
	phone: string
	mobile: string
	whats_app: string
	email: string
	location: string
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
	social_media?: SocialMediaLinks
	pixels?: Pixels
	logos: Logos
}
