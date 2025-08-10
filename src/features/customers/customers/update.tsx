import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import PlanCategoryModal from './modal'
import UserModal from './modal'

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
const UpdateUser = ({ handleSubmit, setOpenModal, updateLoading, showLoading, open, data, handleChange, showResponse }: TProps) => {
	const { t } = useTranslation()
	return (
		<UserModal
			title={t('edit user')}
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

export default UpdateUser
