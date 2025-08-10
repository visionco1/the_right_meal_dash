import { FileUploader, FormInput } from '@/components'
import { Button } from '@/components/ui/button'
import CustomSelect from '@/components/ui/custom-select'
import DynamicForm from '@/components/dynamic-form/dynamic-form'
import { useTranslation } from 'react-i18next'
import MultiMultiForm from './multi-multi-form'
import { useGetAllCountries } from '@/features/settings/countries/hooks'
import { useGetPlanCategories } from '../plan-categories/hooks'
import { useGetMeals } from '@/features/menu/meal/hooks'
import { setMultiSelect, setSelect } from '@/helpers/helpers'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useMemo, useState } from 'react'
import { useGetSizes } from '@/features/menu/sizes/hooks'
import { useGetMenus } from '@/features/menu/menu/hooks'
import { useGetSections } from '@/features/menu/sections/hooks'

type TProps = {
	handleSubmit: (data: any) => void
	data?: any
	handleChange: (key: string, value: any) => void
	showResponse?: any
	showLoading?: boolean
	loading?: boolean
}
const PlanForm = ({ handleSubmit, handleChange, data, showResponse, showLoading }: TProps) => {
	const { t } = useTranslation()
	const { active_data: countries } = useGetAllCountries({ is_paginated: 0 })
	const { active_data: planCategories } = useGetPlanCategories({ is_paginated: 0 })
	const { active_data: meals } = useGetMeals({ is_paginated: 0 })
	const { active_data: all_sizes } = useGetSizes({ is_paginated: 0 })
	const [section_id, setSectionId] = useState<ID>()
	// get the sections depends on the menu id
	const { active_data: menu } = useGetMenus({ is_paginated: 0, country_id: data?.country_id || '' })
	// just display the menus who have the type plan
	const menus = menu?.filter((item: any) => item?.menu_type == 'plan')
	const { active_data: sections } = useGetSections({ is_paginated: 0, menu_id: data?.menu_id || '' })
	// filter sizes
	const sizes =
		useMemo(() => {
			if (!section_id) return all_sizes
			return all_sizes?.filter((item: any) => item.section_ids?.includes(section_id))
		}, [all_sizes, section_id]) || []

	const subscription_type = [
		{ id: 'weekly', name: t('weekly') },
		{ id: 'monthly', name: t('monthly') },
		{ id: 'yearly', name: t('yearly') }
	]
	const { groups } = useSelector((state: RootState) => state.multiFormReducer)
	const excludedIds = [
		...(data?.plan_menus?.map((item: any) => String(item?.section_id)) || []),
		...(groups.flatMap((obj: any) => obj.items)?.map((section: any) => String(section?.section_id)) || [])
	]
	const filtered_sections = sections?.filter((item: any) => !excludedIds.includes(String(item?.id)))
	const renderInputs = (form: any, index: number, handleChange: any) => (
		<div className="w-full grid grid-cols-1 lg:grid-cols-3 justify-between gap-5 items-center">
			<CustomSelect
				label={t('menu section')}
				onChange={(e: any) => {
					handleChange(index, 'section_id', e?.id)
					setSectionId(e?.id)
				}}
				options={filtered_sections}
				isDisabled={!data?.menu_id}
				value={setSelect(sections, form?.section_id)}
				placeholder={t('select_section')}
				isClearable={true}
				optionLabel={'localized_name'}
				optionValue={'id'}
			/>
			<CustomSelect
				optionLabel={'localized_name'}
				optionValue={'id'}
				isDisabled={!form?.section_id}
				onChange={(e: any) => handleChange(index, 'size_id', e?.id)}
				label={t('size')}
				placeholder={t('select_size')}
				options={sizes}
				value={setSelect(all_sizes, form?.size_id)}
				isClearable={true}
			/>
			<FormInput onChange={(e: any) => handleChange(index, 'quantity', e.target.value)} value={form?.quantity} label={t('qty_per_day')} placeholder={t('qty')} />
		</div>
	)
	const initialForm = {
		menu_id: '',
		section_id: '',
		size_id: '',
		quantity: ''
	}
	const renderPlanVersionsInputs = (form: any, index: number, handleChange: any) => (
		<div className="grid grid-cols-1 lg:grid-cols-3 justify-between w-full gap-2 items-center">
			<FormInput onChange={(e: any) => handleChange(index, 'number_of_days', e.target.value)} value={form?.number_of_days} label={t('number_of_days')} placeholder={t('number_of_days')} />
			<FormInput onChange={(e: any) => handleChange(index, 'meal_price_per_day', e.target.value)} value={form?.meal_price_per_day} label={t('price_per_day')} placeholder={t('price_per_day')} />
			<FormInput
				onChange={(e: any) => handleChange(index, 'delivery_price_per_day', e.target.value)}
				value={form?.delivery_price_per_day}
				label={t('delivery_price_per_day')}
				placeholder={t('delivery_price_per_day')}
			/>
			<FormInput onChange={(e: any) => handleChange(index, 'discount', e.target.value)} value={form?.discount} label={t('discount')} placeholder={t('discount')} />
			<FormInput onChange={(e: any) => handleChange(index, 'price', e.target.value)} disabled value={form?.price} label={t('total_price')} placeholder={t('total_price')} />
			<CustomSelect
				optionLabel={'name'}
				optionValue={'id'}
				label={t('subscription_type')}
				onChange={(e: any) => handleChange(index, 'subscription_type', e?.id)}
				value={setSelect(subscription_type, form?.subscription_type)}
				placeholder={t('type')}
				options={subscription_type}
				isClearable={true}
			/>
		</div>
	)
	const initialPlanVersionsForm = {
		number_of_days: '',
		meal_price_per_day: '',
		price: '',
		delivery_price_per_day: '',
		discount: '',
		subscription_type: ''
	}

	const groupedByMultiIndex = Object.entries(
		(data?.multi_sections || []).reduce((acc: Record<string, any>, item: any) => {
			const key = item.multi_index

			if (!acc[key]) {
				acc[key] = {
					items: [],
					total_quantity: 0,
					groupName: `Group ${key + 1}`
				}
			}

			acc[key].items.push(item)

			const quantity = Number(item.quantity)
			if (!isNaN(quantity)) {
				acc[key].total_quantity = quantity
			}

			return acc
		}, {})
	).map(([_, value]) => value)

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
				<div className="col-span-2 min-h-40">
					{!showLoading && <FileUploader value={data?.image} defaultImage={showResponse?.data?.image?.url} onFileUpload={(e: any) => handleChange('image', e[0])} text={t('drop_image_here')} />}
				</div>
				<div className="col-span-2">
					<CustomSelect
						optionLabel={'localized_name'}
						optionValue={'id'}
						onChange={(e: any) => handleChange('country_id', e?.id)}
						value={setSelect(countries, data?.country_id)}
						label={t('country')}
						placeholder={t('country')}
						options={countries}
						isClearable={true}
					/>
				</div>
				<CustomSelect
					optionLabel={'localized_name'}
					optionValue={'id'}
					onChange={(e: any) => handleChange('plan_category_id', e?.id)}
					label={t('plan_category')}
					placeholder={t('plan_category')}
					options={planCategories}
					value={setSelect(planCategories, data?.plan_category_id)}
					isClearable={true}
				/>
				<CustomSelect
					optionLabel={'localized_name'}
					optionValue={'id'}
					onChange={(e: any) =>
						handleChange(
							'excluded_meals',
							e.map((e: any) => e.id)
						)
					}
					isMulti
					label={t('excluded_meals')}
					placeholder={t('meal')}
					options={meals}
					value={setMultiSelect(meals, data?.excluded_meals)}
					isClearable={true}
				/>
				<div className="col-span-2 grid grid-cols-1 lg:grid-cols-3 gap-3">
					<FormInput value={data?.total_meals_in_plan} onChange={e => handleChange('total_meals_in_plan', e.target.value)} label={t('total_meals')} />
					<FormInput value={data?.min_calories} onChange={e => handleChange('min_calories', e.target.value)} label={t('min_calories')} />
					<FormInput value={data?.max_calories} onChange={e => handleChange('max_calories', e.target.value)} label={t('max_calories')} />
				</div>
				<CustomSelect
					optionLabel={'id'}
					optionValue={'id'}
					onChange={(e: any) => handleChange('filter_by_meal_no', e?.id)}
					label={t('filter_by_meal_number')}
					placeholder={t('select meal number')}
					options={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]}
					value={setSelect([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }], data?.filter_by_meal_no)}
					isClearable={true}
				/>
				<CustomSelect
					optionLabel={'localized_name'}
					optionValue={'id'}
					onChange={(e: any) => handleChange('menu_id', e?.id)}
					label={t('menu')}
					placeholder={t('select_menu')}
					isDisabled={!data?.country_id}
					options={menus}
					value={setSelect(menus, data?.menu_id)}
					isClearable={true}
				/>
			</div>
			<div className="my-5">
				<h3 className="text-2xl font-bold text-gray-800 lowercase first-letter:uppercase">{t('single sections')}</h3>
				<DynamicForm handleSet={handleChange} keyName="plan_menus" renderInputs={renderInputs} initialForm={initialForm} initialData={data?.plan_menus} />
			</div>
			<MultiMultiForm
				setSectionId={setSectionId}
				disabledSections={!data?.menu_id}
				filtered_sections={filtered_sections}
				sections={sections}
				sizes={sizes}
				all_sizes={all_sizes}
				initialData={groupedByMultiIndex as any}
			/>
			<div className="my-5">
				<h3 className="text-2xl font-bold text-gray-800 lowercase first-letter:uppercase">{t('plan_versions')}</h3>
				<DynamicForm handleSet={handleChange} keyName="plan_versions" renderInputs={renderPlanVersionsInputs} initialForm={initialPlanVersionsForm} initialData={data?.plan_versions} />
			</div>
			<div className="my-5 flex">
				<Button variant={'primary'} type="submit">
					{t('save')}
				</Button>
			</div>
		</form>
	)
}

export default PlanForm
