export type TCreateData = {
	name: string
	code: string
	discount: string
	min_amount: string
	max_amount: string
	start_date: string
	end_date: string
	no_of_uses: string
	is_active?: boolean
	outlet_status?: boolean
	meal_ids: number[]
	plan_ids: number[]
}
