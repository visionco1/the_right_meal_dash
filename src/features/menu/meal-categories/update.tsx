import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import MealCategoryModal from './modal'

type TProps = {
	handleSubmit: (data: any) => void
	setOpenModal: Dispatch<SetStateAction<boolean>>
	data?: any
	updateLoading: boolean
	showLoading: boolean
	open: boolean
	handleChange: (key: string, value: any) => void
	showResponse?: any
}
const UpdateMealCategory = ({ handleSubmit, setOpenModal, updateLoading, showLoading, open, data, handleChange, showResponse }: TProps) => {
	const { t } = useTranslation()
	return (
		<MealCategoryModal
			title={t('edit_meal_category')}
			showLoading={showLoading}
			showResponse={showResponse}
			updateLoading={updateLoading}
			data={data}
			handleSubmit={handleSubmit}
			handleChange={handleChange}
			setOpenModal={setOpenModal}
			open={open}
			isUpdate
		/>
	)
}

export default UpdateMealCategory
