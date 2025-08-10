export type TCreateData = {
	title: string
	notification_content: string
	email_content: string
	system: string | number
	email: string | number
	user_ids: number[]
	send_to_all: boolean
	user_type: any
}
