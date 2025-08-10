import CustomModal from '@/components/ui/custom-modal'
import { useTranslation } from 'react-i18next'
import ComplaintsForm from './form'
import { Dispatch, SetStateAction } from 'react'

const UpdateComplaint = ({
	loading,
	createLoading = false,
	updateLoading,
	handleChange,
	openModal,
	setOpenModal,
	handleSubmit,
	data,
	showResponse
}: {
	loading: boolean
	createLoading?: boolean
	updateLoading: boolean
	handleChange: (name: string, value: any) => void
	openModal: boolean
	setOpenModal: Dispatch<SetStateAction<boolean>>
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
	data: any
	showResponse?: any
}) => {
	const { t } = useTranslation()
	return (
		<CustomModal
			titleHead={t('edit_complaint')}
			isOpen={openModal}
			setIsOpen={setOpenModal}
			open={openModal}
			closeOnClickOut
			position="center"
			body={
				<div className="pt-5 w-[80vw] lg:w-[50vw] p-3 min-h-[500px]">
					<ComplaintsForm
						loading={loading}
						createLoading={createLoading}
						updateLoading={updateLoading}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						data={data}
						setOpenModal={setOpenModal}
						showResponse={showResponse}
					/>
				</div>
			}
		/>
	)
}

export default UpdateComplaint
