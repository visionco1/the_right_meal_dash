import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import AllergenModal from './modal'

type TProps = {
	handleSubmit: (data: any) => void
	setOpenModal: Dispatch<SetStateAction<boolean>>
	data?: any
	updateLoading: boolean
	showLoading: boolean
	open: boolean
	handleChange: (key: string, value: any) => void
	showResponse?: any
}
const UpdateAllergen = ({ handleSubmit, setOpenModal, updateLoading, showLoading, open, data, handleChange, showResponse }: TProps) => {
	const { t } = useTranslation()
	return (
		<AllergenModal
			title={t('edit_allergen')}
			showLoading={showLoading}
			showResponse={showResponse}
			updateLoading={updateLoading}
			data={data}
			handleSubmit={handleSubmit}
			handleChange={handleChange}
			setOpenModal={setOpenModal}
			open={open}
			isUpdate
		/>
	)
}

export default UpdateAllergen
