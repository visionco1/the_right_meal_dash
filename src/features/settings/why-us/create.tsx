import { useCreateWhyUs } from './hooks'
import { useTranslation } from 'react-i18next'
import SectionModal from './modal'

const CreateSection = () => {
	const { t } = useTranslation()
	const { createLoading, handleSubmit, openModal, setOpenModal, handleChange, data } = useCreateWhyUs()
	return <SectionModal title={t('add_section')} createLoading={createLoading} data={data} handleSubmit={handleSubmit} handleChange={handleChange} setOpenModal={setOpenModal} open={openModal} />
}

export default CreateSection
