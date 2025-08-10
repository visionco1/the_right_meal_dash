import { useTranslation } from 'react-i18next'
import { useCreateCountry } from './hooks'
import CountryModal from './modal'

const CreateCountry = () => {
	const { t } = useTranslation()
	const { createLoading, handleSubmit, openModal, setOpenModal, handleChange, data } = useCreateCountry()
	return <CountryModal title={t('add_country')} createLoading={createLoading} data={data} handleSubmit={handleSubmit} handleChange={handleChange} setOpenModal={setOpenModal} open={openModal} />
}

export default CreateCountry
