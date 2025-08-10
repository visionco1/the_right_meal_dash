import { useTranslation } from 'react-i18next'
import MealCategoryModal from './modal'
import { useCreateCity } from './hooks'

const CreateCity = () => {
	const { t } = useTranslation()
	const { createLoading, handleSubmit, openModal, setOpenModal, handleChange, data } = useCreateCity()
	return <MealCategoryModal title={t('add_city')} createLoading={createLoading} data={data} handleSubmit={handleSubmit} handleChange={handleChange} setOpenModal={setOpenModal} open={openModal} />
}

export default CreateCity
