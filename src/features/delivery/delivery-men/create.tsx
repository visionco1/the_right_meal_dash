import CustomModal from '@/components/ui/custom-modal'
import { useCreateDelivery } from './hooks'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Loading } from '@/components/ui/Loading'
import DeliveryMenForm from './form'

const CreateDeliveryMen = () => {
	const { t } = useTranslation()
	const { createLoading, handleSubmit, openModal, setOpenModal, handleChange, data } = useCreateDelivery()
	return (
		<CustomModal
			titleHead={t('add_delivery_man')}
			isOpen={openModal}
			setIsOpen={setOpenModal}
			open={openModal}
			closeOnClickOut={true}
			position="center"
			buttonContent={<Button>{t('add_delivery_man')}</Button>}
			body={
				<div className="pt-5 w-[80vw] lg:w-[50vw] p-3">
					{createLoading && <Loading />}
					<DeliveryMenForm data={data} handleSubmit={handleSubmit} handleChange={handleChange} setOpenModal={setOpenModal} />
				</div>
			}
		/>
	)
}

export default CreateDeliveryMen
