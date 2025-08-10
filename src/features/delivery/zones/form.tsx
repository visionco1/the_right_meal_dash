import { FormInput } from '@/components'
import CustomSelect from '@/components/ui/custom-select'
import { removeTrailingZeros, setMultiSelect, setSelect } from '@/helpers/helpers'
import Map from '@/components/map/map'
import { Button } from '@/components/ui/button'
import { Loading } from '@/components/ui/Loading'
import { useZoneForm } from './hooks'

const ZoneForm = ({ Hook }: { Hook: any }) => {
	const {
		handleChange,
		handleSubmit,
		loading,
		showLoading,
		data,
		handleChangeBranch,
		handleChangeCity,
		handleChangeCountry,
		handleChangePeriods,
		countries,
		cities,
		states,
		t,
		branches,
		periods,
		handleChangeState
	} = useZoneForm(Hook)
	return (
		<form onSubmit={handleSubmit}>
			{(loading || showLoading) && <Loading />}
			<div className="h-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-3 items-center">
					<FormInput value={data?.['name:ar']} onChange={e => handleChange('name:ar', e.target.value)} label={t('name_ar')} placeholder={t('name_ar')} />

					<FormInput value={data?.['name:en']} onChange={e => handleChange('name:en', e.target.value)} name="name:en" label={t('name_en')} placeholder={t('name_en')} />

					<CustomSelect
						onChange={handleChangeCountry}
						label={t('country')}
						id="select"
						name="country_id"
						placeholder={t('select_country')}
						options={countries}
						value={setSelect(countries, data?.country_id)}
						isClearable
						optionLabel="localized_name"
						optionValue="id"
					/>

					<CustomSelect
						onChange={handleChangeState}
						label={t('state')}
						id="select"
						name="state_id"
						placeholder={t('select_state')}
						options={states}
						value={setSelect(states, data?.state_id)}
						isClearable
						optionLabel="localized_name"
						optionValue="id"
					/>

					<CustomSelect
						onChange={handleChangeCity}
						label={t('city')}
						id="select"
						name="city_id"
						placeholder={t('select_city')}
						options={cities}
						value={setSelect(cities, data?.city_id)}
						isClearable
						optionLabel="localized_name"
						optionValue="id"
					/>

					<CustomSelect
						onChange={handleChangeBranch}
						label={t('branch')}
						id="select"
						name="branch_id"
						placeholder={t('select_branch')}
						options={branches}
						value={setSelect(branches, data?.branch_id)}
						isClearable
						optionLabel="localized_name"
						optionValue="id"
					/>

					<CustomSelect
						onChange={handleChangePeriods}
						isMulti
						label={t('delivery_period')}
						id="select"
						name="delivery_window_id"
						placeholder={t('select_delivery_period')}
						options={periods}
						value={setMultiSelect(periods, data?.delivery_window_ids)}
						isClearable
						optionValue="id"
						option={(option: any) => `${t('from')} ${removeTrailingZeros(option?.new_from)}, ${t('to')} ${removeTrailingZeros(option?.new_to)}`}
					/>
				</div>

				<div className="h-[600px] flex items-end">
					<Map />
				</div>

				<Button className="mt-5 px-5 py-2" type="submit">
					{t('save')}
				</Button>
			</div>
		</form>
	)
}

export default ZoneForm
