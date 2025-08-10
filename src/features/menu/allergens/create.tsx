import { useCreateAllergen } from './hooks'
import { useTranslation } from 'react-i18next'
import AllergenModal from './modal'

const CreateAllergen = () => {
	const { t } = useTranslation()
	const { createLoading, handleSubmit, openModal, setOpenModal, handleChange, data } = useCreateAllergen()
	return <AllergenModal title={t('add_allergen')} createLoading={createLoading} data={data} handleSubmit={handleSubmit} handleChange={handleChange} setOpenModal={setOpenModal} open={openModal} />
}

export default CreateAllergen
