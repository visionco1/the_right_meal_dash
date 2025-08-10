import { useTranslation } from 'react-i18next'
import MealCategoryModal from './modal'
import { useCreateMealCategory } from './hooks'

const CreateMealCategory = () => {
	const { t } = useTranslation()
	const { createLoading, handleSubmit, openModal, setOpenModal, handleChange, data } = useCreateMealCategory()
	return (
		<MealCategoryModal title={t('add_meal_category')} createLoading={createLoading} data={data} handleSubmit={handleSubmit} handleChange={handleChange} setOpenModal={setOpenModal} open={openModal} />
	)
}

export default CreateMealCategory
