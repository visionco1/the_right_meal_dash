import { Loading } from '@/components/ui/Loading'
import ShiftForm from './form'
import { Dispatch, SetStateAction } from 'react'
import CustomModal from '@/components/ui/custom-modal'
import { useTranslation } from 'react-i18next'

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
const UpdateShift = ({ handleSubmit, setOpenModal, updateLoading, showLoading, open, data, handleChange }: TProps) => {
	const { t } = useTranslation()
	return (
		<CustomModal
			titleHead={t('edit_delivery_period')}
			isOpen={open}
			setIsOpen={setOpenModal}
			open={open}
			closeOnClickOut={true}
			position="center"
			body={
				<div className="pt-5 w-[80vw] lg:w-[40vw] p-3 min-h-[180px]">
					{updateLoading || (showLoading && <Loading />)}
					<ShiftForm handleChange={handleChange} data={data} handleSubmit={handleSubmit} setOpenModal={setOpenModal} />
				</div>
			}
		/>
	)
}

export default UpdateShift
