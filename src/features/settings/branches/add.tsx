import { FormInput } from '@/components'
import { Button } from '@/components/ui/button'
import CustomSelect from '@/components/ui/custom-select'
import { useCreateBranch } from './hooks'
import { Loading } from '@/components/ui/Loading'
import { useGetCities } from '../cities/hooks'
import { useGetAllCountries } from '../countries/hooks'
import { useGetStates } from '../states/hooks'
import MapWithAddress from '@/components/map/map-with-address'
import { useTranslation } from 'react-i18next'
import { Card, CardBody } from '@/components/ui/card'

const AddBranchContent = () => {
	const { t } = useTranslation()
	const { createLoading, handleCreateBranch, createData, handleChange } = useCreateBranch()
	const { active_data: cities } = useGetCities()
	const { active_data: countries } = useGetAllCountries()
	const { active_data: states } = useGetStates()

	return (
		<Card>
			<CardBody>
				{createLoading && <Loading />}
				<form onSubmit={e => handleCreateBranch(e)}>
					<div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-5 mb-8 items-center z-50">
						<FormInput value={createData['name:ar']} onChange={e => handleChange('name:ar', e.target.value)} label={t('name_ar')} placeholder={t('name_ar')} />
						<FormInput value={createData['name:en']} onChange={e => handleChange('name:en', e.target.value)} label={t('name_en')} placeholder={t('name_en')} />
						<FormInput value={createData.address} onChange={e => handleChange('address', e.target.value)} label={t('address')} placeholder={t('address')} />
						<CustomSelect
							value={createData.country_id}
							onChange={(e: any) => handleChange('country_id', e)}
							label={t('country')}
							options={countries}
							placeholder={t('country')}
							optionLabel="localized_name"
							optionValue="id"
						/>
						<CustomSelect
							value={createData.state_id}
							onChange={(e: any) => handleChange('state_id', e)}
							label={t('state')}
							options={states}
							placeholder={t('state')}
							optionLabel="localized_name"
							optionValue="id"
						/>
						<CustomSelect
							value={createData.city_id}
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
			</CardBody>
		</Card>
	)
}

export default AddBranchContent
