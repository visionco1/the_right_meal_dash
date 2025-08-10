import CustomModal from '@/components/ui/custom-modal'
import { Button } from '@/components/ui/button'
import ComplaintsForm from './form'
import { useTranslation } from 'react-i18next'
import { useCreateComplaint } from './hooks'

const CreateComplaint = () => {
	const { t } = useTranslation()
	const { openModal, setOpenModal, createLoading, handleChange, handleSubmit, data } = useCreateComplaint()
	return (
		<CustomModal
			titleHead={t('add_complaint')}
			isOpen={openModal}
			setIsOpen={setOpenModal}
			open={openModal}
			closeOnClickOut
			position="center"
			buttonContent={<Button variant="primary">{t('add_complaint')}</Button>}
			body={
				<div className="pt-5 w-[80vw] lg:w-[50vw] p-3">
					<ComplaintsForm createLoading={createLoading} handleChange={handleChange} handleSubmit={handleSubmit} data={data} setOpenModal={setOpenModal} />
				</div>
			}
		/>
	)
}

export default CreateComplaint
