import { useTranslation } from 'react-i18next'
import QualityControlModal from './modal'
import { useCreateQualityControl } from './hooks'

const CreateQualityControl = () => {
	const { t } = useTranslation()
	const { createLoading, handleSubmit, openModal, setOpenModal, handleChange, data } = useCreateQualityControl()
	return (
		<QualityControlModal
			title={t('add quality control')}
			createLoading={createLoading}
			data={data}
			handleSubmit={handleSubmit}
			handleChange={handleChange}
			setOpenModal={setOpenModal}
			open={openModal}
		/>
	)
}

export default CreateQualityControl
