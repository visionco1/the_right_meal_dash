import { useTranslation } from 'react-i18next'
import OutletModal from './modal'
import { useCreateOutlet } from './hooks'

const CreateQualityControl = () => {
	const { t } = useTranslation()
	const { createLoading, handleSubmit, openModal, setOpenModal, handleChange, data } = useCreateOutlet()
	return <OutletModal title={t('add outlet')} createLoading={createLoading} data={data} handleSubmit={handleSubmit} handleChange={handleChange} setOpenModal={setOpenModal} open={openModal} />
}

export default CreateQualityControl
