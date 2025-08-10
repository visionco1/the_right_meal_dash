import { Loading } from '@/components/ui/Loading'
import { useCreateShift } from './hooks'
import ShiftForm from './form'
import { Button } from '@/components/ui/button'
import CustomModal from '@/components/ui/custom-modal'
import { useTranslation } from 'react-i18next'

const CreateShift = () => {
	const { createLoading, handleChange, handleSubmit, openModal, setOpenModal, data } = useCreateShift()
	const { t } = useTranslation()
	return (
		<CustomModal
			titleHead={t('add_delivery_period')}
			isOpen={openModal}
			setIsOpen={setOpenModal}
			open={openModal}
			closeOnClickOut={true}
			position="center"
			buttonContent={<Button variant={'primary'}>{t('add_delivery_period')}</Button>}
			body={
				<div className="pt-5 w-[80vw] lg:w-[40vw] p-3">
					{createLoading && <Loading />}
					<ShiftForm data={data} handleSubmit={handleSubmit} handleChange={handleChange} setOpenModal={setOpenModal} />
				</div>
			}
		/>
	)
}

export default CreateShift
