import { useTranslation } from 'react-i18next'
import UserModal from './modal'
import { useCreateUser } from './hooks'

const CreateUser = () => {
	const { t } = useTranslation()
	const { createLoading, handleSubmit, openModal, setOpenModal, handleChange, data } = useCreateUser()
	return <UserModal title={t('add_user')} createLoading={createLoading} data={data} handleSubmit={handleSubmit} handleChange={handleChange} setOpenModal={setOpenModal} open={openModal} />
}

export default CreateUser
