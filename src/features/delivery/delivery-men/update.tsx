import CustomModal from '@/components/ui/custom-modal'
import { Loading } from '@/components/ui/Loading'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import DeliveryMenForm from './form'

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
const UpdateDeliveryMan = ({ handleSubmit, setOpenModal, updateLoading, showLoading, open, data, handleChange, showResponse }: TProps) => {
	const { t } = useTranslation()
	return (
		<CustomModal
			titleHead={t('edit_delivery_man')}
			isOpen={open}
			setIsOpen={setOpenModal}
			open={open}
			closeOnClickOut={true}
			position="center"
			body={
				<div className="pt-5 w-[80vw] lg:w-[50vw] p-3 min-h-[400px]">
					{(updateLoading || showLoading) && <Loading />}
					<DeliveryMenForm showResponse={showResponse} data={data} handleSubmit={handleSubmit} handleChange={handleChange} setOpenModal={setOpenModal} />
				</div>
			}
		/>
	)
}

export default UpdateDeliveryMan
