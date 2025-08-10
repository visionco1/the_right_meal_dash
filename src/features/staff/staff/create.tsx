import CustomModal from '@/components/ui/custom-modal'
import { useCreateAdmin } from './hooks'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Loading } from '@/components/ui/Loading'
import StaffForm from './form'

const CreateStaff = () => {
	const { t } = useTranslation()
	const { createLoading, handleSubmit, openModal, setOpenModal, handleChange, data } = useCreateAdmin()
	return (
		<CustomModal
			titleHead={t('add_staff')}
			isOpen={openModal}
			setIsOpen={setOpenModal}
			open={openModal}
			closeOnClickOut={true}
			position="center"
			buttonContent={<Button>{t('add_staff')}</Button>}
			body={
				<div className="pt-5 w-[80vw] lg:w-[50vw] p-3">
					{createLoading && <Loading />}
					<StaffForm data={data} handleSubmit={handleSubmit} handleChange={handleChange} setOpenModal={setOpenModal} />
				</div>
			}
		/>
	)
}

export default CreateStaff
