export type tCreateDate = {
	'name:ar': string
	'name:en': string
	'description:ar': string
	'description:en': string
	image: File | null
	country_id: any
	total_meals_in_plan: string
	min_calories: string
	max_calories: string
	total_plan_categories_range: string | number
	excluded_meals: []
	menu_id: any
	plan_category_id: any
	plan_menus: []
	filter_by_meal_no: { value: number } | null
	plan_versions: []
}
export interface PlanFormHookResult {
	loading: boolean
	showLoading: boolean
	handleSubmit: () => void
	handleChange: (key: string, value: any) => void
	subscription_type: string
	data: any
	countries: any[]
	sizes: any[]
	all_sizes?: any[]
	planCategories: any[]
	meals: any[]
	menus: any[]
	sections: any[]
	setSectionId: (id: number) => void
	filtered_sections: any[]
	showResponse: any
	section_id?: ID
}
export interface PlanFormProps {
	Hook: () => PlanFormHookResult
}

export type SubFormItem = {
	section_id: any
	size_id: any
	selected_quantity: string
	multi_index: string
	multi_selected: true
}

export type GroupForm = {
	groupName: string
	total_quantity: string
	items: SubFormItem[]
}

export type Props = {
	sections: any[]
	filtered_sections?: any[]
	sizes: any[]
	all_sizes?: any[]
	initialData?: GroupForm[]
	disabledSections?: boolean
	setSectionId?: any
}
