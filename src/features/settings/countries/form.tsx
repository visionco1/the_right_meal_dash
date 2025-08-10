import { FormInput } from '@/components'
import { Button } from '@/components/ui/button'
import ProfileImageUpload from '@/components/ui/profile-image-upload'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

type TProps = {
	handleSubmit: (data: any) => void
	setOpenModal: Dispatch<SetStateAction<boolean>>
	data?: any
	handleChange: (key: string, value: any) => void
	showResponse?: any
	showLoading?: boolean
}
const CountryForm = ({ handleSubmit, handleChange, data, setOpenModal, showResponse }: TProps) => {
	const { t } = useTranslation()
	return (
		<form onSubmit={handleSubmit}>
			<div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-5 mb-8 items-center">
				<div className="col-span-1 md:col-span-2 flex justify-start">
					<ProfileImageUpload url={showResponse?.data?.image?.url} onChange={e => handleChange('image', e)} className="mb-5 col-span-2" />
				</div>
				<FormInput value={data['name:ar']} onChange={e => handleChange('name:ar', e.target.value)} label={t('name_ar')} />
				<FormInput value={data['name:en']} onChange={e => handleChange('name:en', e.target.value)} label={t('name_en')} />
				<FormInput value={data['currency:ar']} onChange={e => handleChange('currency:ar', e.target.value)} label={t('currency_ar')} />
				<FormInput value={data['currency:en']} onChange={e => handleChange('currency:en', e.target.value)} label={t('currency_en')} />
				<FormInput value={data.dial_code} onChange={e => handleChange('dial_code', e.target.value)} label={t('dial_code')} />
				<FormInput value={data.country_code} onChange={e => handleChange('country_code', e.target.value)} label={t('country_code')} />
			</div>
			<div className="my-5 flex gap-3">
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

export default CountryForm
