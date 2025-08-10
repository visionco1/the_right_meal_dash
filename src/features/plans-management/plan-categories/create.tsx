import { useCreatePlanCategory } from './hooks'
import { useTranslation } from 'react-i18next'
import PlanCategoryModal from './modal'

const CreateUser = () => {
	const { t } = useTranslation()
	const { createLoading, handleSubmit, openModal, setOpenModal, handleChange, data } = useCreatePlanCategory()
	return (
		<PlanCategoryModal title={t('add_plan_category')} createLoading={createLoading} data={data} handleSubmit={handleSubmit} handleChange={handleChange} setOpenModal={setOpenModal} open={openModal} />
	)
}

export default CreateUser
