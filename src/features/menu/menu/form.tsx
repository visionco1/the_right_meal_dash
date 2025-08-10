import { FileUploader, FormInput } from '@/components'
import { Button } from '@/components/ui/button'
import CustomSelect from '@/components/ui/custom-select'
import { useGetWorkDays } from './hooks'
import { Loading } from '@/components/ui/Loading'
import { useGetAllCountries } from '../../settings/countries/hooks'
import { useGetBranches } from '../../settings/branches/hooks'
import DynamicForm from '@/components/dynamic-form/dynamic-form'
import { useTranslation } from 'react-i18next'
import { setMultiSelect, setSelect } from '@/helpers/helpers'

const MenuForm = ({ Hook }: { Hook: any }) => {
	const { t } = useTranslation()
	const { createLoading, handleSubmit, data, handleChange, showLoading, updateLoading, showResponse } = Hook()
	const { active_data: countries } = useGetAllCountries()
	const { active_data: branches } = useGetBranches()
	const { data: days } = useGetWorkDays()
	const menuTypes = [
		{ id: 'outlet', name: t('outlet') },
		{ id: 'plan', name: t('plan') }
	]
	const renderInputs = (form: any, index: number, handleChange: any) => (
		<div className="w-full grid grid-cols-2 gap-2">
			<FormInput value={form['name:en']} onChange={e => handleChange(index, 'name:en', e.target.value)} label={t('name_en')} placeholder={t('name_en')} />
			<FormInput value={form['name:ar']} onChange={e => handleChange(index, 'name:ar', e.target.value)} label={t('name_ar')} placeholder={t('name_ar')} />
		</div>
	)
	return (
		<form onSubmit={handleSubmit}>
			{(createLoading || updateLoading || showLoading) && <Loading />}
			<div className="grid grid-cols-2 gap-6">
				<FormInput value={data?.['name:ar']} onChange={e => handleChange('name:ar', e.target.value)} label={t('name_ar')} placeholder={t('name_ar')} />
				<FormInput value={data?.['name:en']} onChange={e => handleChange('name:en', e.target.value)} label={t('name_en')} placeholder={t('name_en')} />
				<CustomSelect
					onChange={(e: any) =>
						handleChange(
							'work_day_ids',
							e?.map((item: any) => item?.id)
						)
					}
					options={days?.data?.data}
					value={setMultiSelect(days?.data?.data, data?.work_day_ids)}
					label={t('working_days')}
					placeholder={t('working_days')}
					optionLabel="day"
					optionValue="id"
					isMulti
					isClearable
				/>
				<CustomSelect
					onChange={(e: any) => handleChange('cut_of_day', e?.id)}
					label={t('cut_of_day')}
					placeholder={t('cut_of_day')}
					options={days?.data?.data}
					value={setSelect(days?.data?.data, data?.cut_of_day)}
					optionLabel="day"
					optionValue="id"
					isClearable
				/>
				<CustomSelect
					onChange={(e: any) => handleChange('country_id', e?.id)}
					label={t('country')}
					placeholder={t('country')}
					optionLabel="localized_name"
					optionValue="id"
					options={countries}
					value={setSelect(countries, data?.country_id)}
					isClearable
				/>
				<CustomSelect
					onChange={(e: any) => handleChange('menu_type', e?.id)}
					label={t('menu_type')}
					placeholder={t('menu_type')}
					options={menuTypes}
					value={setSelect(menuTypes, data?.menu_type)}
					optionLabel="name"
					optionValue="id"
					isClearable
				/>
				<div className="col-span-2 min-h-20">
					{!showLoading && (
						<FileUploader defaultImage={showResponse?.data?.image?.url || null} value={data?.image} onFileUpload={(e: any) => handleChange('image', e[0])} text={t('upload_image_instruction')} />
					)}
				</div>
				{data?.menu_type === 'outlet' && (
					<CustomSelect
						onChange={(e: any) => handleChange('branch_id', e?.id)}
						optionLabel="localized_name"
						optionValue="id"
						label={t('branches')}
						placeholder={t('branches')}
						options={branches}
						value={setSelect(branches, data?.branch_id)}
						isClearable
					/>
				)}
				<div className="col-span-2 my-5">
					<h2 className="font-bold text-xl text-black">{t('menu_sections')}</h2>
					<DynamicForm handleSet={handleChange} renderInputs={renderInputs} keyName="sections" initialForm={{ 'name:ar': '', 'name:en': '' }} initialData={data?.sections} />
				</div>
			</div>
			<div className="my-5 flex">
				<Button variant="primary" type="submit">
					{t('save')}
				</Button>
			</div>
		</form>
	)
}

export default MenuForm
