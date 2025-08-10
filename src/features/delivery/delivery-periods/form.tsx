import { FormInput } from '@/components'
import { Button } from '@/components/ui/button'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

type TProps = {
	handleSubmit: (data: any) => void
	setOpenModal: Dispatch<SetStateAction<boolean>>
	data: any
	handleChange: (key: string, value: any) => void
	showResponse?: any
	showLoading?: boolean
}
const ShiftForm = ({ handleSubmit, handleChange, data, setOpenModal }: TProps) => {
	const { t } = useTranslation()
	return (
		<form onSubmit={handleSubmit}>
			<div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-5 mb-8 items-center">
				<FormInput value={data.from} onChange={e => handleChange('from', e.target.value)} type="time" name="from" label={t('morning_shift')} />
				<FormInput value={data.to} onChange={e => handleChange('to', e.target.value)} type="time" name="to" label={t('night_shift')} />
			</div>
			<div className="my-5 flex gap-3 ">
				<Button variant={'primary'} type="submit">
					{t('save')}
				</Button>
				<Button variant={'light'} onClick={() => setOpenModal(false)}>
					{t('cancel')}
				</Button>
			</div>
		</form>
	)
}

export default ShiftForm
