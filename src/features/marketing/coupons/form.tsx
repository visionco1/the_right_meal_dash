import { FormInput } from '@/components'
import { Button } from '@/components/ui/button'
import CustomSelect from '@/components/ui/custom-select'
import { Loading } from '@/components/ui/Loading'
import { useGetMeals } from '@/features/menu/meal/hooks'
import { useGetSubscriptionPlans } from '@/features/plans-management/plans/hooks'
import { setMultiSelect } from '@/helpers/helpers'
import { useTranslation } from 'react-i18next'

type TProps = {
	handleSubmit: (data: any) => void
	data?: any
	handleChange: (key: string, value: any) => void
}
const CouponsForm = ({ handleSubmit, handleChange, data }: TProps) => {
	const { t } = useTranslation()
	const { active_data: meals } = useGetMeals({ is_paginated: 0 })
	const { active_data: plans } = useGetSubscriptionPlans({ is_paginated: 0 })
	const plans_options = [{ id: 'all', localized_name: t('all') }, ...(Array.isArray(plans) ? plans : [])]
	const meals_options = [{ id: 'all', localized_name: t('all') }, ...(Array.isArray(meals) ? meals : [])]
	return (
		<form onSubmit={handleSubmit}>
			<div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-5 mb-8 items-center">
				<FormInput value={data?.name} onChange={e => handleChange('name', e.target.value)} label={t('name')} placeholder={t('enter_name')} />
				<FormInput value={data?.code} onChange={e => handleChange('code', e.target.value)} label={t('code')} placeholder={t('enter_code')} />
				<div className="col-span-1 lg:col-span-2 grid gap-2 grid-cols-1 lg:grid-cols-3">
					<FormInput value={data?.discount} onChange={e => handleChange('discount', e.target.value)} label={t('discount')} placeholder={t('enter_discount')} />
					<FormInput value={data?.min_amount} onChange={e => handleChange('min_amount', e.target.value)} label={t('total_min_amount')} placeholder={t('enter_amount')} />
					<FormInput value={data?.max_amount} onChange={e => handleChange('max_amount', e.target.value)} label={t('max_discount_amount')} placeholder={t('enter_max_discount')} />
				</div>
				<FormInput
					placeholder={t('start_date')}
					label={t('start_date')}
					onFocus={e => (e.target.type = 'date')}
					onBlur={e => (e.target.type = 'text')}
					type="text"
					value={data?.start_date}
					onChange={(e: any) => handleChange('start_date', e.target.value)}
				/>
				<FormInput
					placeholder={t('end_date')}
					label={t('end_date')}
					onFocus={e => (e.target.type = 'date')}
					onBlur={e => (e.target.type = 'text')}
					type="text"
					value={data?.end_date}
					onChange={(e: any) => handleChange('end_date', e.target.value)}
				/>
				<FormInput value={data.no_of_uses} onChange={e => handleChange('no_of_uses', e.target.value)} label={t('no_of_uses')} placeholder={t('enter_no')} />
				<CustomSelect
					label={t('plans')}
					isMulti
					options={plans_options}
					value={setMultiSelect(plans_options, data?.plan_ids)}
					onChange={(e: any) =>
						handleChange(
							'plan_ids',
							e?.map((item: any) => item?.id)
						)
					}
					placeholder={t('select_plans')}
					isClearable={true}
					optionLabel={'localized_name'}
					optionValue={'id'}
				/>
				<CustomSelect
					label={t('meals')}
					isMulti
					options={meals_options}
					value={setMultiSelect(meals_options, data?.meal_ids)}
					onChange={(e: any) =>
						handleChange(
							'meal_ids',
							e?.map((item: any) => item?.id)
						)
					}
					placeholder={t('select_plans')}
					isClearable={true}
					optionLabel={'localized_name'}
					optionValue={'id'}
				/>
			</div>
			<div className="my-5 flex gap-3">
				<Button variant={'primary'} type="submit">
					{t('save')}
				</Button>
			</div>
		</form>
	)
}

export default CouponsForm
