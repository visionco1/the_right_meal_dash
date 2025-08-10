import { FileUploader, FormInput } from '@/components'
import { Button } from '@/components/ui/button'
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
const AllergensForm = ({ handleSubmit, handleChange, data, setOpenModal, showResponse, showLoading }: TProps) => {
	const { t } = useTranslation()
	return (
		<form onSubmit={handleSubmit}>
			<div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-5 mb-8 items-center">
				<FormInput value={data['name:ar']} onChange={e => handleChange('name:ar', e.target.value)} label={t('name_ar')} />
				<FormInput value={data['name:en']} onChange={e => handleChange('name:en', e.target.value)} name="name:en" label={t('name_en')} />
			</div>
			<div className="min-h-40">
				{!showLoading && <FileUploader defaultImage={showResponse?.data?.image?.url} value={data?.image} onFileUpload={(e: any) => handleChange('image', e[0])} text={t('drop_image')} />}
			</div>
			<div className="my-5 flex gap-3 ">
				<Button variant={'primary'} type="submit">
					{t('save')}
				</Button>
				<Button type="button" variant={'light'} onClick={() => setOpenModal(false)}>
					{t('cancel')}
				</Button>
			</div>
		</form>
	)
}

export default AllergensForm
