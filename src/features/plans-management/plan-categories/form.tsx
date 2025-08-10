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
const PlanCategoryForm = ({ handleSubmit, handleChange, data, setOpenModal, showResponse, showLoading }: TProps) => {
	const { t } = useTranslation()
	return (
		<form onSubmit={handleSubmit}>
			<div className="grid grid-cols-2 justify-between gap-5 mb-8 items-center">
				<FormInput value={data['name:ar']} onChange={e => handleChange('name:ar', e.target.value)} label={t('name_ar')} placeholder={t('name_ar')} />
				<FormInput value={data?.['name:en']} onChange={e => handleChange('name:en', e.target.value)} label={t('name_en')} placeholder={t('name_en')} />
				<FormInput
					value={data?.['description:ar']}
					onChange={e => handleChange('description:ar', e.target.value)}
					rows={4}
					type="textarea"
					placeholder={t('description_ar')}
					label={t('description_ar')}
				/>
				<FormInput
					value={data?.['description:en']}
					onChange={e => handleChange('description:en', e.target.value)}
					rows={4}
					type="textarea"
					placeholder={t('description_en')}
					label={t('description_en')}
				/>
				<div className="col-span-2 min-h-40">
					{!showLoading && <FileUploader defaultImage={showResponse?.data?.image?.url} value={data?.image} onFileUpload={(e: any) => handleChange('image', e[0])} text={t('upload_image')} />}
				</div>
				<FormInput value={data?.protiens} onChange={e => handleChange('protiens', e.target.value)} label={t('protein')} placeholder={t('protein')} />
				<FormInput value={data?.carbohydrates} onChange={e => handleChange('carbohydrates', e.target.value)} label={t('carbohydrates')} placeholder={t('carbohydrates')} />
			</div>
			<div className="my-5 flex gap-3">
				<Button variant="primary" type="submit">
					{t('save')}
				</Button>
				<Button variant="light" onClick={() => setOpenModal(false)}>
					{t('cancel')}
				</Button>
			</div>
		</form>
	)
}

export default PlanCategoryForm
