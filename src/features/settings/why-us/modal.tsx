import { Dispatch, SetStateAction } from 'react'
import { Loading } from '@/components/ui/Loading'
import CustomModal from '@/components/ui/custom-modal'
import { Button } from '@/components/ui/button'
import SectionForm from './form'

type TProps = {
	handleSubmit: (data: any) => void
	setOpenModal: Dispatch<SetStateAction<boolean>>
	data?: any
	updateLoading?: boolean
	showLoading?: boolean
	createLoading?: boolean
	open: boolean
	handleChange: (key: string, value: any) => void
	showResponse?: any
	title: string
	isUpdate?: boolean
}
const SectionModal = ({ title, isUpdate = false, handleSubmit, setOpenModal, updateLoading, createLoading, showLoading, open, data, handleChange, showResponse }: TProps) => {
	return (
		<CustomModal
			titleHead={title}
			isOpen={open}
			setIsOpen={setOpenModal}
			open={open}
			closeOnClickOut={true}
			position="center"
			buttonContent={!isUpdate && <Button>{title}</Button>}
			body={
				<div className="pt-5 w-[80vw] lg:w-[50vw] p-3">
					{(createLoading || updateLoading || showLoading) && <Loading />}
					<SectionForm data={data} showResponse={showResponse} handleSubmit={handleSubmit} handleChange={handleChange} setOpenModal={setOpenModal} />
				</div>
			}
		/>
	)
}

export default SectionModal
