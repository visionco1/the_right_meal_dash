import { FormInput } from '@/components'
import { Button } from '@/components/ui/button'
import CustomSelect from '@/components/ui/custom-select'
import { useUpdateBranch } from './hooks'
import { Loading } from '@/components/ui/Loading'
import { useGetCities } from '../cities/hooks'
import { useGetAllCountries } from '../countries/hooks'
import { useGetStates } from '../states/hooks'
import MapWithAddress from '@/components/map/map-with-address'
import { useTranslation } from 'react-i18next'
import { Card, CardBody } from '@/components/ui/card'

const EditBranchContent = () => {
	const { t } = useTranslation()
	const { updateLoading, showLoading, handleUpdateBranch, data, handleChange } = useUpdateBranch()
	const { active_data: cities } = useGetCities()
	const { active_data: countries } = useGetAllCountries()
	const { active_data: states } = useGetStates()

	return (
		<Card>
			<CardBody>
				{updateLoading && <Loading />}
				{showLoading ? (
					<Loading />
				) : (
					<form onSubmit={e => handleUpdateBranch(e)}>
						<div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-5 mb-8 items-center">
							<FormInput value={data['name:ar']} onChange={e => handleChange('name:ar', e.target.value)} label={t('name_ar')} placeholder={t('name_ar')} />
							<FormInput value={data['name:en']} onChange={e => handleChange('name:en', e.target.value)} label={t('name_en')} placeholder={t('name_en')} />
							<FormInput value={data.address} onChange={e => handleChange('address', e.target.value)} label={t('address')} placeholder={t('address')} />
							<CustomSelect
								value={data.country_id}
								onChange={(e: any) => handleChange('country_id', e)}
								label={t('country')}
								options={countries}
								placeholder={t('country')}
								optionLabel="localized_name"
								optionValue="id"
							/>
							<CustomSelect
								value={data.state_id}
								onChange={(e: any) => handleChange('state_id', e)}
								label={t('state')}
								options={states}
								placeholder={t('state')}
								optionLabel="localized_name"
								optionValue="id"
							/>
							<CustomSelect
								value={data.city_id}
								onChange={(e: any) => handleChange('city_id', e)}
								label={t('city')}
								options={cities}
								placeholder={t('city')}
								optionLabel="localized_name"
								optionValue="id"
							/>
						</div>
						<MapWithAddress />
						<div className="my-5 flex gap-2">
							<Button type="submit" variant="primary">
								{t('save')}
							</Button>
						</div>
					</form>
				)}
			</CardBody>
		</Card>
	)
}

export default EditBranchContent
