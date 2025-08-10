import { FormInput } from '@/components'
import { useUpdateNutritionFact } from '@/features/menu/nutrition-facts/hooks'
import { Button } from '@/components/ui/button'
import CustomSelect from '@/components/ui/custom-select'
import { Loading } from '@/components/ui/Loading'
import { useGetSizes } from '../sizes/hooks'
import { useTranslation } from 'react-i18next'

const EditNutritionContent = () => {
	const { t } = useTranslation()
	const { handleChange, updateLoading, showLoading, handleUpdateNutrition, data, showResponse } = useUpdateNutritionFact()
	const { active_data: sizes } = useGetSizes({ is_paginated: 0 })

	return (
		<div className="card min-h-[50vh] relative p-10">
			{(updateLoading || showLoading) && <Loading />}
			<div>
				<div className="mt-2 pb-8">
					<h3 className="text-gray-900 text-lg">
						{t('meal_name')}: <span className="text-gray-400 font-normal text-sm">{showResponse?.data?.localized_name}</span>
					</h3>
					<h3 className="text-gray-900 text-lg">
						{t('meal_description')}: <span className="text-gray-400 font-normal text-sm">{showResponse?.data?.localized_description}</span>
					</h3>
				</div>

				<form onSubmit={e => handleUpdateNutrition(e)}>
					<h3 className="text-2xl font-bold text-gray-800">{t('nutrition_facts')}</h3>

					{!showLoading &&
						data &&
						data.map((item: any, i: number) => (
							<div className="flex items-end flex-nowrap gap-2 my-5" key={i}>
								<span className="bg-primary flex flex-shrink-0 items-center justify-center w-8 h-8 text-white rounded-full text-lg font-bold">{i + 1}</span>
								<div className="grid grid-cols-1 md:grid-cols-5 justify-between gap-5 items-center w-full">
									<FormInput value={item?.calories} onChange={e => handleChange(item?.id, 'calories', e.target.value)} label={t('calories')} placeholder={t('calories')} />
									<FormInput value={item?.carbohydrates} onChange={e => handleChange(item?.id, 'carbohydrates', e.target.value)} label={t('carbohydrates')} placeholder={t('carbohydrates')} />
									<FormInput value={item?.protiens} onChange={e => handleChange(item?.id, 'protiens', e.target.value)} label={t('protein')} placeholder={t('protein')} />
									<FormInput value={item?.fats} onChange={e => handleChange(item?.id, 'fats', e.target.value)} label={t('fats')} placeholder={t('fats')} />
									<CustomSelect
										value={item?.size}
										label={t('size')}
										placeholder={t('size')}
										options={sizes}
										option={(option: any) => `${option?.localized_name}: ${t('carbohydrates')}: ${option?.carbohydrates}, ${t('protein')}: ${option?.protiens}`}
										isClearable={true}
										onChange={(e: any) => handleChange(item?.id, 'size', e)}
										optionValue={'id'}
									/>
								</div>
							</div>
						))}

					<div className="mt-8 flex gap-3">
						<Button variant="primary" type="submit">
							{t('save')}
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default EditNutritionContent
