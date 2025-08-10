type SocialLinks = {
	facebook?: string
	linkedin?: string
	twitter?: string
	tiktok?: string
	snapchat?: string
}

type StaticPages = {
	policy?: {
		en: string
		ar: string
	}
	about?: {
		en: string
		ar: string
	}
	terms?: {
		en: string
		ar: string
	}
}

type Seo = {
	facebook_pixel?: string
	tiktok_pixel?: string
	snapchat_pixel?: string
	google_ads_pixel?: string
	google_analytics?: string
	google_tag_manager_pixel?: string
}

type NameDescription = {
	ar: string
	en: string
}

type TLocation = {
	address: string
}

export type TData = {
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
	location: TLocation['address']
	facebook: string
	linkedin: string
	twitter: string
	tiktok: string
	snapchat: string
	'policy:en': string
	'policy:ar': string
	'about:en': string
	'about:ar': string
	'terms:en': string
	'terms:ar': string
	facebook_pixel: string
	tiktok_pixel: string
	snapchat_pixel: string
	google_ads_pixel: string
	google_analytics: string
	google_tag_manager_pixel: string
	logo: string
	favicon: string
	loginLogo: string
	loginBackground: string
	social: SocialLinks
	static_pages: StaticPages
	seo: Seo
}
export type TValues = {
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
	location: TLocation['address']
	facebook: string
	linkedin: string
	twitter: string
	tiktok: string
	snapchat: string
	'policy:en': string
	'policy:ar': string
	'about:en': string
	'about:ar': string
	'terms:en': string
	'terms:ar': string
	facebook_pixel: string
	tiktok_pixel: string
	snapchat_pixel: string
	google_ads_pixel: string
	google_analytics: string
	google_tag_manager_pixel: string
	logo: string
	favicon: string
	loginLogo: string
	loginBackground: string
}
