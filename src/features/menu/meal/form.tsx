import { FileUploader, FormInput } from '@/components'
import { Button } from '@/components/ui/button'
import CustomSelect from '@/components/ui/custom-select'
import { useGetMealCategories } from '../meal-categories/hooks'
import { useGetAllergens } from '../allergens/hooks'
import { useGetAllCountries } from '../../settings/countries/hooks'
import { useGetSizes } from '../sizes/hooks'
import CustomSwitch from '@/components/ui/custom-switch'
import DynamicForm from '@/components/dynamic-form/dynamic-form'
import { useTranslation } from 'react-i18next'
import { setMultiSelect, setSelect } from '@/helpers/helpers'

type TProps = {
	handleSubmit: (data: any) => void
	data?: any
	handleChange: (key: string, value: any) => void
	showResponse?: any
	is_update?: boolean
	showLoading?: boolean
}
const MealForm = ({ handleSubmit, handleChange, data, showResponse, showLoading, is_update = false }: TProps) => {
	const { t } = useTranslation()
	const { active_data: mealCategories } = useGetMealCategories({ is_paginated: 0 })
	const { active_data: allergens } = useGetAllergens({ is_paginated: 0 })
	const { active_data: countries } = useGetAllCountries({ is_paginated: 0 })
	const { active_data: sizes } = useGetSizes({ is_paginated: 0 })

	const renderInputs = (form: any, index: number, handleChange: any) => (
		<div className="w-full grid grid-cols-1 lg:grid-cols-9 gap-2">
			<FormInput value={form.calories} onChange={e => handleChange(index, 'calories', e.target.value)} label={t('calories')} placeholder={t('calories')} />
			<FormInput value={form.carbohydrates} onChange={e => handleChange(index, 'carbohydrates', e.target.value)} label={t('carbohydrates')} placeholder={t('carbohydrates')} />
			<FormInput value={form.protiens} onChange={e => handleChange(index, 'protiens', e.target.value)} label={t('proteins')} placeholder={t('proteins')} />
			<FormInput value={form.fats} onChange={e => handleChange(index, 'fats', e.target.value)} label={t('fats')} placeholder={t('fats')} />
			<div className="col-span-2">
				<CustomSelect
					onChange={(e: any) => handleChange(index, 'size_id', e?.id)}
					placeholder={t('size')}
					options={sizes}
					value={setSelect(sizes, form.size_id)}
					isClearable={true}
					optionValue={'id'}
					option={(option: any) => `${option?.localized_name}: ${t('carbohydrates')}:${option?.carbohydrates}, ${t('proteins')}:${option?.protiens}`}
				/>
			</div>
			<CustomSwitch
				defaultChecked={form.is_outlet == '1' ? true : false}
				onChange={e => handleChange(index, 'is_outlet', e.target.checked ? '1' : '0')}
				className="flex-col"
				label={t('outlet')}
				id={`outlet-${index}`}
				labelOff={t('off')}
				labelOn={t('on')}
			/>
			<CustomSwitch
				defaultChecked={form.is_plane == '1' ? true : false}
				onChange={e => handleChange(index, 'is_plane', e.target.checked ? '1' : '0')}
				className="flex-col"
				label={t('plan')}
				id={`plan-${index}`}
				labelOff={t('off')}
				labelOn={t('on')}
			/>
			<CustomSwitch
				defaultChecked={form.is_multiple_select == '1' ? true : false}
				onChange={e => handleChange(index, 'is_multiple_select', e.target.checked ? '1' : '0')}
				className="flex-col"
				label={t('multiple')}
				id={`multiple-${index}`}
				labelOff={t('off')}
				labelOn={t('on')}
			/>
		</div>
	)

	const renderOutletInputs = (form: any, index: number, handleChange: any) => (
		<div className="grid grid-cols-1 lg:grid-cols-5 justify-between w-full gap-2 items-center">
			<FormInput value={form?.price} onChange={e => handleChange(index, 'price', e.target.value)} label={t('price')} />
			<FormInput value={form?.discount_percentage} onChange={e => handleChange(index, 'discount_percentage', e.target.value)} label={t('discount')} />
			<FormInput value={form?.discount_price} onChange={e => handleChange(index, 'discount_price', e.target.value)} label={t('price_after_discount')} />
			<FormInput value={form?.size} onChange={e => handleChange(index, 'size', e.target.value)} label={t('size')} />
			<FormInput value={form?.currency} onChange={e => handleChange(index, 'currency', e.target.value)} label={t('currency')} />
		</div>
	)

	const initialForm = {
		calories: '',
		carbohydrates: '',
		protiens: '',
		fats: '',
		size_id: '',
		is_outlet: false,
		is_plane: false,
		is_multiple_select: false
	}

	const initialOutletForm = {
		price: '',
		discount_price: '',
		discount_percentage: '',
		currency: '',
		size: ''
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="grid grid-cols-2 justify-between gap-5 mb-8 items-center">
				<FormInput value={data?.['name:ar']} onChange={e => handleChange('name:ar', e.target.value)} label={t('name_ar')} placeholder={t('name_ar')} />
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
				<div className="col-span-2 min-h-28">
					{!showLoading && (
						<FileUploader defaultImage={showResponse?.data?.image?.url} value={data?.image} onFileUpload={(e: any) => handleChange('image', e[0])} text={t('upload_image_instruction')} />
					)}
				</div>
				<CustomSelect
					onChange={(e: any) => handleChange('meal_category_id', e?.id)}
					label={t('meal_category')}
					placeholder={t('meal_category')}
					options={mealCategories}
					value={setSelect(mealCategories, data?.meal_category_id)}
					isClearable={true}
					optionLabel={'localized_name'}
					optionValue={'id'}
				/>
				<CustomSelect
					onChange={(e: any) =>
						handleChange(
							'allergen_ids',
							e?.map((item: any) => item?.id)
						)
					}
					isMulti
					label={t('allergens_optional')}
					placeholder={t('allergens_optional')}
					options={allergens}
					value={setMultiSelect(allergens, data?.allergen_ids)}
					isClearable={true}
					optionLabel={'localized_name'}
					optionValue={'id'}
				/>
				<div className="col-span-2">
					<CustomSelect
						onChange={(e: any) => handleChange('country_id', e?.id)}
						label={t('country')}
						placeholder={t('country')}
						options={countries}
						value={setSelect(countries, data?.country_id)}
						isClearable={true}
						optionLabel={'localized_name'}
						optionValue={'id'}
					/>
				</div>
				<CustomSwitch onChange={e => handleChange('is_specific', e.target.checked ? 1 : 0)} label={t('is_specific')} id="is_specific" labelOff={t('off')} labelOn={t('on')} />
			</div>

			{!is_update && (
				<>
					<h3 className="text-2xl font-bold text-gray-800">{t('nutrition_facts')}</h3>
					<DynamicForm handleSet={handleChange} keyName="nutrition_facts" renderInputs={renderInputs} initialForm={initialForm} />
					{data?.nutrition_facts[0]?.is_outlet && (
						<div>
							<h3 className="text-2xl font-bold text-gray-800">{t('outlet')}</h3>
							<DynamicForm handleSet={handleChange} keyName="meal_outlet_prices" renderInputs={renderOutletInputs} initialForm={initialOutletForm} />
						</div>
					)}
				</>
			)}

			<div className="my-5 flex">
				<Button variant={'primary'} type="submit">
					{t('save')}
				</Button>
				<Button variant={'light'}>{t('cancel')}</Button>
			</div>
		</form>
	)
}

export default MealForm
