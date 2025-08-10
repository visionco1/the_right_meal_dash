import { useTranslation } from 'react-i18next'
import { useCreateSize } from './hooks'
import SizesModal from './modal'

const CreateSize = () => {
	const { t } = useTranslation()
	const { createLoading, handleSubmit, openModal, setOpenModal, handleChange, data } = useCreateSize()
	return <SizesModal title={t('add_size')} createLoading={createLoading} data={data} handleSubmit={handleSubmit} handleChange={handleChange} setOpenModal={setOpenModal} open={openModal} />
}

export default CreateSize
