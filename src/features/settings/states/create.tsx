import { useTranslation } from 'react-i18next'
import StateModal from './modal'
import { useCreateState } from './hooks'

const CreateState = () => {
	const { t } = useTranslation()
	const { createLoading, handleSubmit, openModal, setOpenModal, handleChange, data } = useCreateState()
	return <StateModal title={t('add_state')} createLoading={createLoading} data={data} handleSubmit={handleSubmit} handleChange={handleChange} setOpenModal={setOpenModal} open={openModal} />
}

export default CreateState
