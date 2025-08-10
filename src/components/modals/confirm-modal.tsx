import { Button } from '@/components/ui/button'
import CustomModal from '@/components/ui/custom-modal'
import { Loading } from '@/components/ui/Loading'
import { SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

type TParams = {
	openModal: boolean
	setOpenModal: React.Dispatch<SetStateAction<boolean>>
	loading: boolean
	handleClick: (data: any) => void
	message: string
	btnValue: string
}
const ConfirmModal = ({ openModal, setOpenModal, loading, handleClick, message, btnValue }: TParams) => {
	const { t } = useTranslation()
	return (
		<CustomModal
			titleHead={btnValue}
			isOpen={openModal}
			setIsOpen={setOpenModal}
			open={openModal}
			closeOnClickOut={true}
			position="top"
			body={
				<div className="pt-5 w-[80vw] lg:w-[40vw] p-3">
					{loading && <Loading />}
					<p className="text-lg">{message}</p>
					<div className="my-5 flex gap-2">
						<Button type="submit" variant="destructive" onClick={handleClick}>
							{btnValue}
						</Button>
						<Button type="button" variant="light" onClick={() => setOpenModal(false)}>
							{t('cancel')}
						</Button>
					</div>
				</div>
			}
		/>
	)
}

export default ConfirmModal
