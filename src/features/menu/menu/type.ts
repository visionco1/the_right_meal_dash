export type TCreateData = {
	'name:ar': any
	'name:en': any
	country_id: any
	branch_id: any
	cut_of_day: any
	menu_type: any
	sections: any
	image: any
	work_day_ids: any
}
export type TMealItem = {
	section_meal_id: number
	is_chef_choice: boolean
	id: number
	name: {
		en: string
		ar: string
	}
	description: {
		en: string
		ar: string
	}
	localized_name: string
	is_specific: number
	localized_description: string
	image: {
		id: number
		url: string
	}
	in_stock: boolean
	is_active: boolean
	meal_category: string
	country: string
	calories: {
		calories: number
	}[]
	prices: any[] // Update this with a specific type if price structure is known
}
